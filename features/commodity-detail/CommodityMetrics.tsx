import TooltipCommon from "@/components/common/TooltipCommon";
import { useCommodityOverview } from "@/hooks/useCommodities";
import AuthenticEngagementIcon from "@/icons/AuthenticEngagementIcon";
import CommunityGrowthIcon from "@/icons/CommunityGrowthIcon";
import RecentActivityDropIcon from "@/icons/RecentActivityDropIcon";
import { useParams } from "next/navigation";

const CommodityMetrics = () => {
    const params = useParams();
    const slug = params?.slug as string;
    const { isFetching, data } = useCommodityOverview(slug);
    const commodityOverview = data?.data || {};

    return (
        <div className="space-y-5 mb-8">
            {/* Community Health Score */}
            <div className="text-[#1E1B39">
                <div className="bg-white rounded-xl p-4 mb-4 dark:bg-[#1A1A1A]">
                    <div className="mb-1.5 flex items-center gap-2 dark:text-[#FFF]">
                        <p className="text-sm font-reddit font-medium">Health Score</p>
                        <TooltipCommon content="A score from 0 to 100 that represents the overall health of a project’s community. It’s calculated using growth, engagement, authenticity, and activity consistency." />
                    </div>
                    {isFetching ? (
                        <div className="flex items-center gap-2">
                            <div className="h-9 w-10 bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
                            <div className="h-4 w-32 bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <p className="text-3xl font-semibold font-noto dark:text-[#FFF]">{commodityOverview?.project?.health_score?.value}</p>
                            {commodityOverview?.project?.health_score?.change !== undefined && (
                                <p
                                    className={`text-xs font-medium font-noto flex items-center gap-2 ${commodityOverview?.project?.health_score?.change > 0 ? 'text-[#00B552]' : 'text-[#FF0000]'
                                        }`}
                                >
                                    <span>
                                        {commodityOverview?.project?.health_score?.change > 0 ? "▲" : "▼"}
                                    </span>
                                    <span>{Math.abs(commodityOverview?.project?.health_score?.change)} {commodityOverview?.project?.health_score?.change_description}</span>
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
                        {isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <div className="text-sm font-medium font-noto flex items-center gap-1" style={{ color: commodityOverview?.project?.badges?.authentic_engagement?.color }}>{commodityOverview?.project?.badges?.authentic_engagement?.name}</div>}
                    </div>
                    <div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
                        <CommunityGrowthIcon />
                        <div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
                            <p className="text-xs font-reddit">Community Growth</p>
                            <TooltipCommon content="The rate at which the project’s community is growing week-over-week. Tracks new followers, members, and visibility across platforms." />
                        </div>
                        {isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <div className="text-sm font-medium font-noto flex items-center gap-1">{commodityOverview?.project?.community_growth?.value}{commodityOverview?.project?.community_growth?.unit} {commodityOverview?.project?.community_growth?.period}</div>}
                    </div>
                    <div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
                        <RecentActivityDropIcon />
                        <div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
                            <p className="text-xs font-reddit">Recent Activity Drop</p>
                            <TooltipCommon content="Detects a sharp decrease in user engagement or community actions. May signal declining interest or short-term inactivity." />
                        </div>
                        {isFetching ? <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <div className="text-sm font-medium font-noto flex items-center gap-1">{commodityOverview?.project?.recent_activity_drop?.value}{commodityOverview?.project?.recent_activity_drop?.unit} {commodityOverview?.project?.recent_activity_drop?.period}</div>}
                    </div>
                </div>
            </div>

            {/* Core Community Metrics */}
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
                                <div className="text-xl font-semibold font-noto dark:text-[#FFF] mb-2">{commodityOverview?.project?.core_metrics?.active_users_30d?.value}</div>
                                <p className="text-sm font-medium font-noto" style={{ color: commodityOverview?.project?.core_metrics?.active_users_30d?.trend === 'up' ? '#00B552' : '#FF0000' }}>{commodityOverview?.project?.core_metrics?.active_users_30d?.change} ({commodityOverview?.project?.core_metrics?.active_users_30d?.change_percent}%)</p>
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
                                <div className="text-xl font-semibold font-noto dark:text-[#FFF] mb-2">{commodityOverview?.project?.core_metrics?.engagement_rate_7d?.value}{commodityOverview?.project?.core_metrics?.engagement_rate_7d?.unit}</div>
                                <p className="text-sm font-medium font-noto">{commodityOverview?.project?.core_metrics?.engagement_rate_7d?.change_percent}%</p>
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
                                <div className="text-xl font-semibold font-noto dark:text-[#FFF] mb-2">{commodityOverview?.project?.core_metrics?.growth_rate_30d?.value}{commodityOverview?.project?.core_metrics?.growth_rate_30d?.unit}</div>
                                <p className="text-sm font-medium font-noto">{commodityOverview?.project?.core_metrics?.growth_rate_30d?.trend}</p>
                            </>
                        }
                    </div>
                </div>
            </div>

            {/* Cross-Platform Source Analytics */}
            <div className="text-[#1E1B39">
                <div className="mb-4 flex items-center gap-2 dark:text-[#FFF]">
                    <p className="text-sm font-noto font-meidum">Cross-Platform Source Analytics</p>
                    <TooltipCommon content="Aggregates data from multiple platforms including Twitter, Reddit, GitHub, and YouTube. This section gives a unified view of a project’s visibility and engagement across the web." />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
                        <div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
                            <p className="text-xs font-reddit">Twitter Mentions</p>
                            <TooltipCommon content="Shows the number of unique wallets currently holding the project’s token. Growth in holders typically reflects trust and adoption." />
                        </div>
                        {!isFetching ? (
                            <>
                                <p className="text-xl font-semibold font-noto dark:text-[#FFF] mb-2">
                                    {commodityOverview?.project?.cross_platform_analytics?.twitter_mentions?.value}
                                </p>
                                <p className="text-sm font-medium font-noto">
                                    {commodityOverview?.project?.cross_platform_analytics?.twitter_mentions?.change_percent}% {commodityOverview?.project?.cross_platform_analytics?.twitter_mentions?.comparison}
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="h-7 w-1/2 bg-gray-200 dark:bg-[#333] rounded animate-pulse mb-2" />
                                <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
                            </>
                        )}
                    </div>
                    <div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
                        <div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
                            <p className="text-xs font-reddit">Reddit Posts</p>
                            <TooltipCommon content="Counts how many Reddit posts discussed the project in the past 24 hours. Reflects discussion volume in crypto’s most active forums." />
                        </div>
                        {!isFetching ? (
                            <>
                                <p className="text-xl font-semibold font-noto dark:text-[#FFF] mb-2">
                                    {commodityOverview?.project?.cross_platform_analytics?.reddit_posts?.value}
                                </p>
                                <p className="text-sm font-medium font-noto">
                                    {commodityOverview?.project?.cross_platform_analytics?.reddit_posts?.change_percent}% {commodityOverview?.project?.cross_platform_analytics?.twitter_mentions?.comparison}
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="h-7 w-1/2 bg-gray-200 dark:bg-[#333] rounded animate-pulse mb-2" />
                                <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
                            </>
                        )}
                    </div>
                    <div className="bg-white rounded-xl p-4 space-y-1 dark:bg-[#1A1A1A]">
                        <div className="flex items-center gap-2 dark:text-[#FFF] mb-2">
                            <p className="text-xs font-reddit">YouTube Videos</p>
                            <TooltipCommon content="Measures how many videos about the project were published in the last week. Shows how much creator interest the project is getting." />
                        </div>
                        {!isFetching ? (
                            <>
                                <p className="text-xl font-semibold font-noto dark:text-[#FFF] mb-2">
                                    {commodityOverview?.project?.cross_platform_analytics?.youtube_videos?.value}
                                </p>
                                <p className="text-sm font-medium font-noto">
                                    {commodityOverview?.project?.cross_platform_analytics?.youtube_videos?.change} {commodityOverview?.project?.cross_platform_analytics?.youtube_videos?.change_description}
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="h-7 w-1/2 bg-gray-200 dark:bg-[#333] rounded animate-pulse mb-2" />
                                <div className="h-5 w-full bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommodityMetrics;