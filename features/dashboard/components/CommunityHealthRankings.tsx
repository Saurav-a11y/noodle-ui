'use client'
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import ArrowUp from "@/icons/ArrowUp";
import ArrowDown from "@/icons/ArrowDown";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import doge from '@/images/tokens/doge.png'
import btc from '@/images/tokens/bitcoin.png'
import eth from '@/images/tokens/eth.png'
import tether from '@/images/tokens/tether.png'
import bnb from '@/images/tokens/bnb.png'
import TooltipCommon from "@/components/common/TooltipCommon";
import SmallGradientChart from "./SmallGradientChart";

const CommunityHealthRankings = () => {
	const router = useRouter();

	const projects: {
		rank: number;
		name: string;
		symbol: StaticImageData;
		healthScore: number;
		activeUsers: string;
		engagementRate: string;
		growthRate: string;
		riskFlags: string;
		marketCap: string;
		priceChange: string;
		chartColor: "green" | "red";
		chartData: { value: number }[];
	}[] = [
			{
				rank: 1,
				name: "Bitcoin",
				symbol: btc,
				healthScore: 97,
				activeUsers: "2M",
				engagementRate: "9%",
				growthRate: "-2%",
				riskFlags: "Low risk",
				marketCap: "$2.08T",
				priceChange: "-5.54%",
				chartColor: "red",
				chartData: [{ value: 5 }, { value: 4 }, { value: 6 }, { value: 3 }, { value: 5 }]
			},
			{
				rank: 2,
				name: "Ethereum",
				symbol: eth,
				healthScore: 94,
				activeUsers: "1.5M",
				engagementRate: "8.7%",
				growthRate: "8%",
				riskFlags: "Low risk",
				marketCap: "$303B",
				priceChange: "+6.54%",
				chartColor: "green",
				chartData: [{ value: 8 }, { value: 10 }, { value: 9 }, { value: 12 }, { value: 11 }]
			},
			{
				rank: 3,
				name: "Tether",
				symbol: tether,
				healthScore: 88,
				activeUsers: "800K",
				engagementRate: "7.5%",
				growthRate: "+3%",
				riskFlags: "Medium risk",
				marketCap: "$155B",
				priceChange: "-5.54%",
				chartColor: "red",
				chartData: [{ value: 4 }, { value: 5 }, { value: 3 }, { value: 6 }, { value: 4 }]
			},
			{
				rank: 4,
				name: "BNB",
				symbol: bnb,
				healthScore: 85,
				activeUsers: "600K",
				engagementRate: "7.2%",
				growthRate: "+5%",
				riskFlags: "Medium risk",
				marketCap: "$90B",
				priceChange: "+5.54%",
				chartColor: "red",
				chartData: [{ value: 6 }, { value: 7 }, { value: 5 }, { value: 6 }, { value: 5 }]
			},
			{
				rank: 5,
				name: "Dogecoin",
				symbol: doge,
				healthScore: 75,
				activeUsers: "400K",
				engagementRate: "7.5%",
				growthRate: "+4%",
				riskFlags: "Medium risk",
				marketCap: "$25B",
				priceChange: "+5.54%",
				chartColor: "green",
				chartData: [{ value: 7 }, { value: 9 }, { value: 8 }, { value: 10 }, { value: 9 }]
			}
		];

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-2 dark:text-[#FFFFFF]">
					<h3 className="text-3xl font-medium font-space">Community Health Rankings</h3>
					<TooltipCommon content="A live leaderboard that ranks crypto projects based on their overall community health score. It helps you quickly identify which projects have strong, active, and authentic communities." />
				</div>
			</div>

			<div className="p-5 bg-white dark:bg-[#1A1A1A] rounded-xl shadow-xl">
				{/* Filters */}
				<div className="flex gap-4 mb-6">
					<Select defaultValue="all-category">
						<SelectTrigger className="w-[150px] h-8 bg-[#F8F8F8] border-[#E4E4E4] rounded-full text-xs text-[#4B4A4A] dark:text-[#FFF] dark:opacity-50 dark:bg-[#2D2D2D] dark:border-[#4A4A4A] cursor-pointer font-reddit">
							<SelectValue placeholder="All Category" />
						</SelectTrigger>
						<SelectContent className="bg-white dark:bg-[#1A1A1A] border-none shadow-lg">
							<SelectItem
								value="all-category"
								className="hover:bg-[#F9F9F9] dark:hover:bg-[#313131] cursor-pointer transition-colors font-reddit dark:text-white"
							>
								All Category
							</SelectItem>
							<SelectItem
								value="defi"
								className="hover:bg-[#F9F9F9] dark:hover:bg-[#313131] cursor-pointer transition-colors font-reddit dark:text-white"
							>
								DeFi
							</SelectItem>
							<SelectItem
								value="layer1"
								className="hover:bg-[#F9F9F9] dark:hover:bg-[#313131] cursor-pointer transition-colors font-reddit dark:text-white"
							>
								Layer 1
							</SelectItem>
						</SelectContent>
					</Select>

					<Select defaultValue="all-score">
						<SelectTrigger className="w-[150px] h-8 bg-[#F8F8F8] border-[#E4E4E4] rounded-full text-xs text-[#4B4A4A] dark:text-[#FFF] dark:opacity-50 dark:bg-[#2D2D2D] dark:border-[#4A4A4A] cursor-pointer font-reddit">
							<SelectValue placeholder="All Score" />
						</SelectTrigger>
						<SelectContent className="bg-white dark:bg-[#1A1A1A] border-none shadow-lg">
							<SelectItem
								value="all-score"
								className="hover:bg-[#F9F9F9] dark:hover:bg-[#313131] cursor-pointer transition-colors font-reddit dark:text-white"
							>
								All Score
							</SelectItem>
							<SelectItem
								value="high"
								className="hover:bg-[#F9F9F9] dark:hover:bg-[#313131] cursor-pointer transition-colors font-reddit dark:text-white"
							>
								High (80+)
							</SelectItem>
							<SelectItem
								value="medium"
								className="hover:bg-[#F9F9F9] dark:hover:bg-[#313131] cursor-pointer transition-colors font-reddit dark:text-white"
							>
								Medium (60-79)
							</SelectItem>
						</SelectContent>
					</Select>

					<Select defaultValue="all-size">
						<SelectTrigger className="w-[150px] h-8 bg-[#F8F8F8] border-[#E4E4E4] rounded-full text-xs text-[#4B4A4A] dark:text-[#FFF] dark:opacity-50 dark:bg-[#2D2D2D] dark:border-[#4A4A4A] cursor-pointer font-reddit">
							<SelectValue placeholder="All Size" />
						</SelectTrigger>
						<SelectContent className="bg-white dark:bg-[#1A1A1A] border-none shadow-lg">
							<SelectItem
								value="all-size"
								className="hover:bg-[#F9F9F9] dark:hover:bg-[#313131] cursor-pointer transition-colors font-reddit dark:text-white"
							>
								All Size
							</SelectItem>
							<SelectItem
								value="large"
								className="hover:bg-[#F9F9F9] dark:hover:bg-[#313131] cursor-pointer transition-colors font-reddit dark:text-white"
							>
								Large Cap
							</SelectItem>
							<SelectItem
								value="mid"
								className="hover:bg-[#F9F9F9] dark:hover:bg-[#313131] cursor-pointer transition-colors font-reddit dark:text-white"
							>
								Mid Cap
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<Table>
						<TableHeader className="dark:bg-[#2A2A2A]">
							<TableRow>
								<TableHead className="w-12 text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto dark:rounded-tl-lg">#</TableHead>
								<TableHead className="border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
									<p className="text-xs text-[#4B4A4A] dark:text-[#FFF] font-noto">Project</p>
								</TableHead>
								<TableHead className="text-center  border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
									<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
										<p className="text-xs font-noto">Community Health Score</p>
										<TooltipCommon content="A score from 0 to 100 that represents the overall health of a project’s community. It’s calculated using growth, engagement, authenticity, and activity consistency." />
									</div>
								</TableHead>
								<TableHead className="text-center  border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
									<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
										<p className="text-xs font-noto">Active Users</p>
										<TooltipCommon content="Represents the number of unique users who interacted with the project during a specific time range. Higher numbers indicate a more active and engaged community." />
									</div>
								</TableHead>
								<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
									<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
										<p className="text-xs font-noto">Engagement Rate</p>
										<TooltipCommon content="Measures how many users are actively participating (likes, comments, shares) relative to the total audience. It reflects the quality and loyalty of community interactions." />
									</div>
								</TableHead>
								<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
									<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
										<p className="text-xs font-noto">Growth Rate</p>
										<TooltipCommon content="Shows how fast the project’s community or activity is increasing over time. A steady or rising growth rate often signals momentum or renewed interest." />
									</div>
								</TableHead>
								<TableHead className="text-center border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]">
									<div className="flex items-center gap-1 text-[#4B4A4A] dark:text-[#FFF]">
										<p className="text-xs font-noto">Risk Flags</p>
										<TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
									</div>
								</TableHead>
								<TableHead className="border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A]"><p className="text-xs text-[#4B4A4A] dark:text-[#FFF] font-noto">Market Cap</p></TableHead>
								<TableHead className="w-20 border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] dark:rounded-tr-lg"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{projects.map((project) => (
								<TableRow
									key={project.rank}
									className="hover:bg-[#F9F9F9] dark:hover:bg-[#313131] cursor-pointer transition-colors"
									onClick={() => router.push("/community-detail")}
								>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] text-xs border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{project.rank}</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full flex items-center justify-center font-noto">
												<Image src={project.symbol} alt="Symbol" />
											</div>
											<div className="text-[#4B4A4A] dark:text-[#FFF]">
												<p className="font-medium text-sm font-noto">{project.name}</p>
												<div className="text-[10px] font-medium opacity-50 font-noto">{project.name.slice(0, 3).toUpperCase()}</div>
											</div>
										</div>
									</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{project.healthScore}</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{project.activeUsers}</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{project.engagementRate}</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">
										<div className={`flex items-center font-noto ${project.growthRate.startsWith('+') ? 'text-[#00B552]' : 'text-[#FF4A4D]'}`}>
											{project.growthRate.startsWith('+') ? <ArrowUp /> : <ArrowDown />}{project.growthRate}
										</div>
									</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{project.riskFlags}</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
										<div className="flex items-center gap-3">
											<p className="text-sm font-medium font-noto text-[#4B4A4A] dark:text-[#FFF]">{project.marketCap}</p>
											<p className={`flex items-center font-noto ${project.growthRate.startsWith('+') ? 'text-[#00B552]' : 'text-[#FF4A4D]'}`}>
												{project.growthRate.startsWith('+') ? <ArrowUp /> : <ArrowDown />}{project.priceChange}
											</p>
										</div>
									</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
										<SmallGradientChart color={project.chartColor} data={project.chartData} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default CommunityHealthRankings;