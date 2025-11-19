import TooltipCommon from "@/components/common/TooltipCommon"
import { formatNumberShort, formatPercent } from "@/lib/format";

const CoreCommunityMetrics = ({ data, isFetching }) => {
    const coreMetrics = [
        {
            title: "Active Users (30d)",
            value: formatNumberShort(data?.activeUsers),
            content: 'The number of distinct users who interacted with the project in the past 30 days. Covers social, development, and on-chain activity.'
        },
        {
            title: "Engagement Rate (7d)",
            value: formatPercent(data?.engagementRate),
            content: 'The percentage of users actively participating (e.g. likes, comments, retweets) within the last 7 days. Higher rates indicate a more involved community.'
        },
        {
            title: "Growth Rate (30d)",
            value: formatPercent(data?.growthRate),
            content: 'Reflects the long-term trend of user base or engagement growth over the last 30 days. Useful for spotting sustainable momentum.'
        },
        {
            title: "Dev Commits (30d)",
            value: formatNumberShort(data?.dev_commits.value),
            // change: data?.dev_commits?.label,
            // color: '#FFAB36',
            content: 'Total code commits made to the project’s repository in the past 30 days. Indicates ongoing technical progress and developer engagement.'
        },
        {
            title: "Token Holders",
            value: formatNumberShort(data?.tokenHolders),
            content: 'Shows the number of unique wallets currently holding the project’s token. Growth in holders typically reflects trust and adoption.'
        }
    ];
    return (
        <div className="text-[var(--text)]">
            <div className="mb-4 flex items-center gap-2">
                <p className="text-sm font-noto font-meidum">Core Community Metrics</p>
                <TooltipCommon content="Key indicators that reflect the activity and engagement levels of a project’s community. These metrics help assess how active, growing, and committed the user base is over time." />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {coreMetrics.map((metric, index) => (
                    <div key={index} className="rounded-xl p-4 space-y-1 bg-[var(--bg-block)] text-[var(--text)]">
                        <div className="flex items-center gap-2 mb-2">
                            <p className="text-xs font-reddit">{metric.title}</p>
                            <TooltipCommon content={metric.content} />
                        </div>
                        {isFetching ?
                            <>
                                <div className="h-7 w-1/2 bg-[var(--loading)] rounded animate-pulse mb-2" />
                                <div className="h-5 w-full bg-[var(--loading)] rounded animate-pulse" />
                            </>
                            : <>
                                <div className="text-sm font-semibold font-noto">{metric.value}</div>
                            </>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CoreCommunityMetrics