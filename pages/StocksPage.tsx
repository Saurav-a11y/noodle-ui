'use client'
import TooltipCommon from "@/components/common/TooltipCommon"
import Header from "@/components/Header"
import OverviewStatistics from "@/features/stocks/components/OverviewStatistics"
import TopCompaniesByMarketCap from "@/features/stocks/components/TopCompaniesByMarketCap"
import BackgroundPage from "@/icons/BackgroundPage"
import ReactQueryProvider from "@/lib/react-query-provider"

const StocksPage = () => {
    return (
        <ReactQueryProvider>
            <div className="h-screen relative bg-[#F9F9F9] dark:bg-[#0B0B0B] overflow-auto">
                <Header />
                <div className="absolute top-27 md:top-3 w-full flex justify-center">
                    <div className='container w-full'>
                        <BackgroundPage />
                    </div>
                </div>
                <div className="container mx-auto px-6 mt-10 md:mt-20 relative bg-transparent space-y-14 mb-10">
                    <OverviewStatistics />
                    <div className="flex items-center gap-2 dark:text-[#FFFFFF] mb-6">
                        <h3 className="text-3xl font-medium font-space">Community Health Rankings</h3>
                        <TooltipCommon content="A live leaderboard that ranks crypto projects based on their overall community health score. It helps you quickly identify which projects have strong, active, and authentic communities." />
                    </div>
                    <TopCompaniesByMarketCap />
                </div>
            </div>
        </ReactQueryProvider>
    )
}

export default StocksPage