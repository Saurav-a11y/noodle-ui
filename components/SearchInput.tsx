'use client'

import { Loader2, Search } from "lucide-react"
import { Input } from "./ui/Input"
import { useCallback, useEffect, useRef, useState } from "react";
import { useCommunityHealthRanks } from "@/features/dashboard/hooks/useCommunityHealthRanks";
import Link from "next/link";
import clsx from "clsx";
import { formatCurrency } from "@/lib/format";

const SkeletonItem = () => (
	<div className="flex items-center gap-2 px-4 py-3 animate-pulse">
		<div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#222]" />
		<div className="flex-1">
			<div className="h-3 w-24 bg-gray-200 dark:bg-[#222] rounded mb-2" />
			<div className="h-2 w-12 bg-gray-200 dark:bg-[#222] rounded" />
		</div>
		<div className="ml-auto w-10 h-3 bg-gray-200 dark:bg-[#222] rounded" />
	</div>
);

export const SearchInput = ({ inputClassname, popupClassname, placeholder }: { placeholder?: string, inputClassname?: string, popupClassname?: string }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const popupRef = useRef<HTMLDivElement>(null);

	const [searchTerm, setSearchTerm] = useState("");
	const [showResults, setShowResults] = useState(false);
	const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
	const [page, setPage] = useState(1);
	const [results, setResults] = useState<any[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const { data, isFetching } = useCommunityHealthRanks({ search: debouncedSearch, page });

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
		return () => clearTimeout(handler);
	}, [searchTerm]);

	useEffect(() => {
		setPage(1);
		setResults([]);
		setHasMore(true);
	}, [debouncedSearch]);

	useEffect(() => {
		if (data?.data?.community_health_rankings) {
			if (page === 1) {
				setResults(data.data.community_health_rankings);
			} else if (data.data.community_health_rankings.length > 0) {
				setResults(prev => [...prev, ...data.data.community_health_rankings]);
			}
			setHasMore(data.data.community_health_rankings.length > 0);
		}
		setIsLoadingMore(false);
	}, [data, page]);

	// Click outside input/popup to hide
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (
				!inputRef.current?.contains(e.target as Node) &&
				!popupRef.current?.contains(e.target as Node)
			) {
				setShowResults(false);
			}
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
		const el = e.target as HTMLDivElement;
		if (
			hasMore &&
			!isFetching &&
			!isLoadingMore &&
			el.scrollTop + el.clientHeight >= el.scrollHeight - 50
		) {
			setIsLoadingMore(true);
			setPage(prev => prev + 1);
		}
	}, [hasMore, isFetching, isLoadingMore]);
	return (
		<div className={`flex-1 max-w-[200px] mx-8 hidden md:block ${inputClassname}`}>
			<div className="relative">
				<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA0700] p-[1px] rounded-full">
					<div className="relative rounded-full bg-[#f9f9f9] dark:bg-[#1A1A1A] dark:text-[#FFFFFF]">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
						<Input
							placeholder={placeholder || "Search..."}
							ref={inputRef}
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							onFocus={() => setShowResults(true)}
							className="pl-10 py-2 w-full bg-transparent border-none rounded-full focus:outline-none focus:ring-0 font-reddit dark:text-[#FFFFFF]"
						/>
					</div>
				</div>
				{showResults && debouncedSearch && (
					<div
						ref={popupRef}
						className={`absolute w-[300px] -left-1/4 right-0 top-[44px] bg-white dark:bg-[#1A1A1A] border dark:border-[#222] border-[#f3f3f3] rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto ${popupClassname}`}
						onScroll={handleScroll}
					>
						{results.length === 0 && isFetching ? (
							Array.from({ length: 6 }).map((_, idx) => <SkeletonItem key={idx} />)
						) : results.length > 0 ? (
							<>
								{results.map((item: any) => (
									<Link
										href={`/community/${item.symbol}`}
										key={item.symbol}
										className={clsx(
											"block px-4 py-3 hover:bg-[#F3F3F3] dark:hover:bg-[#222] transition-colors",
											"border-b last:border-b-0 border-[#f3f3f3] dark:border-[#222]"
										)}
										onClick={() => setShowResults(false)}
									>
										<div className="flex items-center gap-2">
											<img src={item.medium_logo_url} width={32} height={32} alt="Image Community" className="w-8 h-8 rounded-full" />
											<div>
												<div className="text-sm dark:text-white font-noto font-semibold">{item.name}</div>
												<div className="text-[10px] text-gray-500 font-noto">{item.symbol}</div>
											</div>
											<span className="ml-auto text-sm text-[#DDF346] font-semibold font-noto">{formatCurrency(item?.market_cap?.value)}</span>
										</div>
									</Link>
								))}
								{isLoadingMore && (
									<div className="p-3 flex items-center justify-center">
										<Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
										<span className="ml-2 text-xs text-gray-400 font-noto">Loading more...</span>
									</div>
								)}
							</>
						) : (
							<div className="p-4 text-sm text-gray-400 text-center font-noto">No results found.</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}