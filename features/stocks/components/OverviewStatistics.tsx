import ProjectList from "@/components/common/ProjectList";
import StatCard from "@/components/common/StatCard";
import TooltipCommon from "@/components/common/TooltipCommon";
import EthanolIcon from "@/icons/commodities/EthanolIcon";
import GasIcon from "@/icons/commodities/GasIcon";
import MetalIcon from "@/icons/commodities/MetalIcon";
import OilIcon from "@/icons/commodities/OilIcon";

const topGrowthStocks7d = [
    { rank: 1, symbol: 'NVDA', name: 'NVIDIA Corporation', growth_rate_percent: 14, medium_logo_url: '/images/stocks/nvidia.png' },
    { rank: 2, symbol: 'AMZN', name: 'Amazon.com, Inc.', growth_rate_percent: 12, medium_logo_url: '/images/stocks/amazon.png' },
    { rank: 3, symbol: 'AVGO', name: 'Broadcom Inc.', growth_rate_percent: 8, medium_logo_url: '/images/stocks/broadcom.png' },
    { rank: 4, symbol: 'TSLA', name: 'Tesla, Inc.', growth_rate_percent: 6, medium_logo_url: '/images/stocks/tesla.png' },
    { rank: 5, symbol: 'ORCL', name: 'Oracle Corporation', growth_rate_percent: 2, medium_logo_url: '/images/stocks/oracle.png' },
]

const mostTalkedProjects7d = [
    { rank: 1, symbol: 'AAPL', name: 'Apple Inc.', mentions: 9300, medium_logo_url: '/images/stocks/apple.png' },
    { rank: 2, symbol: 'META', name: 'Meta Platforms, Inc.', mentions: 7200, medium_logo_url: '/images/stocks/meta.png' },
    { rank: 3, symbol: 'GOOG', name: 'Alphabet Inc.', mentions: 4100, medium_logo_url: '/images/stocks/google.png' },
    { rank: 4, symbol: 'MSFT', name: 'Microsoft Corporation', mentions: 2000, medium_logo_url: '/images/stocks/microsoft.png' },
    { rank: 5, symbol: 'LLY', name: 'Eli Lilly and Company', mentions: 900, medium_logo_url: '/images/stocks/lilly.png' },
]
const OverviewStatistics = () => {
    return (
        <div>
            <div className="flex items-center gap-2 dark:text-[#FFFFFF] mb-6">
                <h3 className="text-3xl font-medium font-space">Overview</h3>
                <TooltipCommon content="A live leaderboard that ranks crypto projects based on their overall community health score. It helps you quickly identify which projects have strong, active, and authentic communities." />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[#1E1B39]">
                {/* Top Growth Commodities */}
                <ProjectList
                    title="Top Growth Companies (Growth Rate - 7 Days)"
                    tooltip="Displays the top 5 projects with the highest growth in community activity over the past 7 days. These projects are gaining traction in terms of mentions, engagement, and visibility."
                    data={topGrowthStocks7d}
                    valueKey="growth_rate_percent"
                    valueSuffix="%"
                    isLoading={false}
                />

                {/* Most Talked About Projects */}
                <ProjectList
                    title="Most Talked About Project (7D)"
                    tooltip="Highlights the most mentioned projects across major platforms during the last 7 days. High mention volume often indicates rising interest and trending discussions."
                    data={mostTalkedProjects7d}
                    valueKey="mentions"
                    valueSuffix=" mentions"
                    isLoading={false}
                />

                {/* Summary Stats */}
                <div className="flex gap-4 flex-col">
                    <StatCard
                        title="Number of Tracked Projects"
                        tooltip="The total number of crypto projects being monitored for community signals and on-chain metrics. Only projects with enough consistent data are included."
                        value={740}
                        change={{ direction: 'up', absolute: 14, percentage: 2.8 }}
                        isLoading={false}
                    />
                    <StatCard
                        title="Total Active Users (7D)"
                        tooltip="Total number of unique users who engaged with tracked projects in the past 7 days. Includes social interactions, token activity, and contributions."
                        value={133000000}
                        change={{ direction: 'up', absolute: 214, percentage: 12 }}
                        isLoading={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default OverviewStatistics;