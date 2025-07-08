'use client'
import { useRouter } from "next/navigation";
import Image from "next/image";
import bonk from '../../images/tokens/bonk.png'
import doge from '../../images/tokens/doge.png'
import xpr from '../../images/tokens/xpr.png'
import link from '../../images/tokens/link.png'
import ic from '../../images/tokens/ic.png'
import btc from '../../images/tokens/bitcoin.png'
import sol from '../../images/tokens/solana.png'
import tether from '../../images/tokens/tether.png'
import bnb from '../../images/tokens/bnb.png'
import TooltipCommon from "../common/TooltipCommon";

const TopProjectsStats = () => {
	const router = useRouter();
	const topGainingProjects = [
		{ rank: 1, name: "BONK", symbol: bonk, growth: "14%" },
		{ rank: 2, name: "Dogecoin", symbol: doge, growth: "12%" },
		{ rank: 3, name: "XRP", symbol: xpr, growth: "8%" },
		{ rank: 4, name: "Chainlink", symbol: link, growth: "6%" },
		{ rank: 5, name: "Internet Computer", symbol: ic, growth: "2%" }
	];

	const mostTalkedProjects = [
		{ rank: 1, name: "Bitcoin", symbol: btc, mentions: "9.3K" },
		{ rank: 2, name: "Solana", symbol: sol, mentions: "7.2K" },
		{ rank: 3, name: "BONK", symbol: bonk, mentions: "4.1K" },
		{ rank: 4, name: "Tether", symbol: tether, mentions: "2K" },
		{ rank: 5, name: "BNB", symbol: bnb, mentions: "900M" }
	];

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[#1E1B39]">
			{/* Top Gaining Projects */}
			<div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-xl">
				<div className="flex items-center gap-2 dark:text-white px-5 pt-5 pb-3">
					<h3 className="font-reddit">Top Gaining Project (Growth Rate - 7d)</h3>
					<TooltipCommon content="Displays the top 5 projects with the highest growth in community activity over the past 7 days. These projects are gaining traction in terms of mentions, engagement, and visibility." />
				</div>
				<div className="text-[#4B4A4A] dark:text-white pb-3">
					{topGainingProjects.map((project) => (
						<div key={project.rank} className="flex items-center justify-between cursor-pointer px-5 py-2 hover:bg-[#F9F9F9] dark:hover:bg-[#313131] rounded-lg transition" onClick={() => router.push("/community-detail")}>
							<div className="flex items-center gap-3 font-noto">
								<span className="text-xs font-medium w-4">{project.rank}</span>
								<div className="w-8 h-8 rounded-full flex items-center justify-center text-sm">
									<Image src={project.symbol} alt="Symbol" />
								</div>
								<span className="text-sm font-medium">{project.name}</span>
							</div>
							<span className="text-sm font-medium text-[#00B552]">{project.growth}</span>
						</div>
					))}
				</div>
			</div>

			{/* Most Talked About Projects */}
			<div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-xl">
				<div className="flex items-center gap-2 dark:text-white px-5 pt-5 pb-3">
					<h3 className="font-reddit">Most Talked About Project (7D)</h3>
					<TooltipCommon content="Highlights the most mentioned projects across major platforms during the last 7 days. High mention volume often indicates rising interest and trending discussions." />
				</div>
				<div className="pb-3">
					{mostTalkedProjects.map((project) => (
						<div key={project.rank} className="flex items-center justify-between cursor-pointer dark:text-white px-5 py-2 hover:bg-[#F9F9F9] dark:hover:bg-[#313131] rounded-lg transition" onClick={() => router.push("/community-detail")}>
							<div className="flex items-center gap-3 font-noto">
								<span className="text-xs font-medium w-4">{project.rank}</span>
								<div className="w-8 h-8 rounded-full flex items-center justify-center text-sm">
									<Image src={project.symbol} alt="Symbol" />
								</div>
								<span className="text-sm font-medium">{project.name}</span>
							</div>
							<span className="text-sm font-medium text-[#00B552]"><b>{project.mentions}</b> mentions</span>
						</div>
					))}
				</div>
			</div>

			{/* Summary Stats */}
			<div className="flex gap-4 flex-col">
				<div className="p-4 bg-white dark:bg-[#1A1A1A] rounded-xl shadow-xl dark:text-white flex-1">
					<div className="flex items-center gap-2 mb-2">
						<h3 className="font-reddit">Number of Tracked Projects</h3>
						<TooltipCommon content="The total number of crypto projects being monitored for community signals and on-chain metrics. Only projects with enough consistent data are included." />
					</div>
					<div className="text-4xl font-bold font-noto">740</div>
					<div className="text-sm text-[#00B552] font-medium mt-1 font-noto">▲ +14 (+2.8%)</div>
				</div>

				<div className="p-4 bg-white dark:bg-[#1A1A1A] rounded-xl shadow-xl dark:text-white flex-1">
					<div className="flex items-center gap-2 mb-2">
						<h3 className="font-reddit">Total Active Users (7D)</h3>
						<TooltipCommon content="Total number of unique users who engaged with tracked projects in the past 7 days. Includes social interactions, token activity, and contributions." />
					</div>
					<div className="text-4xl font-bold font-noto">133M</div>
					<div className="text-sm text-[#00B552] font-medium mt-1 font-noto">▲ +214 (+12%)</div>
				</div>
			</div>
		</div>
	);
};

export default TopProjectsStats;