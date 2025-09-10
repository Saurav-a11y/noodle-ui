import TooltipCommon from "@/components/common/TooltipCommon"
import AuthenticEngagementIcon from "@/icons/AuthenticEngagementIcon"
import CommunityGrowthIcon from "@/icons/CommunityGrowthIcon"
import RecentActivityDropIcon from "@/icons/RecentActivityDropIcon"

const CommunityInsightsPanel = ({ stockOverview, isFetching }) => {
	return (
		<div className="text-[#1E1B39">
			<div className="bg-white rounded-xl p-4 mb-4 dark:bg-[#1A1A1A]">
				<div className="mb-1.5 flex items-center gap-2 dark:text-[#FFF]">
					<p className="text-sm font-reddit font-medium">Community Health Score</p>
					<TooltipCommon content="A score from 0 to 100 that represents the overall health of a project’s community. It’s calculated using growth, engagement, authenticity, and activity consistency." />
				</div>
				{isFetching ? (
					<div className="flex items-center gap-2">
						<div className="h-9 w-10 bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
						<div className="h-4 w-32 bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
					</div>
				) : (
					<div className="flex items-center gap-2">
						<p className="text-3xl font-semibold font-noto dark:text-[#FFF]">{stockOverview?.health_score?.value}</p>
						{stockOverview?.health_score?.change !== undefined && (
							<p
								className={`text-xs font-medium font-noto flex items-center gap-2 ${stockOverview?.health_score?.change > 0 ? 'text-[#00B552]' : 'text-[#FF0000]'
									}`}
							>
								<span>
									{stockOverview?.health_score?.change > 0 ? "▲" : "▼"}
								</span>
								<span>{stockOverview?.health_score?.change_description}</span>
							</p>
						)}
					</div>
				)}
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				<div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
					<AuthenticEngagementIcon />
					<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
						<p className="text-xs font-reddit">Authentic Engagement</p>
						<TooltipCommon content="Measures real, organic interactions from human users. It excludes bots, spam, and artificial behavior to reflect genuine community activity." />
					</div>
					{isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <div className="text-sm font-medium font-noto flex items-center gap-1" style={{ color: stockOverview?.health_metrics?.authentic_engagement?.color }}>{stockOverview?.health_metrics?.authentic_engagement?.value}</div>}
				</div>
				<div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
					<CommunityGrowthIcon />
					<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
						<p className="text-xs font-reddit">Community Growth</p>
						<TooltipCommon content="The rate at which the project’s community is growing week-over-week. Tracks new followers, members, and visibility across platforms." />
					</div>
					{isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <div className="text-sm font-medium font-noto flex items-center gap-1 dark:text-white">{stockOverview?.health_metrics?.community_growth}</div>}
				</div>
				<div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
					<RecentActivityDropIcon />
					<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
						<p className="text-xs font-reddit">Recent Activity Drop</p>
						<TooltipCommon content="Detects a sharp decrease in user engagement or community actions. May signal declining interest or short-term inactivity." />
					</div>
					{isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <div className="dark:text-white text-sm font-medium font-noto flex items-center gap-1">{stockOverview?.health_metrics?.recent_activity_drop}</div>}
				</div>
			</div>
		</div>
	)
}

export default CommunityInsightsPanel