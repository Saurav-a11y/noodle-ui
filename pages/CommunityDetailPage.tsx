'use client';
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
	return (
		<div className="h-screen">
			<ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-80px)]">
				{/* Left Panel - AI Chat */}
				<ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
					<div className="h-screen p-4 border-r border-gray-200 bg-white">
						<AICommunityAnalyst />
					</div>
				</ResizablePanel>

				{/* Resizable Handle */}
				<ResizableHandle withHandle />

				{/* Right Panel - Dashboard */}
				<ResizablePanel defaultSize={75} minSize={60}>
					<div className="h-full overflow-auto relative bg-[#F9F9F9]">
						<Header />
						<div className="absolute top-0 right-0">
							<Image src={bgDetailPage} alt="Background detail page" />
						</div>
						<div className="relative bg-transparent mt-10">
							<div className="mx-auto px-6 py-8 space-y-4">
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
											Add to Watchlist
										</button>
									</div>
								</div>
								<div className="grid grid-cols-4 gap-8">
									<div className="col-span-1 space-y-6">
										{/* Metrics Grid */}
										<CommunityMetrics />
										{/* Basic Information */}
										<ProjectInfo />
									</div>
									<div className="col-span-3 space-y-5">
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