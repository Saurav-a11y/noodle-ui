import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table";
import QuestionIcon from "@/icons/QuestionIcon";
import {
	AreaChart,
	Area,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const data = [
	{ value: 5 },
	{ value: 10 },
	{ value: 8 },
	{ value: 12 },
	{ value: 9 },
	{ value: 15 },
	{ value: 11 },
];

const SmallGradientChart = ({ color = "green" }: { color?: "green" | "red" }) => {
	const gradientId = `gradient-${color}`;

	return (
		<ResponsiveContainer width={80} height={40}>
			<AreaChart data={data}>
				<defs>
					<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor={color === "green" ? "#00B552" : "#FF4A4D"} stopOpacity={0.6} />
						<stop offset="100%" stopColor={color === "green" ? "#00B552" : "#FF4A4D"} stopOpacity={0} />
					</linearGradient>
				</defs>
				<Tooltip content={() => null} />
				<Area
					type="monotone"
					dataKey="value"
					stroke={color === "green" ? "#00B552" : "#FF4A4D"}
					fill={`url(#${gradientId})`}
					strokeWidth={2}
				/>
				<XAxis hide />
				<YAxis hide />
			</AreaChart>
		</ResponsiveContainer>
	);
};

const CommunityHealthRankings = () => {
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
				chartColor: "red"
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
				chartColor: "green"
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
				chartColor: "red"
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
				chartColor: "red"
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
				chartColor: "green"
			}
		];

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-2">
					<h3 className="text-3xl font-medium">Community Health Rankings</h3>
					<QuestionIcon />
				</div>
			</div>

			<div className="p-5 bg-white rounded-xl shadow-xl">
				{/* Filters */}
				<div className="flex gap-4 mb-6">
					<Select defaultValue="all-category">
						<SelectTrigger className="w-[150px] bg-[#F8F8F8] border-[#E4E4E4] rounded-full text-xs text-[#4B4A4A] cursor-pointer">
							<SelectValue placeholder="All Category" />
						</SelectTrigger>
						<SelectContent className="bg-white border-none shadow-lg">
							<SelectItem
								value="all-category"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors"
							>
								All Category
							</SelectItem>
							<SelectItem
								value="defi"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors"
							>
								DeFi
							</SelectItem>
							<SelectItem
								value="layer1"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors"
							>
								Layer 1
							</SelectItem>
						</SelectContent>
					</Select>

					<Select defaultValue="all-score">
						<SelectTrigger className="w-[150px] bg-[#F8F8F8] border-[#E4E4E4] rounded-full text-xs text-[#4B4A4A] cursor-pointer">
							<SelectValue placeholder="All Score" />
						</SelectTrigger>
						<SelectContent className="bg-white border-none shadow-lg">
							<SelectItem
								value="all-score"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors"
							>
								All Score
							</SelectItem>
							<SelectItem
								value="high"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors"
							>
								High (80+)
							</SelectItem>
							<SelectItem
								value="medium"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors"
							>
								Medium (60-79)
							</SelectItem>
						</SelectContent>
					</Select>

					<Select defaultValue="all-size">
						<SelectTrigger className="w-[150px] bg-[#F8F8F8] border-[#E4E4E4] rounded-full text-xs text-[#4B4A4A] cursor-pointer">
							<SelectValue placeholder="All Size" />
						</SelectTrigger>
						<SelectContent className="bg-white border-none shadow-lg">
							<SelectItem
								value="all-size"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors"
							>
								All Size
							</SelectItem>
							<SelectItem
								value="large"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors"
							>
								Large Cap
							</SelectItem>
							<SelectItem
								value="mid"
								className="hover:bg-[#F9F9F9] cursor-pointer transition-colors"
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
								<TableHead className="w-12 text-[#4B4A4A] border-b border-b-[#C9C9C9]">#</TableHead>
								<TableHead className="border-b border-b-[#C9C9C9]">
									<p className="text-xs text-[#4B4A4A]">Project</p>
								</TableHead>
								<TableHead className="text-center  border-b border-b-[#C9C9C9]">
									<div className="flex items-center gap-1">
										<p className="text-xs text-[#4B4A4A]">Community Health Score</p>
										<QuestionIcon />
									</div>
								</TableHead>
								<TableHead className="text-center  border-b border-b-[#C9C9C9]">
									<div className="flex items-center gap-1">
										<p className="text-xs text-[#4B4A4A]">Active Users</p>
										<QuestionIcon />
									</div>
								</TableHead>
								<TableHead className="text-center border-b border-b-[#C9C9C9]">
									<div className="flex items-center gap-1">
										<p className="text-xs text-[#4B4A4A]">Engagement Rate</p>
										<QuestionIcon />
									</div>
								</TableHead>
								<TableHead className="text-center border-b border-b-[#C9C9C9]">
									<div className="flex items-center gap-1">
										<p className="text-xs text-[#4B4A4A]">Growth Rate</p>
										<QuestionIcon />
									</div>
								</TableHead>
								<TableHead className="text-center border-b border-b-[#C9C9C9]">
									<div className="flex items-center gap-1">
										<p className="text-xs text-[#4B4A4A]">Risk Flags</p>
										<QuestionIcon />
									</div>
								</TableHead>
								<TableHead className="border-b border-b-[#C9C9C9]"><p className="text-xs text-[#4B4A4A]">Market Cap</p></TableHead>
								<TableHead className="w-20 border-b border-b-[#C9C9C9]"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{projects.map((project) => (
								<TableRow
									key={project.rank}
									className="hover:bg-[#F9F9F9] cursor-pointer transition-colors"
								>
									<TableCell className="font-medium text-[#4B4A4A] text-xs border-b border-b-[#F3F3F3]">{project.rank}</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3]">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full flex items-center justify-center">
												{project.symbol}
											</div>
											<div className="text-[#4B4A4A]">
												<p className="font-medium text-sm">{project.name}</p>
												<div className="text-[10px] font-medium opacity-50">{project.name.slice(0, 3).toUpperCase()}</div>
											</div>
										</div>
									</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] border-b border-b-[#F3F3F3]">{project.healthScore}</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] border-b border-b-[#F3F3F3]">{project.activeUsers}</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] border-b border-b-[#F3F3F3]">{project.engagementRate}</TableCell>
									<TableCell className="font-medium text-[#4B4A4A] border-b border-b-[#F3F3F3]">
										<span className={project.growthRate.startsWith('+') ? 'text-[#00B552]' : 'text-[#FF4A4D]'}>
											{project.growthRate.startsWith('+') ? '▲' : '▼'}{project.growthRate}
										</span>
									</TableCell>
									<TableCell className="text-sm font-medium text-[#4B4A4A] border-b border-b-[#F3F3F3]">{project.riskFlags}</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3]">
										<div className="flex items-center gap-3">
											<p className="text-sm font-medium">{project.marketCap}</p>
											<p className={`text-xs ${project.priceChange.startsWith('+') ? 'text-[#00B552]' : 'text-[#FF4A4D]'}`}>
												{project.priceChange}
											</p>
										</div>
									</TableCell>
									<TableCell className="border-b border-b-[#F3F3F3]">
										<SmallGradientChart color={project.chartColor} />
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