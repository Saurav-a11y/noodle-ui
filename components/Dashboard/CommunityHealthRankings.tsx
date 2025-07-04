import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table";
import QuestionIcon from "@/icons/QuestionIcon";
import SmallGradientChart from "./SmallGradientChart";
import ArrowUp from "@/icons/ArrowUp";
import ArrowDown from "@/icons/ArrowDown";

const CommunityHealthRankings = () => {
	const router = useRouter();

	const projects: {
		rank: number;
		name: string;
		symbol: string;
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
				symbol: "₿",
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
				symbol: "⟠",
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
				symbol: "💎",
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
				symbol: "🟡",
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
				symbol: "🐕",
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
				<div className="flex items-center gap-2">
					<h3 className="text-3xl font-medium font-space">Community Health Rankings</h3>
					<QuestionIcon />
				</div>
			</div>

			<div className="p-5 bg-white rounded-xl shadow-xl">
				{/* Filters */}
				<div className="flex gap-4 mb-6">
					<Select defaultValue="all-category">
						<SelectTrigger className="w-[150px] h-8 bg-[#F8F8F8] border-[#E4E4E4] rounded-full text-xs text-[#4B4A4A] cursor-pointer font-reddit">
							<SelectValue placeholder="All Category" />
						</SelectTrigger>
						<SelectContent className="bg-white border-none shadow-lg">
							<SelectItem
								value="all-category"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors font-reddit"
							>
								All Category
							</SelectItem>
							<SelectItem
								value="defi"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors  font-reddit"
							>
								DeFi
							</SelectItem>
							<SelectItem
								value="layer1"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors  font-reddit"
							>
								Layer 1
							</SelectItem>
						</SelectContent>
					</Select>

					<Select defaultValue="all-score">
						<SelectTrigger className="w-[150px] h-8 bg-[#F8F8F8] border-[#E4E4E4] rounded-full text-xs text-[#4B4A4A] cursor-pointer font-reddit">
							<SelectValue placeholder="All Score" />
						</SelectTrigger>
						<SelectContent className="bg-white border-none shadow-lg">
							<SelectItem
								value="all-score"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors font-reddit"
							>
								All Score
							</SelectItem>
							<SelectItem
								value="high"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors font-reddit"
							>
								High (80+)
							</SelectItem>
							<SelectItem
								value="medium"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors font-reddit"
							>
								Medium (60-79)
							</SelectItem>
						</SelectContent>
					</Select>

					<Select defaultValue="all-size">
						<SelectTrigger className="w-[150px] h-8 bg-[#F8F8F8] border-[#E4E4E4] rounded-full text-xs text-[#4B4A4A] cursor-pointer font-reddit">
							<SelectValue placeholder="All Size" />
						</SelectTrigger>
						<SelectContent className="bg-white border-none shadow-lg">
							<SelectItem
								value="all-size"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors font-reddit"
							>
								All Size
							</SelectItem>
							<SelectItem
								value="large"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors font-reddit"
							>
								Large Cap
							</SelectItem>
							<SelectItem
								value="mid"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors font-reddit"
							>
								Mid Cap
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-12 text-[#4B4A4A] border-b border-b-[#C9C9C9] font-noto">#</TableHead>
								<TableHead className="border-b border-b-[#C9C9C9]">
									<p className="text-xs text-[#4B4A4A] font-noto">Project</p>
								</TableHead>
								<TableHead className="text-center  border-b border-b-[#C9C9C9]">
									<div className="flex items-center gap-1">
										<p className="text-xs text-[#4B4A4A] font-noto">Community Health Score</p>
										<QuestionIcon />
									</div>
								</TableHead>
								<TableHead className="text-center  border-b border-b-[#C9C9C9]">
									<div className="flex items-center gap-1">
										<p className="text-xs text-[#4B4A4A] font-noto">Active Users</p>
										<QuestionIcon />
									</div>
								</TableHead>
								<TableHead className="text-center border-b border-b-[#C9C9C9]">
									<div className="flex items-center gap-1">
										<p className="text-xs text-[#4B4A4A] font-noto">Engagement Rate</p>
										<QuestionIcon />
									</div>
								</TableHead>
								<TableHead className="text-center border-b border-b-[#C9C9C9]">
									<div className="flex items-center gap-1">
										<p className="text-xs text-[#4B4A4A] font-noto">Growth Rate</p>
										<QuestionIcon />
									</div>
								</TableHead>
								<TableHead className="text-center border-b border-b-[#C9C9C9]">
									<div className="flex items-center gap-1">
										<p className="text-xs text-[#4B4A4A] font-noto">Risk Flags</p>
										<QuestionIcon />
									</div>
								</TableHead>
								<TableHead className="border-b border-b-[#C9C9C9]"><p className="text-xs text-[#4B4A4A] font-noto">Market Cap</p></TableHead>
								<TableHead className="w-20 border-b border-b-[#C9C9C9]"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{projects.map((project) => (
								<TableRow
									key={project.rank}
									className="hover:bg-[#F9F9F9] cursor-pointer transition-colors"
									onClick={() => router.push("/community-detail")}
								>
									<TableCell className="font-medium text-[#4B4A4A] text-xs border-b border-b-[#F3F3F3] font-noto">{project.rank}</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3]">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full flex items-center justify-center font-noto">
												{project.symbol}
											</div>
											<div className="text-[#4B4A4A]">
												<p className="font-medium text-sm font-noto">{project.name}</p>
												<div className="text-[10px] font-medium opacity-50 font-noto">{project.name.slice(0, 3).toUpperCase()}</div>
											</div>
										</div>
									</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] border-b border-b-[#F3F3F3] font-noto">{project.healthScore}</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] border-b border-b-[#F3F3F3] font-noto">{project.activeUsers}</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] border-b border-b-[#F3F3F3] font-noto">{project.engagementRate}</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] border-b border-b-[#F3F3F3] font-noto">
										<div className={`flex items-center font-noto ${project.growthRate.startsWith('+') ? 'text-[#00B552]' : 'text-[#FF4A4D]'}`}>
											{project.growthRate.startsWith('+') ? <ArrowUp /> : <ArrowDown />}{project.growthRate}
										</div>
									</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] border-b border-b-[#F3F3F3] font-noto">{project.riskFlags}</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3]">
										<div className="flex items-center gap-3">
											<p className="text-sm font-medium font-noto">{project.marketCap}</p>
											<p className={`flex items-center font-noto ${project.growthRate.startsWith('+') ? 'text-[#00B552]' : 'text-[#FF4A4D]'}`}>
												{project.growthRate.startsWith('+') ? <ArrowUp /> : <ArrowDown />}{project.priceChange}
											</p>
										</div>
									</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3]">
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