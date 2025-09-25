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

const CommunityInsightsPanel = ({ data, isFetching }) => {
	console.log("🚀 ~ CommunityInsightsPanel ~ data:", data)

	const healthMetrics = [
		{
			title: "Authentic Engagement",
			value: getEngagementLabel(data?.authentic_engagement).value,
			icon: <AuthenticEngagementIcon />,
			color: getEngagementLabel(data?.authentic_engagement).color,
			content: 'Measures real, organic interactions from human users. It excludes bots, spam, and artificial behavior to reflect genuine community activity.'
		},
		{
			title: "Community Growth",
			value: formatPercent(data?.community_growth),
			unit: 'monthly',
			icon: <CommunityGrowthIcon />,
			content: `The rate at which the project’s community is growing week-over-week. Tracks new followers, members, and visibility across platforms.`
		},
		{
			title: "Recent Activity Drop",
			value: formatPercent(data?.recent_activity_drop),
			unit: 'this week',
			icon: <RecentActivityDropIcon />,
			content: 'Detects a sharp decrease in user engagement or community actions. May signal declining interest or short-term inactivity.'
		},
		{
			title: "Whale Activity",
			value: data?.whale_activity?.name,
			icon: <WhaleActivityIcon />,
			color: data?.whale_activity?.color,
			content: `Monitors large token holders’ behavior, including significant buys or sells. Whale movements can influence market sentiment and community trust.`
		}
	];
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
						<p className="text-3xl font-semibold font-noto dark:text-[#FFF]">{data?.value}</p>
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
						{isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <div className="text-sm font-medium font-noto flex items-center gap-1" style={{ color: metric?.color ? metric?.color : 'inherit' }}>{metric.value}</div>}
					</div>
				))}
				<div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
					<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
						<p className="text-xs font-reddit">Market cap</p>
						<TooltipCommon content="The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market. Market cap = Current price x Circulating supply" />
					</div>
					{isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> :
						<div className="font-medium font-noto flex items-center gap-1 dark:text-white">{formatCurrency(data?.marketcap)} <span className="ml-2 text-xs">{formatPercent(data?.vol_change_24h_cmc)}</span></div>}
				</div>
				<div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
					<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
						<p className="text-xs font-reddit">FDV</p>
						<TooltipCommon content="The market cap if the max supply was in circulation. Fully-diluted value (FDV) = price x max supply. If max supply is null, FDV = price x total supply. if max supply and total supply are infinite or not available, fully-diluted market cap shows - -." />
					</div>
					{isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <div className="font-medium font-noto flex items-center gap-1 dark:text-white">${formatCurrency(data?.fdv)}</div>}
				</div>
				<div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
					<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
						<p className="text-xs font-reddit">Volume (24h)</p>
						<TooltipCommon content="A measure of how much of a cryptocurrency was traded in the last 24 hours." />
					</div>
					{isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <div className="font-medium font-noto flex items-center gap-1 dark:text-white">${formatCurrency(data?.vol_24h)}</div>}
				</div>
				<div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
					<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
						<p className="text-xs font-reddit">Vol/Mkt Cap (24h)</p>
						<TooltipCommon content="Indicator of liquidity. The higher the ratio, the more liquid the cryptocurrency is, which should make it easier for it to be bought/sold on an exchange close to its value. Cryptocurrencies with a low ratio are less liquid and most likely present less stable markets." />
					</div>
					{isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <div className="font-medium font-noto flex items-center gap-1 dark:text-white">{formatPercent(data?.vol_mkt_24h)}</div>}
				</div>
				<div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
					<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
						<p className="text-xs font-reddit">Total supply</p>
						<TooltipCommon content="Total supply = Total coins created - coins that have been burned (if any) It is comparable to outstanding shares in the stock market. If the project did not submit this data nor was it verified by CoinMarketCap, total supply shows “--”." />
					</div>
					{isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <div className="font-medium font-noto flex items-center gap-1 dark:text-white">${formatCurrency(data?.totalSupply)}</div>}
				</div>
				<div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
					<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
						<p className="text-xs font-reddit">Max supply</p>
						<TooltipCommon content="The best approximation of the maximum amount of coins that will exist in the forthcoming lifespan of the cryptocurrency, minus any coins that have been verifiably burned. This is also known as the theoretical max number of coins that can be minted, minus any coins that have been verifiably burned." />
					</div>
					{isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <div className="font-medium font-noto flex items-center gap-1 dark:text-white">{data?.maxSupply > 0 ? `$${formatCurrency(data?.maxSupply)}` : '∞'}</div>}
				</div>
				<div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
					<div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
						<p className="text-xs font-reddit">Circulating supply</p>
						<TooltipCommon content="The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market." />
					</div>
					{isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <div className="font-medium font-noto flex items-center gap-1 dark:text-white">${formatCurrency(data?.circulatingSupply)}</div>}
				</div>
			</div>
		</div>
	)
}

export default CommunityInsightsPanel