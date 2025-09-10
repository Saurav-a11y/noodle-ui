import TooltipCommon from "@/components/common/TooltipCommon"
import { formatNumberShort } from "@/lib/format";

const CoreCommunityMetrics = ({ data, isFetching }) => {
    const coreMetrics = [
        {
            title: "Active Users (30d)",
            value: formatNumberShort(data?.active_users_30d?.value),
            // change: `${data?.active_users_30d?.change > 0 && data?.active_users_30d?.change_percent > 0 ? "▲" : "▼"} ${data?.active_users_30d?.change > 0 && data?.active_users_30d?.change_percent > 0 ? "+" : ""}${formatNumberShort(data?.active_users_30d?.change)} (${data?.active_users_30d?.change > 0 && data?.active_users_30d?.change_percent > 0 ? "+" : ""}${data?.active_users_30d?.change_percent})`,
            color: data?.active_users_30d?.change > 0 && data?.active_users_30d?.change_percent > 0 ? '#00B552' : '#FF0000',
            content: 'The number of distinct users who interacted with the project in the past 30 days. Covers social, development, and on-chain activity.'
        },
        {
            title: "Engagement Rate (7d)",
            value: `${data?.engagement_rate_7d?.value}${data?.engagement_rate_7d?.unit}`,
            // change: `${data?.engagement_rate_7d?.change_percent > 0 && data?.engagement_rate_7d?.change_percent > 0 ? "▲" : "▼"} ${data?.engagement_rate_7d?.change_percent > 0 && data?.engagement_rate_7d?.change_percent > 0 ? "+" : ''}${data?.engagement_rate_7d?.change_percent}${data?.engagement_rate_7d?.unit}`,
            color: data?.engagement_rate_7d?.change_percent > 0 && data?.engagement_rate_7d?.change_percent > 0 ? '#00B552' : '#FF0000',
            content: 'The percentage of users actively participating (e.g. likes, comments, retweets) within the last 7 days. Higher rates indicate a more involved community.'
        },
        {
            title: "Growth Rate (30d)",
            value: `${data?.growth_rate_30d?.value > 0 ? '+' : ''}${data?.growth_rate_30d?.value}${data?.growth_rate_30d?.unit}`,
            change: data?.growth_rate_30d?.trend,
            color: '#00B552',
            content: 'Reflects the long-term trend of user base or engagement growth over the last 30 days. Useful for spotting sustainable momentum.'
        },
        {
            title: "Dev Commits (30d)",
            value: formatNumberShort(data?.dev_commits_30d?.value),
            change: data?.dev_commits_30d?.trend,
            color: '#FFAB36',
            content: 'Total code commits made to the project’s repository in the past 30 days. Indicates ongoing technical progress and developer engagement.'
        },
        {
            title: "Token Holders",
            value: formatNumberShort(data?.token_holders?.value),
            // change: `${data?.token_holders?.change > 0 ? '▲' : '▼'} ${data?.token_holders?.change > 0 ? '+' : ''}${data?.token_holders?.change} ${data?.token_holders?.change_description}`,
            color: data?.token_holders?.change > 0 ? '#00B552' : '#FF0000',
            content: 'Shows the number of unique wallets currently holding the project’s token. Growth in holders typically reflects trust and adoption.'
        }
    ];
    return (
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
    )
}

export default CoreCommunityMetrics