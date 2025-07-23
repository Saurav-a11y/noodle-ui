'use client'
import { useRouter } from "next/navigation";
import TooltipCommon from "@/components/common/TooltipCommon"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
// import Image from "next/image";
import _get from "lodash/get";
import _map from "lodash/map";
import { formatNumberShort, formatPercent } from "@/lib/format";
import IndustrialIcon from "@/icons/commodities/IndustrialIcon";

const industrial = [
	{ rank: 1, name: "Aluminum", symbol: "USD/T", health_score: 80, price: 2650.00, day: 0.234, '%': 0.35, weekly: 0.84, monthly: -1.41, ytd: -5.82, yoy: -13.85, date: "11:19" },
	{ rank: 2, name: "Bitumen", symbol: "CNY/T", health_score: 75, price: 3663.00, day: 0.136, '%': 0.20, weekly: 0.27, monthly: -2.91, ytd: -7.02, yoy: -15.78, date: "11:19" },
	{ rank: 3, name: "Cobalt", symbol: "CNY/T", health_score: 75, price: 33335, day: -0.1723, '%': -4.83, weekly: -2.17, monthly: -11.00, ytd: -6.66, yoy: 50.64, date: "11:19" },
	{ rank: 4, name: "Di-ammonium", symbol: "CNY/T", health_score: 74, price: 747.50, day: -0.0015, '%': 0.20, weekly: 0.27, monthly: -2.91, ytd: -7.02, yoy: -15.78, date: "11:19" },
	{ rank: 5, name: "Gallium", symbol: "CNY/Kg", health_score: 74, price: 1675.00, day: 0.0019, '%': 0.08, weekly: 2.64, monthly: 7.59, ytd: 5.85, yoy: 0.93, date: "11:19" },
	{ rank: 6, name: "Germanium", symbol: "CNY/Kg", health_score: 71, price: 14750, day: -0.10, '%': -0.09, weekly: -1.43, monthly: 3.18, ytd: -11.86, yoy: -18.28, date: "Jul/18" },
	{ rank: 7, name: "Indium", symbol: "CNY/Kg", health_score: 68, price: 2605, day: 0.81, '%': -2.36, weekly: -5.53, monthly: -19.00, ytd: -33.41, yoy: 5.92, date: "Jul/18" },
	{ rank: 8, name: "Kraft Pulp", symbol: "USD/T", health_score: 66, price: 5268.00, day: 0.81, '%': -2.36, weekly: -5.53, monthly: -19.00, ytd: -33.41, yoy: 5.92, date: "Jul/18" },
	{ rank: 9, name: "Lead", symbol: "USD/T", health_score: 65, price: 2010.35, day: 0.81, '%': -2.36, weekly: -5.53, monthly: -19.00, ytd: -33.41, yoy: 5.92, date: "Jul/18" },
	{ rank: 10, name: "Magnesium", symbol: "CNY/T", health_score: 45, price: 17300, day: 0.81, '%': -2.36, weekly: -5.53, monthly: -19.00, ytd: -33.41, yoy: 5.92, date: "Jul/18" },
];

const IndustrialCommoditiesOverview = () => {
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
								<p className="text-xs text-[#4B4A4A] dark:text-[#FFF] font-noto">Industrial</p>
							</TableHead>
							<TableHead className="text-center  border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">Community Health Score</p>
									<TooltipCommon content="A score from 0 to 100 that represents the overall health of a project’s community. It’s calculated using growth, engagement, authenticity, and activity consistency." />
								</div>
							</TableHead>
							<TableHead className="text-center  border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">Price</p>
									<TooltipCommon content="Represents the number of unique users who interacted with the project during a specific time range. Higher numbers indicate a more active and engaged community." />
								</div>
							</TableHead>
							<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">Day</p>
									<TooltipCommon content="Measures how many users are actively participating (likes, comments, shares) relative to the total audience. It reflects the quality and loyalty of community interactions." />
								</div>
							</TableHead>
							<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">%</p>
									<TooltipCommon content="Shows how fast the project’s community or activity is increasing over time. A steady or rising growth rate often signals momentum or renewed interest." />
								</div>
							</TableHead>
							<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">Weekly</p>
									<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
								</div>
							</TableHead>
							<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">Monthly</p>
									<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
								</div>
							</TableHead>
							<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">YTD</p>
									<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
								</div>
							</TableHead>
							<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">YoY</p>
									<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
								</div>
							</TableHead>
							<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
								<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
									<p className="text-xs font-noto">Date</p>
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
							: _map(industrial, (energy) => (
								<TableRow
									key={energy?.rank}
									className="hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] cursor-pointer transition-colors"
									onClick={() => router.push(`/cryptocurrencies/${energy?.symbol}`)}
								>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] text-xs border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{energy?.rank}</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 flex items-center justify-center font-noto">
												<IndustrialIcon />
												{/* <Image src={_get(energy, 'medium_logo_url', '/images/icon-section-6_2.png')} alt="Symbol" width={64} height={64} className="rounded-full" /> */}
											</div>
											<div className="text-[#4B4A4A] dark:text-[#FFF]">
												<p className="font-medium text-sm font-noto">{energy?.name}</p>
												<div className="text-[10px] font-medium opacity-50 font-noto">{energy?.symbol}</div>
											</div>
										</div>
									</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><p className="text-center">{formatNumberShort(energy?.health_score)}</p></TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><p className="text-center">{formatNumberShort(energy?.price)}</p></TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><div>{energy?.day}</div></TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">
										<div className={`text-center font-noto`}>
											{formatPercent(energy?.["%"])}
										</div>
									</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{energy?.weekly}%</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{energy?.monthly}%</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{energy?.ytd}%</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{energy?.yoy}%</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{energy?.date}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}

export default IndustrialCommoditiesOverview