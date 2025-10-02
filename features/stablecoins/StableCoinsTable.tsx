'use client'

import { Input } from "@/components/ui/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { useMe } from "@/hooks/useAuth"
import { useGetStableCoins } from "@/hooks/useStablecoins"
import { useAddUserActivityLog } from "@/hooks/useUserActivityLog"
import { formatCurrency, formatNumberWithCommas } from "@/lib/format"
import { useDebounce } from "@/lib/useDebounce"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LIMIT = 20;

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
	const generatePageNumbers = () => {
		if (totalPages <= 1) return null;
		const pages: (number | string)[] = [];

		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			pages.push(1);

			if (currentPage > 3) pages.push('...');

			const start = Math.max(2, currentPage - 1);
			const end = Math.min(totalPages - 1, currentPage + 1);

			for (let i = start; i <= end; i++) pages.push(i);

			if (currentPage < totalPages - 2) pages.push('...');

			pages.push(totalPages);
		}

		return pages;
	};

	const handlePageClick = (page: number | string) => {
		if (typeof page === 'number' && page !== currentPage) {
			onPageChange(page);
		}
	};

	return (
		<div className="flex gap-2 justify-end mt-4">
			<div key="prev" className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1px] rounded cursor-pointer">
				<button
					disabled={currentPage === 1}
					onClick={() => onPageChange(currentPage - 1)}
					className="relative bg-white dark:bg-[#1A1A1A] dark:text-[#FFFFFF] cursor-pointer rounded px-3 py-1 font-medium flex items-center gap-2 h-full">
					<ChevronLeft className="w-4" />
				</button>
			</div>

			<div className="flex gap-2">
				{generatePageNumbers()?.map((page, i) => (
					<button
						key={i}
						className={`min-w-[34.05px] px-3 py-1 h-full rounded text-sm font-medium cursor-pointer font-reddit ${page === currentPage
							? 'transition-colors bg-gradient-to-r from-[#DDF346] to-[#84EA07] text-[#494949] font-medium border-transparent'
							: 'bg-white dark:bg-[#1A1A1A] text-[#494949] dark:text-white'
							}`}
						onClick={() => handlePageClick(page)}
					>
						{page}
					</button>
				))}
			</div>
			<div key="next" className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1px] rounded cursor-pointer">
				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="relative bg-white dark:bg-[#1A1A1A] cursor-pointer dark:text-[#FFFFFF] rounded px-3 py-1 font-medium flex items-center gap-2 h-full">
					<ChevronRight className="w-4" />
				</button>
			</div>
		</div>
	);
};

const StableCoinsTable = () => {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search, 300);
	const { data, isLoading } = useGetStableCoins({ q: debouncedSearch, page, limit: LIMIT });
	const { data: userData } = useMe()
	const { mutate: addLog } = useAddUserActivityLog();

	const items = data?.data?.items ?? [];
	const total = data?.data?.total ?? 0;
	const totalPages = Math.ceil(total / LIMIT);

	return (
		<div>
			<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA0700] p-[1px] rounded-full w-[320px] mb-4">
				<div className="relative rounded-full bg-[#f9f9f9] dark:bg-[#1A1A1A] dark:text-[#FFFFFF]">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
					<Input
						placeholder={"Search..."}
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
							setPage(1); // reset page khi search
						}}
						className="pl-10 py-2 max-w-xs w-fit bg-transparent border-none rounded-full focus:outline-none focus:ring-0 font-reddit dark:text-[#FFFFFF]"
					/>
				</div>
			</div>
			<Table>
				<TableHeader className="dark:bg-[#1A1A1A]">
					<TableRow className="border-b">
						<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto rounded-tl-lg font-normal text-xs">#</TableHead>
						<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs">Name</TableHead>
						<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs text-center">Price</TableHead>
						<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs text-center">Volume(24h)</TableHead>
						<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs w-[120px] text-center">Market Cap</TableHead>
						<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs w-[140px] text-end">Circulating Supply</TableHead>
						<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs">Brief Introduction</TableHead>
						<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs">Backing Mechanixs</TableHead>
						<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs w-[120px] text-end">Best Yield</TableHead>
						<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto rounded-tr-lg font-normal text-xs w-[164px] text-center">Depegging History</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isLoading
						? Array.from({ length: 5 }).map((_, i) => (
							<TableRow key={i} className="animate-pulse">
								{Array.from({ length: 10 }).map((_, j) => (
									<TableCell key={j} className="py-4 h-[73px] border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
										<div className="h-6 bg-gray-200 dark:bg-[#333] rounded animate-pulse w-full" />
									</TableCell>
								))}
							</TableRow>
						))
						: items?.map((asset, index) => {
							return (
								<TableRow
									key={asset.symbol}
									className="hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] cursor-pointer transition-colors"
									onClick={() => {
										router.push(`/cryptocurrencies/${asset?.currency}`)
										if (userData?.data?.id) {
											addLog({
												userId: userData?.data?.id,
												type: 'view_detail',
												assetType: 'cryptocurrencies',
												assetSymbol: asset.currency,
												assetName: asset.name,
												assetLogo: asset.logo,
												content: `See details: '${asset.name} (${asset.currency}) Community'`,
											});
										}
									}}
								>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white">
										{(page - 1) * LIMIT + index + 1}
									</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] dark:text-white">
										<div className="flex items-center gap-3 text-xs">
											<div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
												{asset?.logo ? (
													<Image
														src={asset.logo}
														alt={asset?.symbol ?? 'token'}
														width={64}
														height={64}
														className="rounded-full"
													/>
												) : (
													<span className="text-xs text-white">
														{(asset?.symbol ?? '?').slice(0, 2)}
													</span>
												)}
											</div>
											<div className="flex-1">
												<div className="font-medium">{asset?.name}</div>
												<div className="text-[10px] text-muted-foreground">{asset?.currency}</div>
											</div>
										</div>
									</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white text-center">
										${formatNumberWithCommas(asset?.price)}
									</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white">
										<div>
											<div className="text-end">
												${formatNumberWithCommas(asset?.vol_24h)}
											</div>
											<div className="text-end">
												{formatCurrency(asset?.vol_24h)}
											</div>
										</div>
									</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white">
										{asset?.marketCap ? `$${formatNumberWithCommas(asset?.marketCap)}` : '--'}
									</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white text-end">
										{asset?.circulating_supply ? `${formatCurrency(asset?.marketCap)} ${asset?.currency}` : '--'}
									</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white">
										{asset?.brief_info}
									</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white">
										{asset?.mechanism}
									</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white text-end">
										{asset?.best_yield ? `${asset?.best_yield?.apy.toFixed(2)}%` : '--'}
									</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white text-center">
										{asset?.depegging_history}
									</TableCell>
								</TableRow>
							)
						})}
				</TableBody>
			</Table>
			{!isLoading && (
				<Pagination
					currentPage={page}
					totalPages={totalPages}
					onPageChange={setPage}
				/>
			)}
		</div>
	)
}

export default StableCoinsTable;