'use client'
import { useState } from "react";
import _loweCase from 'lodash/lowerCase';
import _map from 'lodash/map';

import { useCommoditiesHealthRanks } from "@/hooks/useCommodities";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import TooltipCommon from "@/components/common/TooltipCommon";
// import { useRouter } from "next/navigation";
import { formatNumberShort } from "@/lib/format";
import { useMe } from "@/hooks/useAuth";
import { useAddUserActivityLog } from "@/hooks/useUserActivityLog";
import Image from "next/image";

const tabList = ["All", "Energy", "Metals", "Agricultural",];
// "Industrial", "Livestock", "Index", "Electricity"
const CommoditiesTableHeader = ({ title }) => {
	return (
		<TableHeader className="bg-[var(--bg-hover)]">
			<TableRow className="order-b-[var(--border)]">
				<TableHead className="text-[var(--text-table)] border-b-[var(--border)] font-noto rounded-tl-lg font-normal text-xs">#</TableHead>
				<TableHead className="text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
					<p className="text-xs font-noto">{title}</p>
				</TableHead>
				<TableHead className="text-center  text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
					<div className="flex items-center gap-1">
						<p className="text-xs font-noto">Community Health Score</p>
						<TooltipCommon content="A score from 0 to 100 that represents the overall health of a project’s community. It’s calculated using growth, engagement, authenticity, and activity consistency." />
					</div>
				</TableHead>
				<TableHead className="text-center  text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
					<div className="flex items-center gap-1">
						<p className="text-xs font-noto">Price</p>
						<TooltipCommon content="Represents the number of unique users who interacted with the project during a specific time range. Higher numbers indicate a more active and engaged community." />
					</div>
				</TableHead>
				<TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
					<div className="flex items-center gap-1">
						<p className="text-xs font-noto">Day</p>
						<TooltipCommon content="Measures how many users are actively participating (likes, comments, shares) relative to the total audience. It reflects the quality and loyalty of community interactions." />
					</div>
				</TableHead>
				<TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
					<div className="flex items-center gap-1">
						<p className="text-xs font-noto">Percent</p>
						<TooltipCommon content="Shows how fast the project’s community or activity is increasing over time. A steady or rising growth rate often signals momentum or renewed interest." />
					</div>
				</TableHead>
				<TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
					<div className="flex items-center gap-1">
						<p className="text-xs font-noto">Weekly</p>
						<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
					</div>
				</TableHead>
				<TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
					<div className="flex items-center gap-1">
						<p className="text-xs font-noto">Monthly</p>
						<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
					</div>
				</TableHead>
				<TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
					<div className="flex items-center gap-1">
						<p className="text-xs font-noto">YTD</p>
						<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
					</div>
				</TableHead>
				<TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
					<div className="flex items-center gap-1">
						<p className="text-xs font-noto">YoY</p>
						<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
					</div>
				</TableHead>
				<TableHead className="text-[var(--text-table)] border-b-[var(--border)] font-noto rounded-tr-lg font-normal text-xs w-[164px] text-center">
					<div className="flex items-center gap-1">
						<p className="text-xs font-noto">Date</p>
						<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
					</div>
				</TableHead>
			</TableRow>
		</TableHeader>
	)
}
const CommoditiesTable = () => {
	// const router = useRouter();
	const [activeTab, setActiveTab] = useState("All");

	const { data: commoditiesData, isLoading: isGettingCommoditiesHealthRanks, } = useCommoditiesHealthRanks({
		limit: 10,
		page: 1,
		groupFilter: activeTab === 'All' ? '' : _loweCase(activeTab),
	});
	const { data: userData } = useMe()
	const { mutate: addLog } = useAddUserActivityLog();

	return (
		<>
			<div className="flex gap-2 mb-6">
				{tabList.map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`px-4 py-1 rounded border font-reddit cursor-pointer text-sm font-medium ${activeTab === tab
							? "bg-[#84EA07] text-black border-[#84EA07]"
							: "bg-transparent text-[var(--text)] border-[var(--border)]"
							}`}
					>
						{tab}
					</button>
				))}
			</div>
			<div className="space-y-6">
				{isGettingCommoditiesHealthRanks ? <div className="bg-[var(--bg-card)] rounded-xl">
					<p className="text-lg font-medium font-reddit mb-5 text-[var(--text)]">Loading Commodities...</p>
					<Table>
						<CommoditiesTableHeader title="Loading" />
						<TableBody>
							{Array.from({ length: 5 }).map((_, i) => (
								<TableRow key={i} className="animate-pulse">
									{Array.from({ length: 11 }).map((_, j) => (
										<TableCell key={j} className="py-4 h-[73px] border-b border-b-[var(--border)]">
											<div className="h-6 bg-[var(--loading)] rounded animate-pulse w-full" />
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div> : (
					commoditiesData?.data?.map(({ group, topItems }) => (
						<div key={group} className="">
							<p className="text-lg font-medium font-reddit mb-5 text-[var(--text)]">{group.charAt(0).toUpperCase() + group.slice(1)} Commodities Overview</p>
							<div className="overflow-x-auto">
								<Table>
									<TableHeader className="bg-[var(--bg-hover)]">
										<TableRow className="border-b-[var(--border)]">
											<TableHead className="text-[var(--text-table)] border-b-[var(--border)] font-noto rounded-tl-lg font-normal text-xs">#</TableHead>
											<TableHead className="text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
												<p className="text-xs font-noto">{group.charAt(0).toUpperCase() + group.slice(1)}</p>
											</TableHead>
											<TableHead className="text-center  text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
												<div className="flex items-center gap-1">
													<p className="text-xs font-noto">Community Health Score</p>
													<TooltipCommon content="A score from 0 to 100 that represents the overall health of a project’s community. It’s calculated using growth, engagement, authenticity, and activity consistency." />
												</div>
											</TableHead>
											<TableHead className="text-center  text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
												<div className="flex items-center gap-1">
													<p className="text-xs font-noto">Price</p>
													<TooltipCommon content="Represents the number of unique users who interacted with the project during a specific time range. Higher numbers indicate a more active and engaged community." />
												</div>
											</TableHead>
											<TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
												<div className="flex items-center gap-1">
													<p className="text-xs font-noto">Day</p>
													<TooltipCommon content="Measures how many users are actively participating (likes, comments, shares) relative to the total audience. It reflects the quality and loyalty of community interactions." />
												</div>
											</TableHead>
											<TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
												<div className="flex items-center gap-1">
													<p className="text-xs font-noto">Percent</p>
													<TooltipCommon content="Shows how fast the project’s community or activity is increasing over time. A steady or rising growth rate often signals momentum or renewed interest." />
												</div>
											</TableHead>
											<TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
												<div className="flex items-center gap-1">
													<p className="text-xs font-noto">Weekly</p>
													<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
												</div>
											</TableHead>
											<TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
												<div className="flex items-center gap-1">
													<p className="text-xs font-noto">Monthly</p>
													<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
												</div>
											</TableHead>
											<TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
												<div className="flex items-center gap-1">
													<p className="text-xs font-noto">YTD</p>
													<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
												</div>
											</TableHead>
											<TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
												<div className="flex items-center gap-1">
													<p className="text-xs font-noto">YoY</p>
													<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
												</div>
											</TableHead>
											<TableHead className="text-[var(--text-table)] border-b-[var(--border)] font-noto rounded-tr-lg font-normal text-xs w-[164px] text-center">
												<div className="flex items-center gap-1">
													<p className="text-xs font-noto">Date</p>
													<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
												</div>
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{_map(topItems, (item, index) => (
											<TableRow
												key={index}
												className="hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
												onClick={() => {
													// router.push(`/commodities/${item.name_slug}`)
													if (userData?.data?.id) {
														addLog({
															userId: userData?.data?.id,
															type: 'view_detail',
															assetType: 'commodity',
															assetSymbol: item.symbol,
															assetName: item.name,
															assetLogo: item.medium_logo_url,
															content: `See details: '${item.name} (${item.exchange}:${item.symbol}) Community'`,
														});
													}
												}}
											>
												<TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)] font-noto">{index + 1}</TableCell>
												<TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)]">
													<div className="flex items-center gap-3">
														<div className="w-8 h-8 flex items-center justify-center font-noto text-black dark:text-white">
															<Image src={item?.medium_logo_url ?? '/images/icon-section-6_2.png'} alt="Symbol" width={64} height={64} className="rounded-full" />
														</div>
														<div>
															<p className="font-medium text-sm font-noto">{item?.name}</p>
															<div className="text-[10px] font-medium opacity-50 font-noto">{item?.unit}</div>
														</div>
													</div>
												</TableCell>
												<TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)] font-noto"><p className="text-center">{formatNumberShort(item?.healthScore)}</p></TableCell>
												<TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)] font-noto"><p className="text-center">{formatNumberShort(item?.price)}</p></TableCell>
												<TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)] font-noto">
													<div className={`text-center font-noto space-x-1 ${item?.trend === 'up' && 'text-[#00B552]'} ${item?.trend === 'down' && 'text-[#FF0000]'}`}>
														<span>{item?.trend === 'up' && '▲'}</span>
														<span>{item?.trend === 'down' && '▼'}</span>
														<span>{item?.day}</span>
													</div>
												</TableCell>
												<TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)] font-noto">
													<div className={`text-center font-noto space-x-1 ${item?.trend === 'up' && 'text-[#00B552]'} ${item?.trend === 'down' && 'text-[#FF0000]'}`}>
														<span>{item?.trend === 'up' && '▲'}</span>
														<span>{item?.trend === 'down' && '▼'}</span>
														<span>{item?.percent}</span>
													</div>
												</TableCell>
												<TableCell className="text-sm border-b border-b-[var(--border)] text-xs text-[var(--text)] font-noto">{item?.weekly}</TableCell>
												<TableCell className="text-sm border-b border-b-[var(--border)] text-xs text-[var(--text)] font-noto">{item?.monthly}</TableCell>
												<TableCell className="text-sm border-b border-b-[var(--border)] text-xs text-[var(--text)] font-noto">{item?.ytd}</TableCell>
												<TableCell className="text-sm border-b border-b-[var(--border)] text-xs text-[var(--text)] font-noto">{item?.yoy}</TableCell>
												<TableCell className="text-sm border-b border-b-[var(--border)] text-xs text-[var(--text)] font-noto">{item?.date}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</div>
					))
				)}
			</div>
		</>
	)
}

export default CommoditiesTable;