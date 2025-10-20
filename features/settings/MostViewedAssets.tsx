import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useMe } from "@/hooks/useAuth";
import { useGetUserActivityLogs } from "@/hooks/useUserActivityLog";

interface Asset {
	activity: string;
	classify: string;
	asset: {
		name: string;
		symbol: string;
		icon: string;
		bgColor: string;
	};
}

const MostViewedAssets = () => {
	const limit = 10;

	const [page, setPage] = useState(1);
	const [activeTab, setActiveTab] = useState("All Assets");

	const tabs = ["All Assets"];
	const assetTypeFilter =
		activeTab === "All Assets" ? undefined : activeTab.toLowerCase();

	const { data: userData } = useMe()
	const { data, isLoading } = useGetUserActivityLogs({
		userId: userData?.data?.id,
		time: 1,
		type: "view_asset",
		assetType: assetTypeFilter,
		page,
		limit,
	}, !!userData?.data?.id);

	return (
		<div className="bg-[var(--bg-card)] rounded-[20px] p-5 text-[var(--text)]">
			<p className="font-medium font-space mb-2 text-[var(--text)]">Most Viewed Assets (30d)</p>
			<div>
				{/* Tabs */}
				<div className="flex gap-2 mb-6">
					{tabs.map((tab) => (
						<Button
							key={tab}
							variant={activeTab === tab ? "default" : "ghost"}
							size="sm"
							onClick={() => setActiveTab(tab)}
							className={`rounded-lg text-xs cursor-pointer ${activeTab === tab ? "bg-[#DDF346] text-black font-medium" : "bg-[#F8F8F8] font-normal"}`}
						>
							{tab}
						</Button>
					))}
				</div>

				{/* Assets Table */}
				<div className="space-y-4">
					{/* Headers */}
					<div className="grid grid-cols-3 gap-4 text-sm pb-2 opacity-50 text-[var(--text)]">
						<div>Activity</div>
						<div>Classify</div>
						<div>Asset</div>
					</div>

					{/* Asset Rows */}
					{/* Asset Rows */}
					<div className="space-y-4">
						{isLoading ? (
							<p className="text-xs opacity-50 text-[var(--text)]">Loading...</p>
						) : (
							data?.data?.map((asset, index) => (
								<div
									key={index}
									className="grid grid-cols-3 gap-4 items-center text-[var(--text)]"
								>
									<div className="text-sm">{asset.activity}</div>
									<div>
										<Badge variant="secondary" className="text-xs">
											{asset.assetType}
										</Badge>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gray-200">
											{asset.assetLogo ? (
												<img
													src={asset.assetLogo}
													alt={asset.assetName}
													className="w-8 h-8 rounded-full"
												/>
											) : (
												<span>{asset.assetSymbol?.slice(0, 2)}</span>
											)}
										</div>
										<div>
											<div className="font-medium text-sm">{asset.assetName}</div>
											{asset.assetSymbol && (
												<div className="text-xs text-muted-foreground">
													{asset.assetSymbol}
												</div>
											)}
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>

				{/* Pagination */}
				<div className="flex justify-center mt-6">
					<div className="flex items-center gap-2 text-sm text-[var(--text)]">
						<span>
							Show {(page - 1) * limit + 1} -{" "}
							{Math.min(page * limit, data?.metadata?.total ?? 0)} of{" "}
							{data?.metadata?.total ?? 0}
						</span>
						<div className="flex gap-1 ml-4">
							{Array.from({
								length: Math.ceil((data?.metadata?.total ?? 0) / limit),
							}).map((_, i) => (
								<button
									key={i}
									onClick={() => setPage(i + 1)}
									className={`w-6 h-6 rounded text-xs ${page === i + 1
										? "bg-primary text-primary-foreground"
										: "hover:bg-muted"
										}`}
								>
									{i + 1}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div >
	);
};

export default MostViewedAssets;