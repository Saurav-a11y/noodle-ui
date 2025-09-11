'use client'
import _map from 'lodash/map';
import ProjectList from "@/components/common/ProjectList";
import StatCard from "@/components/common/StatCard";
import TooltipCommon from "@/components/common/TooltipCommon";
import Image from 'next/image';
import { formatNumberShort, formatPercent } from '@/lib/format';
import { useRouter } from 'next/navigation';
import { useTopGrowthStocks } from '@/hooks/useStocks';

const mostTalkedProjects7d = [
	{ rank: 1, symbol: 'AAPL', name: 'Apple Inc.', mentions: 9300, logoid: 'apple' },
	{ rank: 2, symbol: 'META', name: 'Meta Platforms, Inc.', mentions: 7200, logoid: 'meta-platforms' },
	{ rank: 3, symbol: 'GOOG', name: 'Alphabet Inc.', mentions: 4100, logoid: 'alphabet' },
	{ rank: 4, symbol: 'MSFT', name: 'Microsoft Corporation', mentions: 2000, logoid: 'microsoft' },
	{ rank: 5, symbol: 'LLY', name: 'Eli Lilly and Company', mentions: 900, logoid: 'eli-lilly' },
]

const OverviewCard = ({ title, tooltip, isLoading, data }) => {
	const router = useRouter();
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
							onClick={() => router.push(`/stocks/${item.name}`)}
						>
							<div className="flex items-center gap-3 font-noto">
								<span className="text-xs font-medium w-4">{index + 1}</span>
								<div className="w-8 h-8 flex items-center justify-center text-sm">
									<Image src={`https://s3-symbol-logo.tradingview.com/${item?.logoid}.svg` || '/images/icon-section-6_2.png'} alt="Symbol" width={64} height={64} className="rounded-full" />
								</div>
								<span className="text-sm font-medium">{item?.name}</span>
							</div>
							<div className={`text-sm`}>
								{item?.growthRate7d && <span className='font-medium'>{formatPercent(item?.growthRate7d)}</span>}
								{item?.mentions && (
									<p className='flex items-center gap-1 text-[#00B552]'>
										<span className='font-medium'>{formatNumberShort(item?.mentions)}</span>
										<span>mentions</span>
									</p>
								)}
							</div>
						</div>
					))
				)}
			</div>
		</div>
	)
}
const OverviewStatistics = () => {
	const { data: topGrowthStocksData, isLoading: isGettingTopGrowthStocks, } = useTopGrowthStocks();

	const topGrowthStocks7d = topGrowthStocksData?.data?.top_growth_stocks_7d || [];
	return (
		<div>
			<div className="flex items-center gap-2 dark:text-[#FFFFFF] mb-6">
				<h3 className="text-3xl font-medium font-space">Overview</h3>
				<TooltipCommon content="A live leaderboard that ranks crypto projects based on their overall community health score. It helps you quickly identify which projects have strong, active, and authentic communities." />
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[#1E1B39]">
				{/* Top Growth Commodities */}
				<OverviewCard data={topGrowthStocks7d} title="Top Growth Stocks (Growth Rate - 7d)" tooltip="The list of stocks with the highest price growth rate over the past 7 days, calculated based on percentage change." isLoading={isGettingTopGrowthStocks} />

				{/* Most Talked About Projects */}
				<OverviewCard data={mostTalkedProjects7d} title="Most Talked About Project (7D)" tooltip="Highlights the most mentioned projects across major platforms during the last 7 days. High mention volume often indicates rising interest and trending discussions." isLoading={false} />

				{/* Summary Stats */}
				<div className="flex gap-4 flex-col">
					<StatCard
						title="Number of Tracked Stocks"
						tooltip="The total number of crypto projects being monitored for community signals and on-chain metrics. Only projects with enough consistent data are included."
						value={704}
						change={{ direction: 'up', absolute: 14, percentage: 2.8 }}
						isLoading={false}
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