'use client';
import Header from "@/components/Header";
import SocialChart from "@/features/cryptocurrency-detail/components/SocialChart";
// import StockYieldsList from "@/features/stock-detail/StockYieldsList";
import BackgroundPage from "@/icons/BackgroundPage";
import NoodlesMiniLogo from "@/icons/NoodlesMiniLogo";
import ReactQueryProvider from "@/lib/react-query-provider";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/lib/useThemkMode";
import { AssetHeader } from "@/components/common/AssetHeader";
import AddToStockWatchlist from "@/features/stocks/AddToStockWatchlist";
import ChatWithStockAssistant from "@/features/stocks/ChatWithStockAssistant";
import StockMetrics from "@/features/stocks/StockMetrics";
import StockFounderAndTeamAnalystChart from "@/features/stocks/StockFounderAndTeamAnalystChart";
import StockCommunityContributions from "@/features/stocks/StockCommunityContributions";

const StockDetailPage = () => {
    const [isChatVisible, setChatVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [chatWidth, setChatWidth] = useState(26);

    const handleCloseChat = () => {
        setChatVisible(false);
    };

    const handleMouseDown = () => {
        let startX: number;
        window.addEventListener("mousedown", (e: MouseEvent) => {
            startX = e.clientX;
        }, { once: true });
        const screenWidth = window.innerWidth;

        const onMouseMove = (e: MouseEvent) => {
            const delta = e.clientX - startX;
            const percent = ((delta + (screenWidth * chatWidth) / 100) / screenWidth) * 100;
            const clamped = Math.min(40, Math.max(26, percent));
            setChatWidth(clamped);
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    return (
        <ReactQueryProvider>
            <ThemeProvider>
                <ToastContainer />
                <div className="h-screen flex">
                    {(!isMobile && !isChatVisible) && (
                        <button
                            onClick={() => setChatVisible(true)}
                            className="fixed bottom-4 left-4 bg-[#84EA07] text-[var(--text)] rounded-full shadow-lg z-90 cursor-pointer"
                        >
                            <NoodlesMiniLogo size={50} />
                        </button>
                    )}

                    {isMobile && !isChatVisible && (
                        <button
                            onClick={() => setChatVisible(true)}
                            className="fixed bottom-4 right-4 bg-[#84EA07] text-[var(--text)] rounded-full shadow-lg z-50 cursor-pointer"
                        >
                            <NoodlesMiniLogo size={50} />
                        </button>
                    )}

                    {isMobile && isChatVisible && (
                        <div className="fixed inset-0 z-90 bg-[var(--background)] p-4">
                            <ChatWithStockAssistant />
                        </div>
                    )}

                    {!isMobile && (
                        <>
                            <div
                                className="h-screen border-r border-gray-200 bg-[var(--bg-header)] flex-shrink-0 transition-all duration-300 overflow-hidden"
                                style={{ flexBasis: isChatVisible ? `${chatWidth}%` : '0%' }}
                            >
                                {isChatVisible && (
                                    <div className="h-full p-4">
                                        <ChatWithStockAssistant />
                                    </div>
                                )}
                            </div>
                            {isChatVisible && (
                                <div
                                    className="h-full w-2 cursor-col-resize bg-gray-300 transition-colors hover:bg-gray-400"
                                    onMouseDown={handleMouseDown}
                                />
                            )}
                        </>
                    )}

                    <div className="h-full w-full overflow-auto relative bg-[var(--background)]">
                        <Header />
                        <div className="absolute top-27 md:top-3 w-full flex justify-center">
                            <div className='container w-full'>
                                <BackgroundPage />
                            </div>
                        </div>

                        <div className="relative bg-transparent md:mt-10">
                            <div className={`${!isChatVisible ? 'container' : ''} mx-auto px-6 py-8 space-y-4 transition-all duration-300`}>
                                <div className="flex items-center justify-between">
                                    <AssetHeader />
                                    <AddToStockWatchlist />
                                </div>
                                <div className="grid grid-cols-4 gap-8">
                                    <div className="col-span-4 md:col-span-1 space-y-6">
                                        <StockMetrics />
                                    </div>
                                    <div className="col-span-4 md:col-span-3 space-y-5">
                                        <SocialChart type="stock" />
                                        {/* <StockYieldsList /> */}
                                        <StockFounderAndTeamAnalystChart />
                                        <div className="mt-10">
                                            <StockCommunityContributions />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </ReactQueryProvider >
    );
};

export default StockDetailPage;