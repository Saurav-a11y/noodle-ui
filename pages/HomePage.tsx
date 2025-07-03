'use client';

import CommunityHealthRankings from "@/components/Dashboard/CommunityHealthRankings";
import TopProjectsStats from "@/components/Dashboard/TopProjectsStats";
import Header from "@/components/Header";
import Image from "next/image";
import bgDetailPage from "@/images/bg-detail-page.png";

const HomePage = () => {
	return (
		<div className="h-screen relative bg-[#F9F9F9] overflow-auto">
			<Header />
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full">
				<Image src={bgDetailPage} alt="Background detail page" />
			</div>
			<div className="container mx-auto px-6 mt-20 relative bg-transparent space-y-14 mb-10">
				<TopProjectsStats />
				<CommunityHealthRankings />
			</div>
		</div>
	);
}

export default HomePage;