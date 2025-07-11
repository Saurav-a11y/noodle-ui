'use client';
import { useState, useEffect } from "react";
import ActivityTimeline from "@/features/community/components/ActivityTimeline";
import AICommunityAnalyst from "@/features/community/components/AICommunityAnalyst";
import CommunityMetrics from "@/features/community/components/CommunityMetrics";
import LiveActivity from "@/features/community/components/LiveActivity";
import ProjectInfo from "@/features/community/components/ProjectInfo";
import SocialChart from "@/features/community/components/SocialChart";
import Header from "@/components/Header";
import HeartIcon from "@/icons/HeartIcon";
import Image from "next/image";
import bonk from '../images/tokens/bonk.png'
import NoodlesMiniLogo from "@/icons/NoodlesMiniLogo";

const CommunityDetailPage = () => {
	const [isChatVisible, setChatVisible] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [chatWidth, setChatWidth] = useState(26); // phần trăm

	const handleCloseChat = () => {
		setChatVisible(false);
	};

	// Resize handler for chat panel
	const handleMouseDown = () => {
		let startX: number;
		window.addEventListener("mousedown", (e: MouseEvent) => {
			startX = e.clientX;
		}, { once: true });
		const screenWidth = window.innerWidth;

		const onMouseMove = (e: MouseEvent) => {
			const delta = e.clientX - startX;
			const percent = ((delta + (screenWidth * chatWidth) / 100) / screenWidth) * 100;
			const clamped = Math.min(40, Math.max(26, percent)); // giới hạn từ 20% - 50%
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
		<div className="h-screen flex">
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

			{!isMobile && (
				<>
					<div
						className="h-screen border-r border-gray-200 bg-white dark:bg-[#0B0B0B] flex-shrink-0 transition-all duration-300 overflow-hidden"
						style={{ flexBasis: isChatVisible ? `${chatWidth}%` : '0%' }}
					>
						{isChatVisible && (
							<div className="h-full p-4">
								<AICommunityAnalyst handleCloseChat={handleCloseChat} />
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

			<div className="h-full w-full overflow-auto relative bg-[#F9F9F9] dark:bg-[#0B0B0B]">
				<Header />
				<div className="absolute top-0 right-0">
					<Image src="/images/bg-detail-page.png" alt="Background detail page" />
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
								<button className="flex items-center gap-2 bg-white dark:bg-black px-4.5 py-2.5 rounded-lg font-medium text-sm cursor-pointer text-[#494949] dark:text-[#FFF] font-noto hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] transition-colors duration-200">
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
		</div>
	);
};

export default CommunityDetailPage;