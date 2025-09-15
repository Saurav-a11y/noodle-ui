import TooltipCommon from "@/components/common/TooltipCommon"
import { formatNumberShort } from "@/lib/format"

const CoreCommunityMetrics = ({ stockOverview, isFetching }) => {
	return (
		<div className="text-[#1E1B39">
			<div className="mb-4 flex items-center gap-2 dark:text-[#FFF]">
				<p className="text-sm font-noto font-meidum">Core Community Metrics</p>
				<TooltipCommon content="Key indicators that reflect the activity and engagement levels of a project’s community. These metrics help assess how active, growing, and committed the user base is over time." />
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				<div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
					<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
						<p className="text-xs font-reddit">Active Users (30d)</p>
						<TooltipCommon content="The number of distinct users who interacted with the project in the past 30 days. Covers social, development, and on-chain activity." />
					</div>
					{isFetching ?
						<>
							<div className="h-7 w-1/2 bg-gray-200 dark:bg-[#333] rounded animate-pulse mb-2" />
							<div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
						</>
						: <>
							<div className="text-xl font-semibold font-noto dark:text-[#FFF] mb-2">{formatNumberShort(stockOverview?.core_metrics?.active_users_30d?.value)}</div>
							<p className="text-sm font-medium font-noto" style={{ color: stockOverview?.core_metrics?.active_users_30d?.trend === 'up' ? '#00B552' : '#FF0000' }}>{stockOverview?.core_metrics?.active_users_30d?.change}</p>
						</>
					}
				</div>
				<div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
					<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
						<p className="text-xs font-reddit">Engagement Rate (7d)</p>
						<TooltipCommon content="The percentage of users actively participating (e.g. likes, comments, retweets) within the last 7 days. Higher rates indicate a more involved community." />
					</div>
					{isFetching ?
						<>
							<div className="h-7 w-1/2 bg-gray-200 dark:bg-[#333] rounded animate-pulse mb-2" />
							<div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
						</>
						: <>
							<div className="text-xl font-semibold font-noto dark:text-[#FFF] mb-2">{stockOverview?.core_metrics?.engagement_rate_7d?.value}</div>
							<p className="text-sm font-medium font-noto">{stockOverview?.core_metrics?.engagement_rate_7d?.change}</p>
						</>
					}
				</div>
				<div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
					<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
						<p className="text-xs font-reddit">Growth Rate (30d)</p>
						<TooltipCommon content="Reflects the long-term trend of user base or engagement growth over the last 30 days. Useful for spotting sustainable momentum." />
					</div>
					{isFetching ?
						<>
							<div className="h-7 w-1/2 bg-gray-200 dark:bg-[#333] rounded animate-pulse mb-2" />
							<div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
						</>
						: <>
							<div className="text-xl font-semibold font-noto dark:text-[#FFF] mb-2">{stockOverview?.core_metrics?.growth_rate_30d?.value}</div>
							<p className="text-sm font-medium font-noto dark:text-white">{stockOverview?.core_metrics?.growth_rate_30d?.trend}</p>
						</>
					}
				</div>
				<div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
					<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
						<p className="text-xs font-reddit">SEC Filings Count (30d)</p>
						<TooltipCommon content="Reflects the long-term trend of user base or engagement growth over the last 30 days. Useful for spotting sustainable momentum." />
					</div>
					{isFetching ?
						<>
							<div className="h-7 w-1/2 bg-gray-200 dark:bg-[#333] rounded animate-pulse mb-2" />
							<div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
						</>
						: <>
							<div className="text-xl font-semibold font-noto dark:text-[#FFF] mb-2">{Math.floor(Math.random() * 101)}</div>
							<p className="text-yellow-500 text-sm font-medium font-noto">Consistent activity</p>
						</>
					}
				</div>
			</div>
		</div>
	)
}

export default CoreCommunityMetrics