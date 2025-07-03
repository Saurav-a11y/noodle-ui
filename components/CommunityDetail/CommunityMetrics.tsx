import QuestionIcon from "@/icons/QuestionIcon";
import AuthenticEngagementIcon from "@/icons/AuthenticEngagementIcon";
import CommunityGrowthIcon from "@/icons/CommunityGrowthIcon";
import RecentActivityDropIcon from "@/icons/RecentActivityDropIcon";
import WhaleActivityIcon from "@/icons/WhaleActivityIcon";

const CommunityMetrics = () => {
	const healthMetrics = [
		{
			title: "Authentic Engagement",
			value: "Verified organic",
			icon: <AuthenticEngagementIcon />,
			color: "#00B552",
			status: "positive"
		},
		{
			title: "Community Growth",
			value: "+9% monthly",
			icon: <CommunityGrowthIcon />,
			color: "#00B552",
			status: "positive"
		},
		{
			title: "Recent Activity Drop",
			value: "-15% this week",
			icon: <RecentActivityDropIcon />,
			color: "#FF0000",
			status: "warning"
		},
		{
			title: "Whale Activity",
			value: "Recent large sells",
			icon: <WhaleActivityIcon />,
			color: "#FF0000",
			status: "info"
		}
	];

	const coreMetrics = [
		{
			title: "Active Users (30d)",
			value: "45,123",
			change: "+1,234 (+2.8%)",
			color: '#00B552',
			positive: true
		},
		{
			title: "Engagement Rate (7d)",
			value: "2.8%",
			change: "-0.4%",
			color: '#FF0000',
			positive: false
		},
		{
			title: "Growth Rate (30d)",
			value: "+8%",
			change: "Steady growth",
			color: '#00B552',
			positive: true
		},
		{
			title: "Dev Commits (30d)",
			value: "12",
			change: "Consistent activity",
			color: '#FFAB36',
			positive: true
		},
		{
			title: "Token Holders",
			value: "89,420",
			change: "+2,341 this month",
			color: '#00B552',
			positive: true
		}
	];

	const sourceMetrics = [
		{
			title: "Twitter Mentions",
			value: "2.3K",
			change: "+8% vs yesterday",
			color: '#00B552',
			positive: true
		},
		{
			title: "Reddit Posts",
			value: "156",
			change: "-12% vs yesterday",
			color: '#FF0000',
			positive: false
		},
		{
			title: "GitHub Commits",
			value: "12",
			change: "Same as last week",
			color: '#FFAB36',
			positive: true
		},
		{
			title: "YouTube Videos",
			value: "12",
			change: "+3 more than last week",
			color: '#00B552',
			positive: true
		}
	];

	return (
		<div className="space-y-5 mb-8">
			{/* Community Health Score */}
			<div className="text-[#1E1B39">
				<div className="bg-white rounded-xl p-4 mb-4">
					<div className="mb-1.5 flex items-center gap-2">
						<p className="text-sm">Community Health Score</p>
						<QuestionIcon />
					</div>
					<div className="flex items-center gap-2">
						<span className="text-3xl font-semibold">78</span>
						<span className="text-red-500 text-xs font-medium">▼ 5 from last week</span>
					</div>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
					{healthMetrics.map((metric, index) => (
						<div key={index} className="bg-white rounded-xl p-4 space-y-1">
							<div>
								{typeof metric.icon === 'string' ? metric.icon : metric.icon}
							</div>
							<div className="flex items-center gap-2">
								<p className="text-xs">{metric.title}</p>
								<QuestionIcon />
							</div>
							<p className="text-sm font-medium" style={{ color: metric.color }}>{metric.value}</p>
						</div>
					))}
				</div>
			</div>

			{/* Core Community Metrics */}
			<div className="text-[#1E1B39">
				<div className="mb-4 flex items-center gap-2">
					<p className="text-sm">Core Community Metrics</p>
					<QuestionIcon />
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
					{coreMetrics.map((metric, index) => (
						<div key={index} className="bg-white rounded-xl p-4 space-y-1">
							<div className="flex items-center gap-2">
								<p className="text-xs">{metric.title}</p>
								<QuestionIcon />
							</div>
							<p className="text-xl font-semibold">{metric.value}</p>
							<p className="text-sm font-medium" style={{ color: metric.color }}>{metric.change}</p>
						</div>
					))}
				</div>
			</div>

			{/* Cross-Platform Source Analytics */}
			<div className="text-[#1E1B39">
				<div className="mb-4 flex items-center gap-2">
					<p className="text-sm">Core Community Metrics</p>
					<QuestionIcon />
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
					{sourceMetrics.map((metric, index) => (
						<div key={index} className="bg-white rounded-xl p-4 space-y-1">
							<div className="flex items-center gap-2">
								<p className="text-xs">{metric.title}</p>
								<QuestionIcon />
							</div>
							<p className="text-xl font-semibold">{metric.value}</p>
							<p className="text-sm font-medium" style={{ color: metric.color }}>{metric.change}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CommunityMetrics;