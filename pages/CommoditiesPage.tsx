'use client'
import TooltipCommon from "@/components/common/TooltipCommon"
import Header from "@/components/Header"
import AgriculturalCommoditiesOverview from "@/features/commodities/components/AgriculturalCommoditiesOverview"
import EnergyCommoditiesOverview from "@/features/commodities/components/EnergyCommoditiesOverview"
import IndustrialCommoditiesOverview from "@/features/commodities/components/IndustrialCommoditiesOverview"
import MetalsCommoditiesOverview from "@/features/commodities/components/MetalsCommoditiesOverview"
import OverviewStatistics from "@/features/commodities/components/OverviewStatistics"
import BackgroundPage from "@/icons/BackgroundPage"
import ReactQueryProvider from "@/lib/react-query-provider"
import { useState, useMemo } from "react"

const tabList = ["All", "Energy", "Metals", "Agricultural", "Industrial"];

const CommoditiesPage = () => {
	const [activeTab, setActiveTab] = useState("All");

	const renderContent = useMemo(() => {
		switch (activeTab) {
			case "Energy":
				return <EnergyCommoditiesOverview />;
			case "Metals":
				return <MetalsCommoditiesOverview />;
			case "Agricultural":
				return <AgriculturalCommoditiesOverview />;
			case "Industrial":
				return <IndustrialCommoditiesOverview />;
			default:
				return (
					<>
						<EnergyCommoditiesOverview />
						<MetalsCommoditiesOverview />
						<AgriculturalCommoditiesOverview />
						<IndustrialCommoditiesOverview />
					</>
				);
		}
	}, [activeTab]);

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
					<div className="flex gap-2 mb-6">
						{tabList.map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`px-4 py-1 rounded border font-reddit cursor-pointer text-sm font-medium ${activeTab === tab
									? "bg-[#7FCE00] text-white border-[#7FCE00]"
									: "bg-white dark:bg-[#1E1E1E] text-gray-700 dark:text-white border-gray-300 hover:bg-gray-100 dark:hover:bg-[#333]"
									}`}
							>
								{tab}
							</button>
						))}
					</div>
					<div className="space-y-8">
						{renderContent}
					</div>
				</div>
			</div>
		</ReactQueryProvider>
	)
}

export default CommoditiesPage