'use client'
import _map from 'lodash/map';
import ProjectList from "@/components/common/ProjectList";
import StatCard from "@/components/common/StatCard";
import TooltipCommon from "@/components/common/TooltipCommon";
import EthanolIcon from "@/icons/commodities/EthanolIcon";
import GasIcon from "@/icons/commodities/GasIcon";
import MetalIcon from "@/icons/commodities/MetalIcon";
import OilIcon from "@/icons/commodities/OilIcon";
import { useOverviewCommoditiesStats, useTopGrowthCommodities } from "../hooks";
import HerbsIcon from '@/icons/commodities/HerbsIcon';
import IndustrialIcon from '@/icons/commodities/IndustrialIcon';
import CoalIcon from '@/icons/commodities/CoalIcon';
import { Atom, Zap, Panda, TrendingUpDown } from 'lucide-react';

const mostTalkedProjects7d = [
	{ rank: 1, symbol: 'LIT', name: 'Lithium', mentions: 9300, medium_logo_url: <MetalIcon /> },
	{ rank: 2, symbol: 'GOL', name: 'Gold', mentions: 7200, medium_logo_url: <MetalIcon /> },
	{ rank: 3, symbol: 'ALU', name: 'Aluminum', mentions: 4100, medium_logo_url: <MetalIcon /> },
	{ rank: 4, symbol: 'SIL', name: 'Silver', mentions: 2000, medium_logo_url: <MetalIcon /> },
	{ rank: 5, symbol: 'GAS', name: 'Gasoline', mentions: 900, medium_logo_url: <GasIcon /> },
]

const OverviewCard = ({ title, tooltip, isLoading, data }) => {
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
		<div className="bg-white dark:bg-black rounded-xl shadow-xl">
			<div className="flex items-center gap-2 dark:text-white px-5 pt-5 pb-3">
				<h3 className="font-reddit">{title}</h3>
				<TooltipCommon content={tooltip} />
			</div>
			<div className="text-[#4B4A4A] dark:text-white pb-3">
				{isLoading ? (
					<div className="px-5">
						{[...Array(5)].map((_, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between py-2 animate-pulse"
							>
								<div className="flex items-center gap-3">
									<div className="h-4 w-4 bg-gray-200 dark:bg-[#333] rounded animate-pulse rounded" />
									<div className="w-8 h-8 bg-gray-200 dark:bg-[#333] rounded animate-pulse rounded-full" />
									<div className="h-4 w-30 bg-gray-200 dark:bg-[#333] rounded animate-pulse rounded" />
								</div>
								<div className="h-4 w-14 bg-gray-200 dark:bg-[#333] rounded animate-pulse rounded" />
							</div>
						))}
					</div>
				) : (
					_map(data, (item, index) => (
						<div
							key={index}
							className="flex items-center justify-between cursor-pointer px-5 py-2 hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] rounded-lg transition"
						>
							<div className="flex items-center gap-3 font-noto">
								<span className="text-xs font-medium w-4">{index + 1}</span>
								<div className="w-8 h-8 flex items-center justify-center text-sm">
									{typeIcons[item?.group] === 'energy' ? typeIcons[item?.group][item?.energyType] : typeIcons[item?.group]}
								</div>
								<span className="text-sm font-medium">{item?.name}</span>
							</div>
							<p className={`flex items-center gap-0.5 text-sm font-medium ${item?.trend === 'up' && 'text-[#00B552]'} ${item?.trend === 'down' && 'text-[#FF0000]'}`}>
								<span>{item?.trend === 'up' && '▲'}</span>
								<span>{item?.trend === 'down' && '▼'}</span>
								<span>{item?.weekly}</span>
							</p>
						</div>
					))
				)}
			</div>
		</div>
	)
}
const OverviewStatistics = () => {
	const { data: topGrowthCommoditiesData, isLoading: isGettingTopGrowthCommodities, } = useTopGrowthCommodities();
	const { data: overviewCommoditiesStatsData, isLoading: isGettingOverviewCommoditiesStats, } = useOverviewCommoditiesStats();

	const topGrowthCommodities7d = topGrowthCommoditiesData?.data?.top_growth_commodities_7d || [];
	const trackedCommodities = overviewCommoditiesStatsData?.data?.tracked_commodities || {};
	return (
		<div>
			<div className="flex items-center gap-2 dark:text-[#FFFFFF] mb-6">
				<h3 className="text-3xl font-medium font-space">Overview</h3>
				<TooltipCommon content="A live leaderboard that ranks crypto projects based on their overall community health score. It helps you quickly identify which projects have strong, active, and authentic communities." />
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[#1E1B39]">
				{/* Top Growth Commodities */}
				<OverviewCard data={topGrowthCommodities7d} title="Top Growth Commodities (Growth Rate - 7d)" tooltip="The list of commodities with the highest price growth rate over the past 7 days, calculated based on percentage change." isLoading={isGettingTopGrowthCommodities} />

				{/* Most Talked About Projects */}
				<ProjectList
					title="Most Talked About Project (7D)"
					tooltip="Highlights the most mentioned projects across major platforms during the last 7 days. High mention volume often indicates rising interest and trending discussions."
					data={mostTalkedProjects7d}
					valueKey="mentions"
					valueSuffix=" mentions"
					isLoading={false}
					hasIcon
				/>

				{/* Summary Stats */}
				<div className="flex gap-4 flex-col">
					<StatCard
						title="Number of Tracked Commodities"
						tooltip="The total number of crypto projects being monitored for community signals and on-chain metrics. Only projects with enough consistent data are included."
						value={trackedCommodities?.value}
						change={{ direction: trackedCommodities?.change?.direction, absolute: trackedCommodities?.change?.absolute, percentage: trackedCommodities?.change?.percentage }}
						isLoading={isGettingOverviewCommoditiesStats}
					/>
					<StatCard
						title="Total Active Users (7D)"
						tooltip="Total number of unique users who engaged with tracked projects in the past 7 days. Includes social interactions, token activity, and contributions."
						value={133000000}
						change={{ direction: 'up', absolute: 214, percentage: 12 }}
						isLoading={false}
					/>
				</div>
			</div>
		</div>
	);
};

export default OverviewStatistics;