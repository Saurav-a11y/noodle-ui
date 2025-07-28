'use client'
import { useMemo, useState } from "react";
import _loweCase from 'lodash/lowerCase';
import EnergyCommoditiesOverview from "./EnergyCommoditiesOverview";
import MetalsCommoditiesOverview from "./MetalsCommoditiesOverview";
import AgriculturalCommoditiesOverview from "./AgriculturalCommoditiesOverview";
import IndustrialCommoditiesOverview from "./IndustrialCommoditiesOverview";
import { useCommoditiesHealthRanks } from "../hooks";

const tabList = ["All", "Energy", "Metals", "Agricultural", "Industrial",
	// "LiveStock", "Index", "Electricity"
];

const CommoditiesList = () => {
	const [activeTab, setActiveTab] = useState("All");

	const { data: commoditiesHealthRanksData, isLoading: isGettingCommoditiesHealthRanks, } = useCommoditiesHealthRanks({
		limit: 10,
		page: 1,
		search: "",
		groupFilter: activeTab === 'All' ? '' : _loweCase(activeTab),
	});

	const renderContent = useMemo(() => {
		switch (activeTab) {
			case "Energy":
				return <EnergyCommoditiesOverview data={commoditiesHealthRanksData?.data?.energy} isLoading={isGettingCommoditiesHealthRanks} />;
			case "Metals":
				return <MetalsCommoditiesOverview data={commoditiesHealthRanksData?.data?.metals} isLoading={isGettingCommoditiesHealthRanks} />;
			case "Agricultural":
				return <AgriculturalCommoditiesOverview data={commoditiesHealthRanksData?.data?.agricultural} isLoading={isGettingCommoditiesHealthRanks} />;
			case "Industrial":
				return <IndustrialCommoditiesOverview data={commoditiesHealthRanksData?.data?.industrial} isLoading={isGettingCommoditiesHealthRanks} />;
			default:
				return (
					<>
						<EnergyCommoditiesOverview data={commoditiesHealthRanksData?.data?.energy} isLoading={isGettingCommoditiesHealthRanks} />
						<MetalsCommoditiesOverview data={commoditiesHealthRanksData?.data?.metals} isLoading={isGettingCommoditiesHealthRanks} />
						<AgriculturalCommoditiesOverview data={commoditiesHealthRanksData?.data?.agricultural} isLoading={isGettingCommoditiesHealthRanks} />
						<IndustrialCommoditiesOverview data={commoditiesHealthRanksData?.data?.industrial} isLoading={isGettingCommoditiesHealthRanks} />
					</>
				);
		}
	}, [activeTab, isGettingCommoditiesHealthRanks, commoditiesHealthRanksData]);

	return (
		<>
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
		</>
	)
}

export default CommoditiesList;