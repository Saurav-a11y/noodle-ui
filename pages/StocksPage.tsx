
import MostTalkedAboutList from "@/components/common/MostTalkedAboutList"
import NumberTrackedList from "@/components/common/NumberTrackedList"
import TooltipCommon from "@/components/common/TooltipCommon"
import TopGrowthList from "@/components/common/TopGrowthList"
import TotalActiveUsersList from "@/components/common/TotalActiveUsersList"
import Header from "@/components/Header"
import BackgroundPage from "@/icons/BackgroundPage"
import ReactQueryProvider from "@/lib/react-query-provider"
import { ThemeProvider } from "@/lib/useThemkMode"
import { ToastContainer } from "react-toastify"

const StocksPage = () => {
    return (
        <ReactQueryProvider>
            <ThemeProvider>
                <ToastContainer />
                <div className="h-screen relative bg-[var(--background)] overflow-auto">
                    <Header />
                    <div className="absolute top-27 md:top-3 w-full flex justify-center">
                        <div className='container w-full'>
                            <BackgroundPage />
                        </div>
                    </div>
                    <div className="container mx-auto px-6 mt-10 md:mt-20 relative bg-transparent space-y-10 mb-10">
                        <div>
                            <div className="flex items-center gap-2 text-[var(--text)] mb-6">
                                <h3 className="text-3xl font-medium font-space">Overview</h3>
                                <TooltipCommon content="A live leaderboard that ranks crypto projects based on their overall community health score. It helps you quickly identify which projects have strong, active, and authentic communities." />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <TopGrowthList assetType="stocks" />
                                <MostTalkedAboutList assetType="stocks" />
                                <div className="flex gap-4 flex-col">
                                    <NumberTrackedList assetType="stocks" />
                                    <TotalActiveUsersList assetType="stocks" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <p className="text-3xl font-medium font-space text-[var(--text)]">Stock List</p>
                            <div className="bg-[var(--bg-card)] rounded-[20px] p-5 font-noto">

                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </ReactQueryProvider>
    )
}

export default StocksPage