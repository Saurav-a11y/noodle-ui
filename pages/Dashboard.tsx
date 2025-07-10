import CommunityHealthRankings from "@/features/dashboard/components/CommunityHealthRankings";
import TopProjectsStats from "@/features/dashboard/components/TopProjectsStats";
import Header from "@/components/Header";
import Image from "next/image";
import bgDetailPage from "@/images/bg-detail-page.png";

const Dashboard = () => {
	return (
		<div className="h-screen relative bg-[#F9F9F9] dark:bg-[#0B0B0B] overflow-auto">
			<Header />
			<div className="absolute top-0 w-full flex justify-center">
				<Image src={bgDetailPage} alt="Background detail page" width={1080} height={1080} />
			</div>
			<div className="container mx-auto px-6 mt-10 md:mt-20 relative bg-transparent space-y-14 mb-10">
				<TopProjectsStats />
				<CommunityHealthRankings />
			</div>
		</div>
	);
}

export default Dashboard;