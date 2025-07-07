'use client';
import { useRef, useState, useEffect } from "react";
import ActivityTimeline from "@/components/CommunityDetail/ActivityTimeline";
import AICommunityAnalyst from "@/components/CommunityDetail/AICommunityAnalyst";
import CommunityMetrics from "@/components/CommunityDetail/CommunityMetrics";
import LiveActivity from "@/components/CommunityDetail/LiveActivity";
import ProjectInfo from "@/components/CommunityDetail/ProjectInfo";
import SocialChart from "@/components/CommunityDetail/SocialChart";
import Header from "@/components/Header";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/Resizable";
import bgDetailPage from "@/images/bg-detail-page.png";
import HeartIcon from "@/icons/HeartIcon";
import Image from "next/image";
import bonk from '../images/tokens/bonk.png'
import NoodlesMiniLogo from "@/icons/NoodlesMiniLogo";

const CommunityDetailPage = () => {
	const [isChatVisible, setChatVisible] = useState(true);
	const layoutFrameRef = useRef<number | null>(null);
	const leftPanelSizeRef = useRef(0);
	const [isMobile, setIsMobile] = useState(false);
	const suppressLayoutUpdateRef = useRef(false);
	const handleCloseChat = () => {
		suppressLayoutUpdateRef.current = true;
		setChatVisible(false);
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleResize = () => {
				setIsMobile(window.innerWidth < 768);
			};
			handleResize();
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setChatVisible(window.innerWidth >= 768); // Ẩn nếu < md (mobile)
		}
	}, []);

	return (
		<div className="h-screen">
			{(!isMobile && !isChatVisible) && (
				<button
					onClick={() => setChatVisible(true)}
					className="fixed bottom-4 left-4 bg-[#84EA07] text-white rounded-full shadow-lg z-90 cursor-pointer"
				>
					<NoodlesMiniLogo size={50} />
				</button>
			)}

			{isMobile && !isChatVisible && (
				<button
					onClick={() => setChatVisible(true)}
					className="fixed bottom-4 right-4 bg-[#84EA07] text-white rounded-full shadow-lg z-50 cursor-pointer"
				>
					<NoodlesMiniLogo size={50} />
				</button>
			)}

			{isMobile && isChatVisible && (
				<div className="fixed inset-0 z-90 bg-white p-4">
					<AICommunityAnalyst handleCloseChat={handleCloseChat} />
				</div>
			)}

			<ResizablePanelGroup
				direction="horizontal"
				className="min-h-[calc(100vh-80px)]"
				onLayout={(sizes) => {
					if (layoutFrameRef.current) {
						cancelAnimationFrame(layoutFrameRef.current);
					}
					layoutFrameRef.current = requestAnimationFrame(() => {
						if (suppressLayoutUpdateRef.current) {
							suppressLayoutUpdateRef.current = false;
							return;
						}
						const [leftSize] = sizes;
						leftPanelSizeRef.current = leftSize;
						if (leftSize === 0) {
							setChatVisible(false);
						} else {
							setChatVisible(true);
						}
					});
				}}
			>
				{/* Left Panel - AI Chat */}
				{!isMobile && isChatVisible && (
					<ResizablePanel
						id="left"
						key="left-panel"
						defaultSize={25}
						collapsedSize={25}
						minSize={25}
						maxSize={40}
						collapsible
					>
						<div className="h-screen p-4 border-r border-gray-200 bg-white dark:bg-[#0B0B0B]">
							<div className="h-full">
								<AICommunityAnalyst handleCloseChat={handleCloseChat} />
							</div>
						</div>
					</ResizablePanel>
				)}

				{/* Resizable Handle */}
				{!isMobile && isChatVisible && (
					<ResizableHandle withHandle className="w-2 dark:bg-[#0B0B0B] cursor-col-resize transition" />
				)}

				{/* Right Panel - Dashboard */}
				<ResizablePanel
					id="right"
					key={isChatVisible ? 'right-visible' : 'right-full'}
					defaultSize={isChatVisible ? 75 : 100}
					minSize={60}
				>
					<div className="h-full overflow-auto relative bg-[#F9F9F9] dark:bg-[#0B0B0B]">
						<Header />
						<div className="absolute top-0 right-0">
							<Image src={bgDetailPage} alt="Background detail page" />
						</div>
						<div className="relative bg-transparent md:mt-10">
							<div className={`${!isChatVisible ? 'container' : ''} mx-auto px-6 py-8 space-y-4 transition-all duration-300`}>
								{/* Project Header */}
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl">
											<Image src={bonk} alt="Avatar" />
										</div>
										<div className="text-[#4B4A4A] dark:text-[#FFF]">
											<h1 className="text-xl font-semibold font-noto">BONK Community</h1>
											<div className="flex items-center gap-2 text-sm">
												<span className="opacity-50 dark:opacity-100 text-xs font-medium font-noto">$BONK</span>
												<span>•</span>
												<span className="opacity-50 dark:opacity-100 text-xs font-medium font-noto">$0.1703</span>
												<span>•</span>
												<span className="text-xs font-medium text-red-500 font-noto">▼ 5.54%</span>
											</div>
										</div>
									</div>
									<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1px] rounded-lg">
										<button className="flex items-center gap-2 bg-white dark:bg-[#1A1A1A] px-4.5 py-2.5 rounded-lg font-medium text-sm cursor-pointer text-[#494949] dark:text-[#FFF] font-noto hover:bg-[#F6F6F6] dark:hover:bg-[#313131] transition-colors duration-200">
											<HeartIcon />
											<span className="hidden md:block">Add to Watchlist</span>
										</button>
									</div>
								</div>
								<div className="grid grid-cols-4 gap-8">
									<div className="col-span-4 md:col-span-1 space-y-6">
										{/* Metrics Grid */}
										<CommunityMetrics />
										{/* Basic Information */}
										<ProjectInfo />
									</div>
									<div className="col-span-4 md:col-span-3 space-y-5">
										<SocialChart />
										<ActivityTimeline />
										<div className="mt-10">
											<LiveActivity />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
};

export default CommunityDetailPage;