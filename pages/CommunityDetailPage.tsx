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

const CommunityDetailPage = () => {
	const [isChatVisible, setChatVisible] = useState(true);
	const layoutFrameRef = useRef<number | null>(null);
	const leftPanelSizeRef = useRef(0);
	const [isContentCentered, setContentCentered] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

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
		let timeoutId: NodeJS.Timeout;
		if (layoutFrameRef.current === null) {
			// Initial mount, set immediately
			setContentCentered(leftPanelSizeRef.current === 0);
		} else {
			timeoutId = setTimeout(() => {
				setContentCentered(leftPanelSizeRef.current === 0);
			}, 100);
		}
		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [leftPanelSizeRef.current]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setChatVisible(window.innerWidth >= 768); // Ẩn nếu < md (mobile)
		}
	}, []);

	return (
		<div className="h-screen">
			<ResizablePanelGroup
				direction="horizontal"
				className="min-h-[calc(100vh-80px)]"
				onLayout={(sizes) => {
					if (layoutFrameRef.current) {
						cancelAnimationFrame(layoutFrameRef.current);
					}
					layoutFrameRef.current = requestAnimationFrame(() => {
						const [leftSize] = sizes;
						leftPanelSizeRef.current = leftSize;
						setChatVisible(leftSize > 0); // Hiển thị lại nếu user kéo ra
						setContentCentered(leftSize === 0);
					});
				}}
			>
				{/* Left Panel - AI Chat */}
				<ResizablePanel
					id="left"
					key={isMobile && isChatVisible ? 'left-full' : 'left-default'}
					defaultSize={isMobile && isChatVisible ? 100 : isChatVisible ? 25 : 0}
					collapsedSize={0}
					minSize={0}
					maxSize={isMobile ? 100 : 40}
					collapsible
				>
					<div className="h-screen p-4 border-r border-gray-200 bg-white">

						{isChatVisible && (
							<div className="h-full">
								<AICommunityAnalyst handleCloseChat={() => setChatVisible(false)} />
							</div>
						)}
					</div>
				</ResizablePanel>

				{/* Resizable Handle */}
				<ResizableHandle withHandle className="w-3 cursor-col-resize transition" />

				{/* Right Panel - Dashboard */}
				<ResizablePanel
					id="right"
					key={isChatVisible ? 'right-visible' : 'right-full'}
					defaultSize={isChatVisible ? 75 : 100}
					minSize={60}
				>
					<div className="h-full overflow-auto relative bg-[#F9F9F9]">
						<Header />
						<div className="absolute top-0 right-0">
							<Image src={bgDetailPage} alt="Background detail page" />
						</div>
						<div className="relative bg-transparent md:mt-10">
							<div className={`${isContentCentered ? 'container' : ''} mx-auto px-6 py-8 space-y-4 transition-all duration-300`}>
								{/* Project Header */}
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
											😊
										</div>
										<div className="text-[#4B4A4A]">
											<h1 className="text-xl font-semibold font-noto">BONK Community</h1>
											<div className="flex items-center gap-2 text-sm text-gray-600">
												<span className="opacity-50 text-xs font-medium font-noto">$BONK</span>
												<span>•</span>
												<span className="text-xs font-medium font-noto">$0.1703</span>
												<span>•</span>
												<span className="text-xs font-medium text-red-500 font-noto">▼ 5.54%</span>
											</div>
										</div>
									</div>
									<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1px] rounded-lg">
										<button className="flex items-center gap-2 bg-white px-4.5 py-2.5 rounded-lg font-medium text-sm cursor-pointer text-[#494949] font-noto">
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