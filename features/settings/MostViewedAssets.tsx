import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

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
	const [activeTab, setActiveTab] = useState("All Assets");

	const tabs = ["All Assets", "Crypto", "Stocks", "Commodities"];

	const assets: Asset[] = [
		{
			activity: "12 views",
			classify: "Crypto",
			asset: {
				name: "Bitcoin",
				symbol: "BTC",
				icon: "₿",
				bgColor: "bg-orange-500"
			}
		},
		{
			activity: "8 views",
			classify: "Stocks",
			asset: {
				name: "Tesla",
				symbol: "TSLA",
				icon: "T",
				bgColor: "bg-red-500"
			}
		},
		{
			activity: "6 views",
			classify: "Crypto",
			asset: {
				name: "Ethereum",
				symbol: "ETH",
				icon: "Ξ",
				bgColor: "bg-gray-800"
			}
		},
		{
			activity: "+3.21% price change",
			classify: "Stocks",
			asset: {
				name: "Tesla",
				symbol: "TSLA",
				icon: "T",
				bgColor: "bg-red-500"
			}
		},
		{
			activity: "-4.95% 30d",
			classify: "Crypto",
			asset: {
				name: "Ethereum",
				symbol: "ETH",
				icon: "Ξ",
				bgColor: "bg-gray-800"
			}
		},
		{
			activity: "+4.13% week",
			classify: "Crypto",
			asset: {
				name: "Solana",
				symbol: "SOL",
				icon: "◎",
				bgColor: "bg-purple-600"
			}
		},
		{
			activity: "+0.35% day",
			classify: "Commodities",
			asset: {
				name: "Gold",
				symbol: "XAU",
				icon: "⚜",
				bgColor: "bg-yellow-500"
			}
		},
		{
			activity: "-4.83% day",
			classify: "Commodities",
			asset: {
				name: "Natural Gas",
				symbol: "ETH",
				icon: "🔥",
				bgColor: "bg-blue-500"
			}
		},
		{
			activity: "Highest Market Cap",
			classify: "Stocks",
			asset: {
				name: "Apple Inc.",
				symbol: "",
				icon: "🍎",
				bgColor: "bg-gray-900"
			}
		},
		{
			activity: "EPS Growth ↑",
			classify: "Stocks",
			asset: {
				name: "Eli Lilly",
				symbol: "LLY",
				icon: "E",
				bgColor: "bg-red-600"
			}
		}
	];

	return (
		<div className="bg-white dark:bg-black rounded-[20px] p-5 text-[#2F2F2F]">
			<p className="font-medium font-space mb-2 dark:text-white">Most Viewed Assets (30d)</p>
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
					<div className="grid grid-cols-3 gap-4 text-sm pb-2 opacity-50 dark:text-white">
						<div>Activity</div>
						<div>Classify</div>
						<div>Asset</div>
					</div>

					{/* Asset Rows */}
					<div className="space-y-4">
						{assets.map((asset, index) => (
							<div key={index} className="grid grid-cols-3 gap-4 items-center dark:text-white">
								<div className="text-sm">{asset.activity}</div>
								<div>
									<Badge variant="secondary" className="text-xs">
										{asset.classify}
									</Badge>
								</div>
								<div className="flex items-center gap-3">
									<div className={`w-8 h-8 rounded-full ${asset.asset.bgColor} flex items-center justify-center text-white font-bold text-sm`}>
										{asset.asset.icon}
									</div>
									<div>
										<div className="font-medium text-sm">{asset.asset.name}</div>
										{asset.asset.symbol && (
											<div className="text-xs text-muted-foreground">{asset.asset.symbol}</div>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Pagination */}
				<div className="flex justify-center mt-6">
					<div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-white">
						<span>Show 1 - 10 of 400</span>
						<div className="flex gap-1 ml-4">
							<button className="w-6 h-6 rounded bg-primary text-primary-foreground text-xs">1</button>
							<button className="w-6 h-6 rounded text-xs hover:bg-muted">2</button>
							<button className="w-6 h-6 rounded text-xs hover:bg-muted">3</button>
							<button className="w-6 h-6 rounded text-xs hover:bg-muted">4</button>
						</div>
					</div>
				</div>
			</div>
		</div >
	);
};

export default MostViewedAssets;