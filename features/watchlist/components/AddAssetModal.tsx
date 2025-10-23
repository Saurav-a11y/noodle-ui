import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { useAddBulkToWatchlist, useCandidateTokens } from "@/hooks/useWatchlist";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
// import { Button } from "@/components/ui/Button";

interface AddAssetModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSave: (selectedCoins: string[]) => void;
	userId: string,
	assetType: string,
}

const AddAssetModal = ({ open, onOpenChange, onSave, userId, assetType }: AddAssetModalProps) => {
	// infinite scroll (intersection observer)
	const listRef = useRef<HTMLDivElement | null>(null);     // <- container scroll
	const sentinelRef = useRef<HTMLDivElement | null>(null); // <- cuối list

	const [search, setSearch] = useState('')
	const [selected, setSelected] = useState<Record<string, boolean>>({})
	const [activeTab, setActiveTab] = useState("cryptocurrencies");

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
		isLoading,
	} = useCandidateTokens(userId, search, activeTab);

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
		const t = setTimeout(() => refetch(), 300);
		return () => clearTimeout(t);
	}, [search, refetch]);

	// Flatten items
	const flat = useMemo(
		() => (data?.pages ?? []).flatMap((p: any) => p?.data?.items ?? []),
		[data]
	);

	const addBulk = useAddBulkToWatchlist()
	const qc = useQueryClient()


	useEffect(() => {
		if (!open) return
		const el = listRef.current
		if (!el) return

		const maybeFill = () => {
			if (hasNextPage && !isFetchingNextPage && el.scrollHeight <= el.clientHeight) {
				fetchNextPage()
			}
		}

		// chạy ngay khi mở
		const t = setTimeout(maybeFill, 0)

		// nếu nội dung thay đổi chiều cao => thử lấp tiếp
		const ro = new ResizeObserver(maybeFill)
		ro.observe(el)

		return () => {
			clearTimeout(t)
			ro.disconnect()
		}
	}, [open, data, hasNextPage, isFetchingNextPage, fetchNextPage])

	useEffect(() => {
		const el = listRef.current;
		if (!open || !el) return;
		const notScrollableYet = el.scrollHeight <= el.clientHeight;
		if (notScrollableYet && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [open, data, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const selectedCount = useMemo(
		() => Object.values(selected).filter(Boolean).length,
		[selected]
	)

	const handleSave = async () => {
		const symbols = Object.entries(selected)
			.filter(([, v]) => v)
			.map(([k]) => k)

		if (symbols.length === 0) {
			onOpenChange(false)
			return
		}

		try {
			await addBulk.mutateAsync({ userId, codes: symbols, assetType: 'cryptocurrencies' })
			// đóng modal + refresh list ngoài đã làm ở onSuccess()
			onOpenChange(false)
			// dọn state local
			setSelected({})
			// optional: cũng refresh luôn candidates nếu bạn muốn cập nhật trạng thái “Added”
			qc.invalidateQueries({ queryKey: ['watchlist-candidates', userId] })
		} catch (e) {
			// có thể toast lỗi ở đây
		}
	}
	// const tabs = [
	// 	"Cryptocurrencies",
	// 	"Stocks",
	// 	"Commodities"
	// ];
	if (!open) return null

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg p-0 w-full rounded-xl outline-none focus:outline-none" onOpenAutoFocus={(e) => e.preventDefault()}>
				<DialogHeader className="p-6 pb-4">
					<div className="flex items-center justify-between dark:text-white">
						<DialogTitle className="text-xl font-semibold">Add New Asset</DialogTitle>
					</div>
				</DialogHeader>
				{/* <div className="flex gap-2 px-4">
					{tabs.map((tab) => (
						<Button
							key={tab}
							variant={activeTab === tab ? "default" : "ghost"}
							size="sm"
							onClick={() => {
								setActiveTab(tab.toLowerCase() as string)
							}}
							className={`rounded-lg text-xs cursor-pointer ${activeTab === tab.toLocaleLowerCase() ? "bg-[#DDF346] text-black" : "bg-[#F8F8F8]"}`}
						>
							{tab}
						</Button>
					))}
				</div> */}
				<div className="px-4">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 dark:text-white" />
						<Input
							placeholder="Search coins"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-10 bg-muted/50 outline-none focus:outline-none dark:border-white dark:text-white"
						/>
					</div>
				</div>

				<div>
					<h3 className="text-sm font-medium mb-4 px-4 dark:text-white">Top ranking coins</h3>
					<div ref={listRef} onScroll={handleScroll} className="max-h-80 overflow-y-auto">
						{isLoading ? (
							<div className="py-10 grid place-items-center text-sm opacity-70 dark:text-white">Loading…</div>
						) : flat.length === 0 ? (
							<div className="py-10 grid place-items-center text-sm opacity-70 dark:text-white">No results</div>
						) : (
							flat.map((c: any, index: number) => {
								const keyId = c.code;
								const checked = !!selected[keyId];
								return (
									<div
										key={`${index}-${c.symbol}`}
										role="button"
										tabIndex={c.added ? -1 : 0}
										aria-pressed={checked}
										onClick={() => {
											if (c.added) return;
											setSelected((s) => ({ ...s, [keyId]: !s[keyId] }));
										}}
										onKeyDown={(e) => {
											if (c.added) return;
											if (e.key === 'Enter' || e.key === ' ') {
												e.preventDefault();
												setSelected((s) => ({ ...s, [keyId]: !s[keyId] }));
											}
										}}
										className={[
											"flex items-center justify-between border-b last:border-b-0 py-3 px-4",
											"border-black/5 dark:border-white/10",
											c.added ? "cursor-default" : "cursor-pointer hover:bg-black/5 dark:hover:bg-white/5",
											checked ? "bg-black/5 dark:bg-white/5" : ""
										].join(' ')}
									>
										<div className="flex items-center gap-3">
											<div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 dark:bg-white/10 grid place-items-center">
												{c.logo ? (
													<Image src={c.logo || '/images/icon-section-6_2.png'} alt={c.symbol} width={32} height={32} />
												) : (
													<span className="text-xs dark:text-white">{c.symbol?.slice(0, 2)}</span>
												)}
											</div>
											<div>
												<div className="text-sm font-medium dark:text-white">{c.name}</div>
												<div className="text-xs opacity-60 dark:text-white">{c.symbol}</div>
											</div>
										</div>
										{c.added ? (
											<span className="text-xs text-green-600 dark:text-green-400">Added</span>
										) : (
											<label className="inline-flex items-center gap-2 cursor-pointer select-none">
												<input
													type="checkbox"
													className="h-4 w-4 cursor-pointer"
													checked={checked}
													onClick={(e) => e.stopPropagation()}
													onChange={() =>
														setSelected((s) => ({ ...s, [c.code]: !s[c.code] }))
													}
												/>
											</label>
										)}
									</div>
								);
							})
						)}

						{/* sentinel ở CUỐI danh sách, vẫn nằm trong container */}
						<div ref={sentinelRef} />

						{isFetchingNextPage && (
							<div className="py-4 text-center text-xs opacity-70 dark:text-white">Loading more…</div>
						)}
					</div>
				</div>
				<div className="p-6 pt-4">
					<button
						onClick={handleSave}
						disabled={addBulk.isPending}
						className="cursor-pointer mt-4 h-10 w-full rounded-xl bg-[#3451FF] text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed relative"
					>
						{addBulk.isPending && (
							<span className="absolute inset-0 grid place-items-center">
								<span className="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
							</span>
						)}
						<span className={addBulk.isPending ? 'opacity-0' : ''}>
							Save {selectedCount > 0 ? `(${selectedCount})` : ''}
						</span>
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddAssetModal;