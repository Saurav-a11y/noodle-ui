'use client'
import { useRouter } from "next/navigation";
import TooltipCommon from "@/components/common/TooltipCommon"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import _get from "lodash/get";
import _map from "lodash/map";
import { formatNumberShort } from "@/lib/format";
import IndustrialIcon from "@/icons/commodities/IndustrialIcon";

const IndustrialCommoditiesOverview = ({ data, isLoading }) => {
	const router = useRouter();
	return (
		<div className="p-5 bg-white dark:bg-black rounded-xl shadow-xl">
			<div className="overflow-x-auto">
				<Table>
					<TableHeader className="dark:bg-[#1A1A1A]">
						<TableRow className="bg-[#F8F8F8] border-b border-b-[#C9C9C9]">
							<TableHead className="w-12 text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto rounded-tl-lg">#</TableHead>
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
							<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] rounded-tr-lg">
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
									{Array.from({ length: 11 }).map((_, j) => (
										<TableCell key={j} className="py-4 h-[73px] border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
											<div className="h-6 bg-gray-200 dark:bg-[#333] rounded animate-pulse w-full" />
										</TableCell>
									))}
								</TableRow>
							))
							: _map(data, (industry, index) => (
								<TableRow
									key={index}
									className="hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] cursor-pointer transition-colors"
									onClick={() => router.push(`/cryptocurrencies/${industry?.name_slug}`)}
								>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] text-xs border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{index + 1}</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 flex items-center justify-center font-noto">
												<IndustrialIcon />
											</div>
											<div className="text-[#4B4A4A] dark:text-[#FFF]">
												<p className="font-medium text-sm font-noto">{industry?.name}</p>
												<div className="text-[10px] font-medium opacity-50 font-noto">{industry?.unit}</div>
											</div>
										</div>
									</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><p className="text-center">{formatNumberShort(industry?.healthScore)}</p></TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><p className="text-center">{formatNumberShort(industry?.price)}</p></TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><div>{industry?.day}</div></TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">
										<div className={`text-center font-noto space-x-1 ${industry?.trend === 'up' && 'text-[#00B552]'} ${industry?.trend === 'down' && 'text-[#FF0000]'}`}>
											<span>{industry?.trend === 'up' && '▲'}</span>
											<span>{industry?.trend === 'down' && '▼'}</span>
											<span>{industry?.day}</span>
										</div>
									</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{industry?.weekly}</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{industry?.monthly}</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{industry?.ytd}</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{industry?.yoy}</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{industry?.date}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}

export default IndustrialCommoditiesOverview