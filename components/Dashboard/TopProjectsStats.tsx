import { useRouter } from "next/navigation";
import QuestionIcon from "@/icons/QuestionIcon";

const TopProjectsStats = () => {
	const router = useRouter();
	const topGainingProjects = [
		{ rank: 1, name: "BONK", symbol: "😊", growth: "14%" },
		{ rank: 2, name: "Dogecoin", symbol: "🐕", growth: "12%" },
		{ rank: 3, name: "XRP", symbol: "💧", growth: "8%" },
		{ rank: 4, name: "Chainlink", symbol: "🔗", growth: "6%" },
		{ rank: 5, name: "Internet Computer", symbol: "∞", growth: "2%" }
	];

	const mostTalkedProjects = [
		{ rank: 1, name: "Bitcoin", symbol: "₿", mentions: "9.3K" },
		{ rank: 2, name: "Solana", symbol: "◉", mentions: "7.2K" },
		{ rank: 3, name: "BONK", symbol: "😊", mentions: "4.1K" },
		{ rank: 4, name: "Tether", symbol: "💎", mentions: "2K" },
		{ rank: 5, name: "BNB", symbol: "🟡", mentions: "900M" }
	];

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[#1E1B39]">
			{/* Top Gaining Projects */}
			<div className="p-5 bg-white rounded-xl shadow-xl">
				<div className="flex items-center gap-2 mb-3">
					<h3 className="font-reddit">Top Gaining Project (Growth Rate - 7d)</h3>
					<QuestionIcon />
				</div>
				<div className="space-y-3 text-[#4B4A4A]">
					{topGainingProjects.map((project) => (
						<div key={project.rank} className="flex items-center justify-between cursor-pointer" onClick={() => router.push("/community-detail")}>
							<div className="flex items-center gap-3 font-noto">
								<span className="text-xs font-medium w-4">{project.rank}</span>
								<div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm">
									{project.symbol}
								</div>
								<span className="text-sm font-medium">{project.name}</span>
							</div>
							<span className="text-sm font-medium text-[#00B552]">{project.growth}</span>
						</div>
					))}
				</div>
			</div>

			{/* Most Talked About Projects */}
			<div className="p-5 bg-white rounded-xl shadow-xl">
				<div className="flex items-center gap-2 mb-3">
					<h3 className="font-reddit">Most Talked About Project (7D)</h3>
					<QuestionIcon />
				</div>
				<div className="space-y-3">
					{mostTalkedProjects.map((project) => (
						<div key={project.rank} className="flex items-center justify-between cursor-pointer" onClick={() => router.push("/community-detail")}>
							<div className="flex items-center gap-3 font-noto">
								<span className="text-xs font-medium w-4">{project.rank}</span>
								<div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm">
									{project.symbol}
								</div>
								<span className="text-sm font-medium">{project.name}</span>
							</div>
							<span className="text-sm font-medium text-[#00B552]"><b>{project.mentions}</b> mentions</span>
						</div>
					))}
				</div>
			</div>

			{/* Summary Stats */}
			<div className="space-y-6">
				<div className="p-4 bg-white rounded-xl shadow-xl">
					<div className="flex items-center gap-2 mb-2">
						<h3 className="font-reddit">Number of Tracked Projects</h3>
						<QuestionIcon />
					</div>
					<div className="text-4xl font-bold font-noto">740</div>
					<div className="text-sm text-[#00B552] font-medium mt-1 font-noto">▲ +14 (+2.8%)</div>
				</div>

				<div className="p-4 bg-white rounded-xl shadow-xl">
					<div className="flex items-center gap-2 mb-2">
						<h3 className="font-reddit">Total Active Users (7D)</h3>
						<QuestionIcon />
					</div>
					<div className="text-4xl font-bold font-noto">133M</div>
					<div className="text-sm text-[#00B552] font-medium mt-1 font-noto">▲ +214 (+12%)</div>
				</div>
			</div>
		</div>
	);
};

export default TopProjectsStats;