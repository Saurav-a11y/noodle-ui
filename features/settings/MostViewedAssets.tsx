import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
// import { Button } from "@/components/ui/Button";
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

	// const tabs = ["All Assets"];
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
				{/* <div className="flex gap-2 mb-6">
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
				</div> */}

				{/* Assets Table */}
				<div className="space-y-4">
					{/* Headers */}
					<div className="grid grid-cols-3 gap-4 text-sm pb-2 opacity-70 text-[var(--text)]">
						<div>Activity</div>
						<div>Classify</div>
						<div>Asset</div>
					</div>

					{/* Asset Rows */}
					<div className="space-y-4">
						{isLoading && (
							<div className="space-y-4">
								{Array.from({ length: 4 }).map((_, i) => (
									<div
										key={i}
										className="grid grid-cols-3 gap-4 items-center animate-pulse"
									>
										<div className="h-4 w-24 bg-[var(--loading)] rounded" />
										<div className="h-6 w-16 bg-[var(--loading)] rounded" />
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-[var(--loading)]" />
											<div>
												<div className="h-4 w-24 bg-[var(--loading)] rounded mb-2" />
												<div className="h-3 w-16 bg-[var(--loading)] rounded" />
											</div>
										</div>
									</div>
								))}
							</div>
						)}
						{!isLoading && data?.data?.length === 0 && (
							<div className="flex flex-col items-center justify-center h-full space-y-3 mt-5">
								<div className="w-12 h-12 rounded-full bg-[var(--foreground)] flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth={1.5}
										className="w-6 h-6 text-[var(--text-chip)]"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-8.25A3.375 3.375 0 004.5 11.625V14.25m15 0A2.25 2.25 0 0117.25 16.5h-10.5A2.25 2.25 0 014.5 14.25m15 0v4.125A2.625 2.625 0 0116.875 21h-9.75A2.625 2.625 0 014.5 18.375V14.25"
										/>
									</svg>
								</div>
								<p className="text-sm font-medium text-[var(--text)]">No assets found</p>
								<p className="text-xs text-[var(--text-chip)]">Add assets to see them listed here.</p>
							</div>
						)}
						{!isLoading && (data?.data ?? []).length > 0 && (
							data?.data?.map((asset, index) => (
								<div
									key={index}
									className="grid grid-cols-3 gap-4 text-[var(--text)]"
								>
									<div className="text-sm">{asset.activity}</div>
									<span className="text-xs w-fit h-fit">
										{asset.assetType}
									</span>
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text)] font-bold text-sm bg-[var(--bg-hover)]">
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
				{(data?.data ?? []).length > 0 && (
					<div className="flex justify-center mt-6">
						<div className="flex items-center justify-between gap-2 text-xs w-full text-[var(--text)]">
							<span>
								Show <b>{(page - 1) * limit + 1}</b> -{" "}
								<b>{Math.min(page * limit, data?.metadata?.total ?? 0)}</b> of{" "}
								<b>{data?.metadata?.total ?? 0}</b>
							</span>
							<div className="flex gap-1 ml-4">
								{Array.from({
									length: Math.ceil((data?.metadata?.total ?? 0) / limit),
								}).map((_, i) => (
									<button
										key={i}
										onClick={() => setPage(i + 1)}
										className={`min-w-[34.05px] px-3 py-1 h-full rounded text-sm font-medium cursor-pointer font-reddit ${page === i + 1
											? 'transition-colors bg-gradient-to-r from-[#DDF346] to-[#84EA07] text-[var(--text)] font-medium border-transparent'
											: 'bg-[var(--bg-hover)] text-[var(--text)]'
											}`}
									>
										{i + 1}
									</button>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div >
	);
};

export default MostViewedAssets;