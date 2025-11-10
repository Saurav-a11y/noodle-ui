import TooltipCommon from "@/components/common/TooltipCommon"

const CrossPlatformSourceAnalytics = ({ stockOverview, isFetching }) => {
    return (
        <div className="text-[#1E1B39">
            <div className="mb-4 flex items-center gap-2 text-[var(--text)]">
                <p className="text-sm font-noto font-meidum">Cross-Platform Source Analytics</p>
                <TooltipCommon content="Aggregates data from multiple platforms including Twitter, Reddit, GitHub, and YouTube. This section gives a unified view of a project’s visibility and engagement across the web." />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="rounded-xl p-4 space-y-1 bg-[var(--bg-block)] text-[var(--text)]">
                    <div className="flex items-center gap-2 mb-2">
                        <p className="text-xs font-reddit">Twitter Mentions</p>
                        <TooltipCommon content="Shows the number of unique wallets currently holding the project’s token. Growth in holders typically reflects trust and adoption." />
                    </div>
                    {!isFetching ? (
                        <>
                            <p className="text-xl font-semibold font-noto mb-2">
                                {stockOverview?.cross_platform_analytics?.twitter_mentions?.value}
                            </p>
                            <p className="text-sm font-medium font-noto">
                                {stockOverview?.cross_platform_analytics?.twitter_mentions?.change_percent}% {stockOverview?.cross_platform_analytics?.twitter_mentions?.comparison}
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="h-7 w-1/2 bg-[var(--loading)] rounded animate-pulse mb-2" />
                            <div className="h-5 w-full bg-[var(--loading)] rounded animate-pulse" />
                        </>
                    )}
                </div>
                <div className="rounded-xl p-4 space-y-1 bg-[var(--bg-block)] text-[var(--text)]">
                    <div className="flex items-center gap-2 mb-2">
                        <p className="text-xs font-reddit">YouTube Videos</p>
                        <TooltipCommon content="Measures how many videos about the project were published in the last week. Shows how much creator interest the project is getting." />
                    </div>
                    {!isFetching ? (
                        <>
                            <p className="text-xl font-semibold font-noto mb-2">
                                {stockOverview?.cross_platform_analytics?.youtube_videos?.value}
                            </p>
                            <p className="text-sm font-medium font-noto">
                                {stockOverview?.cross_platform_analytics?.youtube_videos?.change} {stockOverview?.cross_platform_analytics?.youtube_videos?.change_description}
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="h-7 w-1/2 bg-[var(--loading)] rounded animate-pulse mb-2" />
                            <div className="h-5 w-full bg-[var(--loading)] rounded animate-pulse" />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CrossPlatformSourceAnalytics