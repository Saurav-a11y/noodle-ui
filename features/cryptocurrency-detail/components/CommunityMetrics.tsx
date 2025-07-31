'use client'

import AuthenticEngagementIcon from "@/icons/AuthenticEngagementIcon";
import CommunityGrowthIcon from "@/icons/CommunityGrowthIcon";
import RecentActivityDropIcon from "@/icons/RecentActivityDropIcon";
import WhaleActivityIcon from "@/icons/WhaleActivityIcon";
import TooltipCommon from "../../../components/common/TooltipCommon";
import { formatNumberShort, formatPercent } from "@/lib/format";
import { useCommunityOverview } from "../hooks/useCommunityOverview";
import { useParams } from "next/navigation";

const getEngagementLabel = (score: number) => {
	if (score >= 60) {
		return {
			value: 'Verified Organic',
			color: '#00B552'
		}
	} else if (score >= 30) {
		return {
			value: 'Moderate',
			color: '#FFAB36'
		}
	} else {
		return {
			value: 'Low or Artificial',
			color: '#FF0000'
		}
	}
}

const CommunityMetrics = () => {
	const params = useParams();
	const communityId = params?.slug as string;
	const { data, isFetching } = useCommunityOverview(communityId);

	const communityHealthScore = { ...data?.data?.project?.health_score, ...data?.data?.project?.badges }
	const communityMetrics = { ...data?.data?.project?.core_metrics }
	const crossPlatformAnalytics = { ...data?.data?.project?.cross_platform_analytics }

	const healthMetrics = [
		{
			title: "Authentic Engagement",
			value: getEngagementLabel(communityHealthScore?.authentic_engagement).value,
			icon: <AuthenticEngagementIcon />,
			color: getEngagementLabel(communityHealthScore?.authentic_engagement).color,
			content: 'Measures real, organic interactions from human users. It excludes bots, spam, and artificial behavior to reflect genuine community activity.'
		},
		{
			title: "Community Growth",
			value: formatPercent(communityHealthScore?.community_growth),
			unit: 'monthly',
			icon: <CommunityGrowthIcon />,
			content: `The rate at which the project’s community is growing week-over-week. Tracks new followers, members, and visibility across platforms.`
		},
		{
			title: "Recent Activity Drop",
			value: formatPercent(communityHealthScore?.recent_activity_drop),
			unit: 'this week',
			icon: <RecentActivityDropIcon />,
			content: 'Detects a sharp decrease in user engagement or community actions. May signal declining interest or short-term inactivity.'
		},
		{
			title: "Whale Activity",
			value: communityHealthScore?.whale_activity?.name,
			icon: <WhaleActivityIcon />,
			color: communityHealthScore?.whale_activity?.color,
			content: `Monitors large token holders’ behavior, including significant buys or sells. Whale movements can influence market sentiment and community trust.`
		}
	];

	const coreMetrics = [
		{
			title: "Active Users (30d)",
			value: formatNumberShort(communityMetrics?.active_users_30d?.value),
			// change: `${communityMetrics?.active_users_30d?.change > 0 && communityMetrics?.active_users_30d?.change_percent > 0 ? "▲" : "▼"} ${communityMetrics?.active_users_30d?.change > 0 && communityMetrics?.active_users_30d?.change_percent > 0 ? "+" : ""}${formatNumberShort(communityMetrics?.active_users_30d?.change)} (${communityMetrics?.active_users_30d?.change > 0 && communityMetrics?.active_users_30d?.change_percent > 0 ? "+" : ""}${communityMetrics?.active_users_30d?.change_percent})`,
			color: communityMetrics?.active_users_30d?.change > 0 && communityMetrics?.active_users_30d?.change_percent > 0 ? '#00B552' : '#FF0000',
			content: 'The number of distinct users who interacted with the project in the past 30 days. Covers social, development, and on-chain activity.'
		},
		{
			title: "Engagement Rate (7d)",
			value: `${communityMetrics?.engagement_rate_7d?.value}${communityMetrics?.engagement_rate_7d?.unit}`,
			// change: `${communityMetrics?.engagement_rate_7d?.change_percent > 0 && communityMetrics?.engagement_rate_7d?.change_percent > 0 ? "▲" : "▼"} ${communityMetrics?.engagement_rate_7d?.change_percent > 0 && communityMetrics?.engagement_rate_7d?.change_percent > 0 ? "+" : ''}${communityMetrics?.engagement_rate_7d?.change_percent}${communityMetrics?.engagement_rate_7d?.unit}`,
			color: communityMetrics?.engagement_rate_7d?.change_percent > 0 && communityMetrics?.engagement_rate_7d?.change_percent > 0 ? '#00B552' : '#FF0000',
			content: 'The percentage of users actively participating (e.g. likes, comments, retweets) within the last 7 days. Higher rates indicate a more involved community.'
		},
		{
			title: "Growth Rate (30d)",
			value: `${communityMetrics?.growth_rate_30d?.value > 0 ? '+' : ''}${communityMetrics?.growth_rate_30d?.value}${communityMetrics?.growth_rate_30d?.unit}`,
			change: communityMetrics?.growth_rate_30d?.trend,
			color: '#00B552',
			content: 'Reflects the long-term trend of user base or engagement growth over the last 30 days. Useful for spotting sustainable momentum.'
		},
		{
			title: "Dev Commits (30d)",
			value: formatNumberShort(communityMetrics?.dev_commits_30d?.value),
			change: communityMetrics?.dev_commits_30d?.trend,
			color: '#FFAB36',
			content: 'Total code commits made to the project’s repository in the past 30 days. Indicates ongoing technical progress and developer engagement.'
		},
		{
			title: "Token Holders",
			value: formatNumberShort(communityMetrics?.token_holders?.value),
			// change: `${communityMetrics?.token_holders?.change > 0 ? '▲' : '▼'} ${communityMetrics?.token_holders?.change > 0 ? '+' : ''}${communityMetrics?.token_holders?.change} ${communityMetrics?.token_holders?.change_description}`,
			color: communityMetrics?.token_holders?.change > 0 ? '#00B552' : '#FF0000',
			content: 'Shows the number of unique wallets currently holding the project’s token. Growth in holders typically reflects trust and adoption.'
		}
	];

	const sourceMetrics = [
		{
			key: 'twitter_mentions',
			title: 'Twitter Mentions',
			content: 'Shows the number of unique wallets currently holding the project’s token. Growth in holders typically reflects trust and adoption.',
			getChange: (data) =>
				data?.change_percent === 0 || data?.change_percent == null
					? `${data.comparison}`
					: `${data.change_percent > 0 ? "▲" : "▼"} ${data.change_percent}% ${data.comparison}`,
			getColor: (data) =>
				data.change_percent === 0 ? '#FFAB36' : data.change_percent > 0 ? '#00B552' : '#FF0000',
		},
		{
			key: 'reddit_posts',
			title: 'Reddit Posts',
			content: 'Counts how many Reddit posts discussed the project in the past 24 hours. Reflects discussion volume in crypto’s most active forums.',
			getChange: (data) =>
				data?.change_percent === 0 || data?.change_percent == null
					? `${data.comparison}`
					: `${data.change_percent > 0 ? "▲" : "▼"} ${data.change_percent > 0 ? '+' : ''}${data.change_percent}% ${data.comparison}`,
			getColor: (data) =>
				data.change_percent === 0 ? '#FFAB36' : data.change_percent > 0 ? '#00B552' : '#FF0000',
		},
		{
			key: 'github_commits',
			title: 'GitHub Commits',
			content: 'Number of code commits to the main repository during the past 7 days. Indicates project development activity and transparency.',
			getChange: () => 'Same as last week',
			getColor: () => '#FFAB36',
		},
		{
			key: 'youtube_videos',
			title: 'YouTube Videos',
			content: 'Measures how many videos about the project were published in the last week. Shows how much creator interest the project is getting.',
			getChange: (data) =>
				data?.change === 0 || data?.change == null
					? `${data.change_description}`
					: `${data.change > 0 ? "▲" : "▼"} ${data.change} ${data.change_description}`,
			getColor: (data) =>
				data.change === 0 ? '#FFAB36' : data.change > 0 ? '#00B552' : '#FF0000',
		},
	];

	return (
		<div className="space-y-5 mb-8">
			{/* Community Health Score */}
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
							<p className="text-3xl font-semibold font-noto dark:text-[#FFF]">{communityHealthScore?.value}</p>
							{/* {communityHealthScore?.change !== undefined && (
								<p
									className={`text-xs font-medium font-noto flex items-center gap-2 ${communityHealthScore.change > 0 ? 'text-[#00B552]' : 'text-[#FF0000]'
										}`}
								>
									<span>
										{communityHealthScore.change > 0 ? "▲" : "▼"}
									</span>
									<span>{Math.abs(communityHealthScore.change)} {communityHealthScore?.change_description}</span>
								</p>
							)} */}
						</div>
					)}
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
					{healthMetrics.map((metric, index) => (
						<div key={index} className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
							<div>
								{typeof metric.icon === 'string' ? metric.icon : metric.icon}
							</div>
							<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
								<p className="text-xs font-reddit">{metric.title}</p>
								<TooltipCommon content={metric.content} />
							</div>
							{isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <div className="text-sm font-medium font-noto flex items-center gap-1" style={{ color: metric?.color ? metric?.color : '' }}>{metric.value}</div>}
						</div>
					))}
				</div>
			</div>

			{/* Core Community Metrics */}
			<div className="text-[#1E1B39">
				<div className="mb-4 flex items-center gap-2 dark:text-[#FFF]">
					<p className="text-sm font-noto font-meidum">Core Community Metrics</p>
					<TooltipCommon content="Key indicators that reflect the activity and engagement levels of a project’s community. These metrics help assess how active, growing, and committed the user base is over time." />
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
					{coreMetrics.map((metric, index) => (
						<div key={index} className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
							<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
								<p className="text-xs font-reddit">{metric.title}</p>
								<TooltipCommon content={metric.content} />
							</div>
							{isFetching ?
								<>
									<div className="h-7 w-1/2 bg-gray-200 dark:bg-[#333] rounded animate-pulse mb-2" />
									<div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
								</>
								: <>
									<div className="text-xl font-semibold font-noto dark:text-[#FFF] mb-2">{metric.value}</div>
									<p className="text-sm font-medium font-noto" style={{ color: metric.color }}>{metric.change}</p>
								</>
							}
						</div>
					))}
				</div>
			</div>

			{/* Cross-Platform Source Analytics */}
			<div className="text-[#1E1B39">
				<div className="mb-4 flex items-center gap-2 dark:text-[#FFF]">
					<p className="text-sm font-noto font-meidum">Cross-Platform Source Analytics</p>
					<TooltipCommon content="Aggregates data from multiple platforms including Twitter, Reddit, GitHub, and YouTube. This section gives a unified view of a project’s visibility and engagement across the web." />
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
					{sourceMetrics.map(({ key, title, content, getChange, getColor }, index) => {
						const data = crossPlatformAnalytics?.[key] || {};

						// Xác định có nên hiển thị change hay không
						const showChange = key === 'github_commits'
							? false
							: key === 'youtube_videos'
								? data?.change !== 0
								: data?.change_percent !== 0;

						return (
							<div key={index} className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
								<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
									<p className="text-xs font-reddit">{title}</p>
									<TooltipCommon content={content} />
								</div>
								{!isFetching ? (
									<>
										<p className="text-xl font-semibold font-noto dark:text-[#FFF] mb-2">
											{formatNumberShort(data?.value)}
										</p>
										<p className="text-sm font-medium font-noto" style={{ color: getColor(data) }}>
											{getChange(data)}
										</p>
									</>
								) : (
									<>
										<div className="h-7 w-1/2 bg-gray-200 dark:bg-[#333] rounded animate-pulse mb-2" />
										<div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
									</>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CommunityMetrics;