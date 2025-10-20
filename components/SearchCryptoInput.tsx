'use client'

import { Search } from "lucide-react"
import { Input } from "./ui/Input"
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { formatCurrency } from "@/lib/format";
import { useSearchAll } from "@/hooks/useSearchAll";
import Image from "next/image";
import { useAddUserActivityLog } from "@/hooks/useUserActivityLog";
import { useMe } from "@/hooks/useAuth";

const SkeletonItem = () => (
	<div className="flex items-center gap-2 px-4 py-3 animate-pulse">
		<div className="w-8 h-8 rounded-full bg-[var(--loading)]" />
		<div className="flex-1">
			<div className="h-3 w-24 bg-[var(--loading)] rounded mb-2" />
			<div className="h-2 w-12 bg-[var(--loading)] rounded" />
		</div>
		<div className="ml-auto w-10 h-3 bg-[var(--loading)] rounded" />
	</div>
);

const SearchCryptoInput = ({ inputClassname, popupClassname, placeholder }: { placeholder?: string, inputClassname?: string, popupClassname?: string }) => {
	const listRef = useRef<HTMLDivElement | null>(null);     // <- container scroll
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const wrapperRef = useRef<HTMLDivElement | null>(null)

	const [raw, setRaw] = useState('')
	const [search, setSearch] = useState('')
	const [open, setOpen] = useState(false)

	const { data: userData } = useMe()
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
		isLoading,
	} = useSearchAll(search, { enabled: open });
	const { mutate: addLog } = useAddUserActivityLog();

	const handleScroll = useCallback(
		(e: React.UIEvent<HTMLDivElement>) => {
			const el = e.currentTarget
			if (!hasNextPage || isFetchingNextPage) return
			const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 160
			if (nearBottom) fetchNextPage()
		},
		[hasNextPage, isFetchingNextPage, fetchNextPage]
	)

	useEffect(() => {
		const t = setTimeout(() => setSearch(raw.trim()), 250)
		return () => clearTimeout(t)
	}, [raw])

	// mở/đóng popup theo text
	useEffect(() => {
		setOpen(search.length > 0)
	}, [search])

	useEffect(() => {
		if (!open) return
		refetch()
	}, [open, refetch])

	// flat items
	const flat = useMemo(
		() => (data?.pages ?? []).flatMap((p: any) => p?.data?.items ?? []),
		[data]
	)

	useEffect(() => {
		if (!open) return
		const root = listRef.current
		const target = sentinelRef.current
		if (!root || !target) return

		const io = new IntersectionObserver(
			(entries) => {
				const [e] = entries
				if (e.isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage()
				}
			},
			{
				root,
				rootMargin: '200px 0px 200px 0px',
				threshold: 0
			}
		)

		io.observe(target)
		return () => io.disconnect()
	}, [open, hasNextPage, isFetchingNextPage, fetchNextPage])

	useEffect(() => {
		if (!open) return
		const el = listRef.current
		if (!el) return
		const maybeFill = () => {
			if (hasNextPage && !isFetchingNextPage && el.scrollHeight <= el.clientHeight) {
				fetchNextPage()
			}
		}
		const t = setTimeout(maybeFill, 0)
		const ro = new ResizeObserver(maybeFill)
		ro.observe(el)
		return () => {
			clearTimeout(t)
			ro.disconnect()
		}
	}, [open, data, hasNextPage, isFetchingNextPage, fetchNextPage])

	// click outside + ESC để đóng popup
	useEffect(() => {
		if (!open) return
		const onDown = (e: MouseEvent) => {
			if (!wrapperRef.current) return
			if (!wrapperRef.current.contains(e.target as Node)) setOpen(false)
		}
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false)
		}
		document.addEventListener('mousedown', onDown)
		document.addEventListener('keydown', onKey)
		return () => {
			document.removeEventListener('mousedown', onDown)
			document.removeEventListener('keydown', onKey)
		}
	}, [open])
	return (
		<div ref={wrapperRef} className={`flex-1 max-w-[200px] mx-8 hidden md:block ${inputClassname}`}>
			<div className="relative">
				<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA0700] p-[1px] rounded-full">
					<div className="relative rounded-full bg-[var(--bg-input)] text-[var(--text)]">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
						<Input
							placeholder={placeholder || "Search..."}
							value={raw}
							onChange={(e) => setRaw(e.target.value)}
							className="pl-10 py-2 w-full bg-[var(--bg-input)] border-none rounded-full focus:outline-none focus:ring-0 font-reddit text-[var(--text)]"
						/>
					</div>
				</div>
				{open && (
					<div
						ref={listRef}
						onScroll={handleScroll}
						className={`absolute w-[300px] -left-1/4 right-0 top-[44px] bg-[var(--bg-header)] rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto ${popupClassname}`}
					>
						{!isLoading ? (
							Array.from({ length: 6 }).map((_, idx) => <SkeletonItem key={idx} />)
						) : flat.length === 0 ? (
							<div className="py-10 grid place-items-center text-sm opacity-70">No results</div>
						) : (
							<>
								{flat.map((item: any) => (
									<Link
										href={`/cryptocurrencies/${item.code}`}
										key={item.symbol}
										className={clsx(
											'block px-4 py-3 hover:bg-[var(--bg-hover)] transition-colors',
											'border-b last:border-b-0 border-b-[var(--border-popover)]'
										)}
										onClick={() => {
											setOpen(false)
											if (userData?.data?.id) {
												addLog({
													userId: userData?.data?.id,
													type: 'search',
													assetType: 'cryptocurrencies',
													assetSymbol: item.code,
													assetName: item.name,
													assetLogo: item.logo,
													content: `Searched for: '${search} community analysis' and clicked '${item.name} (${item.code})'`,
												});
											}
										}}
									>
										<div className="flex items-center gap-2">
											<Image src={item.logo || ""} width={32} height={32} alt="Image Community" className="w-8 h-8 rounded-full" />
											<div>
												<div className="text-sm text-[var(--text)] font-noto font-semibold">{item.name}</div>
												<div className="text-[10px] text-gray-500 font-noto">{item.symbol}</div>
											</div>
											<span className="ml-auto text-sm text-[#DDF346] font-semibold font-noto">
												{formatCurrency(item?.price)}
											</span>
										</div>
									</Link>
								))}
								<div ref={sentinelRef} />
								{isFetchingNextPage && (
									<div className="py-4 text-center text-xs opacity-70 text-[var(--text)]">Loading more…</div>
								)}
							</>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchCryptoInput