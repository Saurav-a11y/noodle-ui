import TooltipCommon from "@/components/common/TooltipCommon"
import AuthenticEngagementIcon from "@/icons/AuthenticEngagementIcon"
import CommunityGrowthIcon from "@/icons/CommunityGrowthIcon"
import RecentActivityDropIcon from "@/icons/RecentActivityDropIcon"
import WhaleActivityIcon from "@/icons/WhaleActivityIcon"
import { formatCurrency, formatPercent } from "@/lib/format"

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

const getWhaleActivityLabel = (whaleVolumeShare: number, whaleTxShare: number) => {
	if (whaleVolumeShare > 0.7 && whaleTxShare > 0.1) {
		return {
			name: 'Whale exit detected', color: '#FF0000'
		};
	}

	if (whaleVolumeShare > 0.7 && whaleTxShare < 0.1) {
		return {
			name: 'Recent large sells', color: '#B00020'
		};
	}

	if (whaleVolumeShare > 0.4 && whaleTxShare > 0.05) {
		return {
			name: 'Accumulation detected', color: '#00B552'
		};
	}

	if (whaleVolumeShare >= 0.2 && whaleVolumeShare <= 0.7) {
		return {
			name: 'Balanced whale activity', color: '#FFAB36'
		};
	}

	return {
		name: 'No significant activity', color: '#8E8E93'
	};
}

const CommunityInsightsPanel = ({ data, isFetching }) => {
	const healthMetrics = [
		{
			title: "Authentic Engagement",
			value: getEngagementLabel(data?.authenticEngagement).value,
			icon: <AuthenticEngagementIcon />,
			color: getEngagementLabel(data?.authenticEngagement).color,
			content: 'Measures real, organic interactions from human users. It excludes bots, spam, and artificial behavior to reflect genuine community activity.'
		},
		{
			title: "Community Growth",
			value: formatPercent(data?.communityGrowth),
			unit: 'monthly',
			icon: <CommunityGrowthIcon />,
			content: `The rate at which the project’s community is growing week-over-week. Tracks new followers, members, and visibility across platforms.`
		},
		{
			title: "Recent Activity Drop",
			value: formatPercent(data?.recentActivityDrop),
			unit: 'this week',
			icon: <RecentActivityDropIcon />,
			content: 'Detects a sharp decrease in user engagement or community actions. May signal declining interest or short-term inactivity.'
		},
		{
			title: "Whale Activity",
			value: getWhaleActivityLabel(data?.whaleActivity?.whaleVolumeShare, data?.whaleActivity?.whaleTxShare).name,
			icon: <WhaleActivityIcon />,
			color: getWhaleActivityLabel(data?.whaleActivity?.whaleVolumeShare, data?.whaleActivity?.whaleTxShare).color,
			content: `Monitors large token holders’ behavior, including significant buys or sells. Whale movements can influence market sentiment and community trust.`
		}
	];
	return (
		<div className="text-[#1E1B39]">
			{/* Row 1: Community Health Score */}
			<div className="rounded-xl p-4 mb-4 bg-[var(--bg-block)] text-[var(--text)]">
				<div className="mb-1.5 flex items-center gap-2">
					<p className="text-sm font-reddit font-medium">Community Health Score</p>
					<TooltipCommon content="A score from 0 to 100 that represents the overall health of a project’s community..." />
				</div>
				{isFetching ? (
					<div className="flex items-center gap-2">
						<div className="h-9 w-10 bg-[var(--loading)] rounded animate-pulse" />
						<div className="h-4 w-32 bg-[var(--loading)] rounded animate-pulse" />
					</div>
				) : (
					<div className="flex items-center gap-2">
						<p className="text-3xl font-semibold font-noto">{data?.healthScore}</p>
					</div>
				)}
			</div>

			{/* Row 2: Community Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				{healthMetrics.map((metric, index) => (
					<div key={index} className="rounded-xl p-4 space-y-1 bg-[var(--bg-block)] text-[var(--text)]">
						<div>{metric.icon}</div>
						<div className="flex items-center gap-2 mb-2">
							<p className="text-xs font-reddit">{metric.title}</p>
							<TooltipCommon content={metric.content} />
						</div>
						{isFetching ? (
							<div className="h-5 w-full bg-[var(--loading)] rounded animate-pulse" />
						) : (
							<div className="text-sm font-medium font-noto flex items-center gap-1 dark:text-white" style={{ color: metric?.color || '' }}>
								{metric.value}
							</div>
						)}
					</div>
				))}
			</div>

			<div className="mb-1 mt-5 mb-4 flex items-center gap-2 text-[var(--text)]">
				<p className="text-sm font-reddit font-medium">Market Metrics</p>
				<TooltipCommon content="Basic market indicators like market cap, volume, and token supply details." />
			</div>
			{/* Row 3: Market Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{[
					{
						label: 'Market Cap',
						value: `${formatCurrency(data?.marketcap)}`,
						extra: data?.['24hVolChangeCmc'] ? formatPercent(data?.['24hVolChangeCmc']) : '',
						tooltip: 'The total market value of a cryptocurrency’s circulating supply...'
					},
					{
						label: 'FDV',
						value: `${formatCurrency(data?.fdv)}`,
						tooltip: 'The market cap if the max supply was in circulation...'
					},
					{
						label: 'Volume (24h)',
						value: `${formatCurrency(data?.['24hVolCmc'])}`,
						tooltip: 'A measure of how much of a cryptocurrency was traded in the last 24 hours.'
					},
					{
						label: 'Vol/Mkt Cap (24h)',
						value: formatPercent(data?.['24hVolToMarketcap']),
						tooltip: 'Indicator of liquidity...'
					},
					{
						label: 'Total Supply',
						value: `${formatCurrency(data?.totalSupply)}`,
						tooltip: 'Total coins created minus burned coins...'
					},
					{
						label: 'Max Supply',
						value: data?.maxSupply > 0 ? `${formatCurrency(data?.maxSupply)}` : '∞',
						tooltip: 'The best approximation of the maximum amount of coins that will exist...'
					},
					{
						label: 'Circulating Supply',
						value: `${formatCurrency(data?.circulatingSupply)}`,
						tooltip: 'The amount of coins that are circulating in the market...'
					}
				].map((metric, idx) => (
					<div key={idx} className="rounded-xl p-4 space-y-1 bg-[var(--bg-block)] text-[var(--text)]">
						<div className="flex items-center gap-2 mb-2">
							<p className="text-xs font-reddit">{metric.label}</p>
							<TooltipCommon content={metric.tooltip} />
						</div>
						{isFetching ? (
							<div className="h-5 w-full bg-[var(--loading)] rounded animate-pulse" />
						) : (
							<div className="font-medium font-noto flex flex-col 2xl:flex-row 2xl:items-center gap-1">
								{metric.value} {metric.extra && <span className="2xl:ml-2 text-xs">{metric.extra}</span>}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default CommunityInsightsPanel