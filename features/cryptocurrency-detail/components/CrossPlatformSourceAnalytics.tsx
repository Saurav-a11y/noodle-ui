import TooltipCommon from "@/components/common/TooltipCommon";
import { formatNumberShort } from "@/lib/format";

const CrossPlatformSourceAnalytics = ({ data, isFetching }) => {
    const platformAnalytics = data?.platformAnalytics || {};
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
                                {formatNumberShort(platformAnalytics?.twitterMentions?.count)}
                            </p>
                            <p className="text-xs font-medium font-noto dark:text-white">
                                {platformAnalytics?.twitterMentions?.changePercent !== 0 ? `▲ ${platformAnalytics?.twitterMentions?.changePercent}% last week` : 'Same as last week'}
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
                                {formatNumberShort(platformAnalytics?.redditPosts?.count)}
                            </p>
                            <p className="text-xs font-medium font-noto dark:text-white">
                                {platformAnalytics?.redditPosts?.changePercent !== 0 ? `▲ ${platformAnalytics?.redditPosts?.changePercent}% last week` : 'Same as last week'}
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
                        <p className="text-xs font-reddit">GitHub Commits</p>
                        <TooltipCommon content="Number of code commits to the main repository during the past 7 days. Indicates project development activity and transparency." />
                    </div>
                    {!isFetching ? (
                        <>
                            <p className="text-xl font-semibold font-noto dark:text-[#FFF] mb-2">
                                {formatNumberShort(platformAnalytics?.githubCommits?.count)}
                            </p>
                            <p className="text-xs font-medium font-noto dark:text-white">
                                {platformAnalytics?.githubCommits?.changePercent !== 0 ? `▲ ${platformAnalytics?.githubCommits?.changePercent}% last week` : 'Same as last week'}
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
                                {formatNumberShort(platformAnalytics?.youtubeVideos?.count)}
                            </p>
                            <p className="text-xs font-medium font-noto dark:text-white">
                                {platformAnalytics?.youtubeVideos?.changePercent !== 0 ? `▲ ${platformAnalytics?.youtubeVideos?.changePercent}% last week` : 'Same as last week'}
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
    )
}

export default CrossPlatformSourceAnalytics;