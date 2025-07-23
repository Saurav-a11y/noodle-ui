'use client'
import { useRouter } from "next/navigation";
import TooltipCommon from "@/components/common/TooltipCommon"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import Image from "next/image";
import _get from "lodash/get";
import _map from "lodash/map";
import { formatPercent } from "@/lib/format";

const companies = [
	{ rank: 1, medium_logo_url: '/images/stocks/nvidia.png', name: "NVIDIA Corporation", symbol: "NVDA", price: 172.41, change: -0.34, volume: "146.45M", marketCap: "4.21T", pe: 55.54, eps: 3.10, epsGrowth: 81.60, dividend: "0.02%" },
	{ rank: 2, medium_logo_url: '/images/stocks/apple.png', name: "Apple Inc.", symbol: "AAPL", price: 510.05, change: -0.32, volume: "21.21M", marketCap: "4.21T", pe: 55.54, eps: 3.10, epsGrowth: 81.60, dividend: "0.02%" },
	{ rank: 3, medium_logo_url: '/images/stocks/amazon.png', name: "Amazon.com, Inc.", symbol: "AMZN", price: 211.18, change: 0.55, volume: "48.97M", marketCap: "3.15T", pe: 32.96, eps: 6.41, epsGrowth: 0.35, dividend: "0.48%" },
	{ rank: 4, medium_logo_url: '/images/stocks/google.png', name: "Alphabet Inc.", symbol: "GOOG", price: 226.13, change: 1.01, volume: "37.83M", marketCap: "3.15T", pe: 32.96, eps: 6.41, epsGrowth: 0.35, dividend: "0.48%" },
	{ rank: 5, medium_logo_url: '/images/stocks/meta.png', name: "Meta Platforms, Inc.", symbol: "META", price: 185.94, change: 0.67, volume: "21.03M", marketCap: "3.15T", pe: 32.96, eps: 6.41, epsGrowth: 0.35, dividend: "0.48%" },
	{ rank: 6, medium_logo_url: '/images/stocks/microsoft.png', name: "Microsoft Corporation", symbol: "MSFT", price: 96.00, change: 0.34, volume: "12.78M", marketCap: "3.15T", pe: 32.96, eps: 6.41, epsGrowth: 0.35, dividend: "0.48%" },
	{ rank: 7, medium_logo_url: '/images/stocks/broadcom.png', name: "Broadcom Inc.", symbol: "AVGO", price: 283.34, change: -1.09, volume: "15.01M", marketCap: "4.21T", pe: 55.54, eps: 3.10, epsGrowth: 81.60, dividend: "0.02%" },
	{ rank: 8, medium_logo_url: '/images/stocks/tesla.png', name: "Tesla, Inc.", symbol: "TSLA", price: 329.65, change: 3.21, volume: "94.25M", marketCap: "3.15T", pe: 32.96, eps: 6.41, epsGrowth: 0.35, dividend: "0.48%" },
	{ rank: 9, medium_logo_url: '/images/stocks/bh.png', name: "Berkshire Hathaway Inc.", symbol: "BRK.A", price: 710978.50, change: 0.16, volume: "240", marketCap: "3.15T", pe: 32.96, eps: 6.41, epsGrowth: 0.35, dividend: "0.48%" },
	{ rank: 10, medium_logo_url: '/images/stocks/jpmorgan.png', name: "JP Morgan Chase & Co.", symbol: "JPM", price: 291.27, change: 0.47, volume: "12.22M", marketCap: "3.15T", pe: 32.96, eps: 6.41, epsGrowth: 0.35, dividend: "0.48%" },
	{ rank: 11, medium_logo_url: '/images/stocks/walmart.png', name: "Walmart Inc.", symbol: "WMT", price: 95.05, change: 0.04, volume: "14.64M", marketCap: "4.21T", pe: 55.54, eps: 3.10, epsGrowth: 81.60, dividend: "0.02%" },
	{ rank: 12, medium_logo_url: '/images/stocks/lilly.png', name: "Eli Lilly and Company", symbol: "LLY", price: 771.71, change: 1.34, volume: "3.36M", marketCap: "3.15T", pe: 32.96, eps: 6.41, epsGrowth: 0.35, dividend: "0.48%" },
	{ rank: 13, medium_logo_url: '/images/stocks/oracle.png', name: "Oracle Corporation", symbol: "ORCL", price: 245.45, change: -1.33, volume: "9.68M", marketCap: "4.21T", pe: 55.54, eps: 3.10, epsGrowth: 81.60, dividend: "0.02%" },
	{ rank: 14, medium_logo_url: '/images/stocks/visa.png', name: "Visa Inc.", symbol: "V", price: 349.05, change: -0.22, volume: "4.93M", marketCap: "4.21T", pe: 55.54, eps: 3.10, epsGrowth: 81.60, dividend: "0.02%" },
	{ rank: 15, medium_logo_url: '/images/stocks/netflix.png', name: "Netflix, Inc.", symbol: "NFLX", price: 1209.24, change: 0.34, volume: "146.45M", marketCap: "4.21T", pe: 55.54, eps: 3.10, epsGrowth: 81.60, dividend: "0.02%" },
	{ rank: 16, medium_logo_url: '/images/stocks/mastercard.png', name: "Mastercard Incorporated", symbol: "MA", price: 552.66, change: 0.34, volume: "146.45M", marketCap: "4.21T", pe: 55.54, eps: 3.10, epsGrowth: 81.60, dividend: "0.02%" },
	{ rank: 17, medium_logo_url: '/images/stocks/costo.png', name: "Costco Wholesale Corporation", symbol: "COST", price: 107.77, change: 0.34, volume: "146.45M", marketCap: "4.21T", pe: 55.54, eps: 3.10, epsGrowth: 81.60, dividend: "0.02%" },
	{ rank: 18, medium_logo_url: '/images/stocks/johnson.png', name: "Johnson & Johnson", symbol: "JNJ", price: 950.95, change: 0.34, volume: "146.45M", marketCap: "4.21T", pe: 55.54, eps: 3.10, epsGrowth: 81.60, dividend: "0.02%" },
	{ rank: 19, medium_logo_url: '/images/stocks/pg.png', name: "Procter & Gamble Co. (The)", symbol: "PG", price: 211.18, change: 0.55, volume: "48.97M", marketCap: "3.15T", pe: 32.96, eps: 6.41, epsGrowth: 0.35, dividend: "0.48%" },
	{ rank: 20, medium_logo_url: '/images/stocks/palantir.png', name: "Palantir Technologies Inc.", symbol: "PLTR", price: 155.10, change: 0.34, volume: "146.45M", marketCap: "4.21T", pe: 55.54, eps: 3.10, epsGrowth: 81.60, dividend: "0.02%" },
];

const TopCompaniesByMarketCap = () => {
	const isLoading = false
	const router = useRouter();
	return (
		<div className="p-5 bg-white dark:bg-black rounded-xl shadow-xl">
			<div className="overflow-x-auto">
				<Table>
					<TableHeader className="dark:bg-[#1A1A1A]">
						<TableRow>
							<TableHead className="w-12 text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto dark:rounded-tl-lg">#</TableHead>
							<TableHead className="border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<p className="text-xs text-[#4B4A4A] dark:text-[#FFF] font-noto">Company Name</p>
							</TableHead>
							<TableHead className="text-center  border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">Price (USD)</p>
									<TooltipCommon content="A score from 0 to 100 that represents the overall health of a project’s community. It’s calculated using growth, engagement, authenticity, and activity consistency." />
								</div>
							</TableHead>
							<TableHead className="text-center  border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">Change %</p>
									<TooltipCommon content="Represents the number of unique users who interacted with the project during a specific time range. Higher numbers indicate a more active and engaged community." />
								</div>
							</TableHead>
							<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">Volume</p>
									<TooltipCommon content="Measures how many users are actively participating (likes, comments, shares) relative to the total audience. It reflects the quality and loyalty of community interactions." />
								</div>
							</TableHead>
							<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">Market Cap</p>
									<TooltipCommon content="Shows how fast the project’s community or activity is increasing over time. A steady or rising growth rate often signals momentum or renewed interest." />
								</div>
							</TableHead>
							<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">P/E</p>
									<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
								</div>
							</TableHead>
							<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">EPS (TTM)</p>
									<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
								</div>
							</TableHead>
							<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">EPS Growth YoY</p>
									<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
								</div>
							</TableHead>
							<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">Div yield TMT</p>
									<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
								</div>
							</TableHead>
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
							: _map(companies, (stock) => (
								<TableRow
									key={stock?.rank}
									className="hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] cursor-pointer transition-colors"
									onClick={() => router.push(`/cryptocurrencies/${stock?.symbol}`)}
								>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] text-xs border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{stock?.rank}</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 flex items-center justify-center font-noto border border border-[#F8F8F8] rounded-full">
												<Image src={_get(stock, 'medium_logo_url', '/images/icon-section-6_2.png')} alt="Symbol" width={64} height={64} className="rounded-full" />
											</div>
											<div className="text-[#4B4A4A] dark:text-[#FFF]">
												<p className="font-medium text-sm font-noto">{stock?.name}</p>
												<div className="text-[10px] font-medium opacity-50 font-noto">{stock?.symbol}</div>
											</div>
										</div>
									</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><p className="text-center">{stock?.price}</p></TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><div className="text-center">{formatPercent(stock?.change)}</div></TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><div>{stock?.volume}</div></TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">
										<div className={`text-center font-noto`}>
											{stock?.marketCap}
										</div>
									</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{stock?.pe}</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{stock?.eps}</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{formatPercent(stock?.epsGrowth)}</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{stock?.dividend}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}

export default TopCompaniesByMarketCap