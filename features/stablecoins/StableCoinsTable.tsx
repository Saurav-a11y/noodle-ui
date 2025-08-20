'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { useGetStableCoins } from "@/hooks/useWatchlist"
import { formatCurrency, formatNumberWithCommas } from "@/lib/format"
import Image from "next/image"
import { useRouter } from "next/navigation"

const StableCoinsTable = () => {
	const { data, isLoading } = useGetStableCoins();
	const router = useRouter();
	return (
		<Table>
			<TableHeader className="dark:bg-[#1A1A1A]">
				<TableRow className="border-b">
					<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto rounded-tl-lg font-normal text-xs">#</TableHead>
					<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs">Name</TableHead>
					<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs">Price</TableHead>
					<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs">Volume(24h)</TableHead>
					<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs w-[120px]">Market Cap</TableHead>
					<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs">Brief Introduction</TableHead>
					<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs">Backing Mechanixs</TableHead>
					<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal text-xs w-[120px] text-center">Best Yield</TableHead>
					<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto rounded-tr-lg font-normal text-xs w-[164px] text-center">Depegging History</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{isLoading
					? Array.from({ length: 5 }).map((_, i) => (
						<TableRow key={i} className="animate-pulse">
							{Array.from({ length: 9 }).map((_, j) => (
								<TableCell key={j} className="py-4 h-[73px] border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
									<div className="h-6 bg-gray-200 dark:bg-[#333] rounded animate-pulse w-full" />
								</TableCell>
							))}
						</TableRow>
					))
					: data?.data?.items?.map((asset, index) => {
						return (
							<TableRow
								key={asset.symbol}
								className="hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] cursor-pointer transition-colors"
								onClick={() => router.push(`/cryptocurrencies/${asset?.symbol}`)}
							>
								<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white">
									{index + 1}
								</TableCell>
								{/* <TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs">
									{asset?.rank}
								</TableCell> */}
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
								<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white">
									${formatNumberWithCommas(asset?.price)}
								</TableCell>
								<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white">
									{formatCurrency(asset?.vol_24h)}
								</TableCell>
								<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white">
									{asset?.marketCap ? `${formatCurrency(asset?.marketCap)}` : '--'}
								</TableCell>
								<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white">
									{asset?.brief_info}
								</TableCell>
								<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white">
									{asset?.mechanism}
								</TableCell>
								<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] text-xs dark:text-white text-center">
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
	)
}

export default StableCoinsTable;