import AuthenticEngagementIcon from "@/icons/AuthenticEngagementIcon";
import CommunityGrowthIcon from "@/icons/CommunityGrowthIcon";
import RecentActivityDropIcon from "@/icons/RecentActivityDropIcon";
import WhaleActivityIcon from "@/icons/WhaleActivityIcon";
import TooltipCommon from "../../../components/common/TooltipCommon";

const CommunityMetrics = () => {
	const healthMetrics = [
		{
			title: "Authentic Engagement",
			value: "Verified organic",
			icon: <AuthenticEngagementIcon />,
			color: "#00B552",
			status: "positive",
			content: 'Measures real, organic interactions from human users. It excludes bots, spam, and artificial behavior to reflect genuine community activity.'
		},
		{
			title: "Community Growth",
			value: "+9% monthly",
			icon: <CommunityGrowthIcon />,
			color: "#00B552",
			status: "positive",
			content: `The rate at which the project’s community is growing week-over-week. Tracks new followers, members, and visibility across platforms.`
		},
		{
			title: "Recent Activity Drop",
			value: "-15% this week",
			icon: <RecentActivityDropIcon />,
			color: "#FF0000",
			status: "warning",
			content: 'Detects a sharp decrease in user engagement or community actions. May signal declining interest or short-term inactivity.'
		},
		{
			title: "Whale Activity",
			value: "Recent large sells",
			icon: <WhaleActivityIcon />,
			color: "#FF0000",
			status: "info",
			content: `Monitors large token holders’ behavior, including significant buys or sells. Whale movements can influence market sentiment and community trust.`
		}
	];

	const coreMetrics = [
		{
			title: "Active Users (30d)",
			value: "45,123",
			change: "+1,234 (+2.8%)",
			color: '#00B552',
			positive: true,
			content: 'The number of distinct users who interacted with the project in the past 30 days. Covers social, development, and on-chain activity.'
		},
		{
			title: "Engagement Rate (7d)",
			value: "2.8%",
			change: "-0.4%",
			color: '#FF0000',
			positive: false,
			content: 'The percentage of users actively participating (e.g. likes, comments, retweets) within the last 7 days. Higher rates indicate a more involved community.'
		},
		{
			title: "Growth Rate (30d)",
			value: "+8%",
			change: "Steady growth",
			color: '#00B552',
			positive: true,
			content: 'Reflects the long-term trend of user base or engagement growth over the last 30 days. Useful for spotting sustainable momentum.'
		},
		{
			title: "Dev Commits (30d)",
			value: "12",
			change: "Consistent activity",
			color: '#FFAB36',
			positive: true,
			content: 'Total code commits made to the project’s repository in the past 30 days. Indicates ongoing technical progress and developer engagement.'
		},
		{
			title: "Token Holders",
			value: "89,420",
			change: "+2,341 this month",
			color: '#00B552',
			positive: true,
			content: 'Shows the number of unique wallets currently holding the project’s token. Growth in holders typically reflects trust and adoption.'
		}
	];

	const sourceMetrics = [
		{
			title: "Twitter Mentions",
			value: "2.3K",
			change: "+8% vs yesterday",
			color: '#00B552',
			positive: true,
			content: 'Shows the number of unique wallets currently holding the project’s token. Growth in holders typically reflects trust and adoption.'
		},
		{
			title: "Reddit Posts",
			value: "156",
			change: "-12% vs yesterday",
			color: '#FF0000',
			positive: false,
			content: 'Counts how many Reddit posts discussed the project in the past 24 hours. Reflects discussion volume in crypto’s most active forums.'
		},
		{
			title: "GitHub Commits",
			value: "12",
			change: "Same as last week",
			color: '#FFAB36',
			positive: true,
			content: 'Number of code commits to the main repository during the past 7 days. Indicates project development activity and transparency.'
		},
		{
			title: "YouTube Videos",
			value: "12",
			change: "+3 more than last week",
			color: '#00B552',
			positive: true,
			content: 'Measures how many videos about the project were published in the last week. Shows how much creator interest the project is getting.'
		}
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
					<div className="flex items-center gap-2">
						<span className="text-3xl font-semibold font-noto dark:text-[#FFF]">78</span>
						<span className="text-red-500 text-xs font-medium font-noto">▼ 5 from last week</span>
					</div>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
					{healthMetrics.map((metric, index) => (
						<div key={index} className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
							<div>
								{typeof metric.icon === 'string' ? metric.icon : metric.icon}
							</div>
							<div className="flex items-center gap-2 dark:text-[#FFF]">
								<p className="text-xs font-reddit">{metric.title}</p>
								<TooltipCommon content={metric.content} />
							</div>
							<p className="text-sm font-medium font-noto" style={{ color: metric.color }}>{metric.value}</p>
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
							<div className="flex items-center gap-2 dark:text-[#FFF]">
								<p className="text-xs font-reddit">{metric.title}</p>
								<TooltipCommon content={metric.content} />
							</div>
							<p className="text-xl font-semibold font-noto dark:text-[#FFF]">{metric.value}</p>
							<p className="text-sm font-medium font-noto" style={{ color: metric.color }}>{metric.change}</p>
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
					{sourceMetrics.map((metric, index) => (
						<div key={index} className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
							<div className="flex items-center gap-2 dark:text-[#FFF]">
								<p className="text-xs font-reddit">{metric.title}</p>
								<TooltipCommon content={metric.content} />
							</div>
							<p className="text-xl font-semibold font-noto dark:text-[#FFF]">{metric.value}</p>
							<p className="text-sm font-medium font-noto" style={{ color: metric.color }}>{metric.change}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CommunityMetrics;