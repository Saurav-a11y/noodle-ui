'use client'
import { useState } from "react";
import _loweCase from 'lodash/lowerCase';
import _map from 'lodash/map';

import { useCommoditiesHealthRanks } from "@/hooks/useCommodities";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import TooltipCommon from "@/components/common/TooltipCommon";
import { useRouter } from "next/navigation";
import { formatNumberShort } from "@/lib/format";
import OilIcon from "@/icons/commodities/OilIcon";
import GasIcon from "@/icons/commodities/GasIcon";
import EthanolIcon from "@/icons/commodities/EthanolIcon";
import CoalIcon from "@/icons/commodities/CoalIcon";
import { Atom, Panda, TrendingUpDown, Zap } from "lucide-react";
import MetalIcon from "@/icons/commodities/MetalIcon";
import HerbsIcon from "@/icons/commodities/HerbsIcon";
import IndustrialIcon from "@/icons/commodities/IndustrialIcon";

const tabList = ["All", "Energy", "Metals", "Agricultural", "Industrial", "Livestock", "Index", "Electricity"];

const CommoditiesTableHeader = ({ title }) => {
	return (
		<TableHeader className="dark:bg-[#1A1A1A]">
			<TableRow className="border-b border-b-[#C9C9C9]">
				<TableHead className="w-12 text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto rounded-tl-lg">#</TableHead>
				<TableHead className="border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
					<p className="text-xs text-[#4B4A4A] dark:text-[#FFF] font-noto">{title}</p>
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
						<p className="text-xs font-noto">Percent</p>
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
	)
}
const CommoditiesList = () => {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState("All");

	const { data: commoditiesData, isLoading: isGettingCommoditiesHealthRanks, } = useCommoditiesHealthRanks({
		limit: 10,
		page: 1,
		groupFilter: activeTab === 'All' ? '' : _loweCase(activeTab),
	});

	const typeIcons = {
		'metals': <MetalIcon />,
		'energy': {
			'Oil': <OilIcon />,
			'Gas': <GasIcon />,
			'Ethanol': <EthanolIcon />,
			'Coal': <CoalIcon />,
			'Nuclear': <Atom />
		},
		'agricultural': <HerbsIcon />,
		'industrial': <IndustrialIcon />,
		'livestock': <Panda />,
		'index': <TrendingUpDown />,
		'electricity': <Zap />
	}

	return (
		<>
			<div className="flex gap-2 mb-6">
				{tabList.map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`px-4 py-1 rounded border font-reddit cursor-pointer text-sm font-medium ${activeTab === tab
							? "bg-[#7FCE00] text-white border-[#7FCE00]"
							: "bg-white dark:bg-[#1E1E1E] text-gray-700 dark:text-white border-gray-300 hover:bg-gray-100 dark:hover:bg-[#333]"
							}`}
					>
						{tab}
					</button>
				))}
			</div>
			<div className="space-y-8">
				{isGettingCommoditiesHealthRanks ? <div className="p-5 bg-white dark:bg-black rounded-xl shadow-xl">
					<p className="text-lg font-medium font-reddit mb-5 dark:text-white">Loading Commodities...</p>
					<Table>
						<CommoditiesTableHeader title="Loading" />
						<TableBody>
							{Array.from({ length: 5 }).map((_, i) => (
								<TableRow key={i} className="animate-pulse">
									{Array.from({ length: 11 }).map((_, j) => (
										<TableCell key={j} className="py-4 h-[73px] border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
											<div className="h-6 bg-gray-200 dark:bg-[#333] rounded animate-pulse w-full" />
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div> : (
					commoditiesData?.data?.map(({ group, topItems }) => (
						<div key={group} className="p-5 bg-white dark:bg-black rounded-xl shadow-xl">
							<p className="text-lg font-medium font-reddit mb-5 dark:text-white">{group.charAt(0).toUpperCase() + group.slice(1)} Commodities Overview</p>
							<div className="overflow-x-auto">
								<Table>
									<TableHeader className="dark:bg-[#1A1A1A]">
										<TableRow className="border-b border-b-[#C9C9C9]">
											<TableHead className="w-12 text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto rounded-tl-lg">#</TableHead>
											<TableHead className="border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
												<p className="text-xs text-[#4B4A4A] dark:text-[#FFF] font-noto">{group.charAt(0).toUpperCase() + group.slice(1)}</p>
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
													<p className="text-xs font-noto">Percent</p>
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
										{_map(topItems, (item, index) => (
											<TableRow
												key={index}
												className="hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] cursor-pointer transition-colors"
												onClick={() => router.push(`/commodities/${item.name_slug}`)}
											>
												<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] text-xs border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{index + 1}</TableCell>
												<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
													<div className="flex items-center gap-3">
														<div className="w-8 h-8 flex items-center justify-center font-noto text-black dark:text-white">
															{item?.group === 'energy'
																? typeIcons.energy[item?.energyType]
																: typeIcons[item?.group]}
														</div>
														<div className="text-[#4B4A4A] dark:text-[#FFF]">
															<p className="font-medium text-sm font-noto">{item?.name}</p>
															<div className="text-[10px] font-medium opacity-50 font-noto">{item?.unit}</div>
														</div>
													</div>
												</TableCell>
												<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><p className="text-center">{formatNumberShort(item?.healthScore)}</p></TableCell>
												<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><p className="text-center">{formatNumberShort(item?.price)}</p></TableCell>
												<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">
													<div className={`text-center font-noto space-x-1 ${item?.trend === 'up' && 'text-[#00B552]'} ${item?.trend === 'down' && 'text-[#FF0000]'}`}>
														<span>{item?.trend === 'up' && '▲'}</span>
														<span>{item?.trend === 'down' && '▼'}</span>
														<span>{item?.day}</span>
													</div>
												</TableCell>
												<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">
													<div className={`text-center font-noto space-x-1 ${item?.trend === 'up' && 'text-[#00B552]'} ${item?.trend === 'down' && 'text-[#FF0000]'}`}>
														<span>{item?.trend === 'up' && '▲'}</span>
														<span>{item?.trend === 'down' && '▼'}</span>
														<span>{item?.percent}</span>
													</div>
												</TableCell>
												<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{item?.weekly}</TableCell>
												<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{item?.monthly}</TableCell>
												<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{item?.ytd}</TableCell>
												<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{item?.yoy}</TableCell>
												<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{item?.date}</TableCell>
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

export default CommoditiesList;