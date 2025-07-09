'use client'
import { useRouter } from "next/navigation";
import _get from 'lodash/get';
import _map from 'lodash/map';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import Image from "next/image";

import TooltipCommon from "@/components/common/TooltipCommon";
import SmallGradientChart from "./SmallGradientChart";
import { useCommunityHealthRanks } from "../hooks/useCommunityHealthRanks";
import { formatNumberShort, formatPercent } from "@/lib/format";

const CommunityHealthRankings = () => {
	const router = useRouter();
	const { data, isLoading } = useCommunityHealthRanks();

	const rankings = _get(data, 'data.community_health_rankings', []);
	const filterCategory = _get(data, 'metadata.filters.category', []);
	const filterScore = _get(data, 'metadata.filters.score_range', []);
	const filterSize = _get(data, 'metadata.filters.size', []);

	const renderSelect = (data: string[]) => (
		<Select defaultValue={data[0]}>
			<SelectTrigger className="w-[150px] h-8 bg-[#F8F8F8] border-[#E4E4E4] rounded-full text-xs text-[#4B4A4A] dark:text-[#FFF] dark:opacity-50 dark:bg-[#2D2D2D] dark:border-[#4A4A4A] cursor-pointer font-reddit">
				<SelectValue placeholder='All' />
			</SelectTrigger>
			<SelectContent className="bg-white dark:bg-[#1A1A1A] border-none shadow-lg">
				{_map(data, (item) => (
					<SelectItem
						key={item}
						value={item}
						className="hover:bg-[#F9F9F9] dark:hover:bg-[#313131] cursor-pointer transition-colors font-reddit dark:text-white"
					>
						{item}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);

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
					{renderSelect(filterCategory)}
					{renderSelect(filterScore)}
					{renderSelect(filterSize)}
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
							{isLoading
								? Array.from({ length: 5 }).map((_, i) => (
									<TableRow key={i} className="animate-pulse">
										{Array.from({ length: 9 }).map((_, j) => (
											<TableCell key={j} className="py-4 h-[73px] border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
												<div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-full" />
											</TableCell>
										))}
									</TableRow>
								))
								: _map(rankings, (project) => (
									<TableRow
										key={project?.rank}
										className="hover:bg-[#F9F9F9] dark:hover:bg-[#313131] cursor-pointer transition-colors"
										onClick={() => router.push(`/community-detail/${project?.symbol}`)}
									>
										<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] text-xs border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{project?.rank}</TableCell>
										<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
											<div className="flex items-center gap-3">
												<div className="w-8 h-8 flex items-center justify-center font-noto">
													<Image src={project?.medium_logo_url} alt="Symbol" width={64} height={64} className="rounded-full" />
												</div>
												<div className="text-[#4B4A4A] dark:text-[#FFF]">
													<p className="font-medium text-sm font-noto">{project?.name}</p>
													<div className="text-[10px] font-medium opacity-50 font-noto">{project?.symbol}</div>
												</div>
											</div>
										</TableCell>
										<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><p className="text-center">{project?.health_score}</p></TableCell>
										<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><p className="text-center">{formatNumberShort(project?.active_users)}</p></TableCell>
										<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><p className="text-center">{project?.engagement_rate_percent}%</p></TableCell>
										<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">
											<div className={`text-center font-noto`}>
												{formatPercent(project?.growth_rate_percent)}
											</div>
										</TableCell>
										<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{project?.risk_flag}</TableCell>
										<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
											<div className="flex items-center gap-3">
												<p className="text-sm font-medium font-noto text-[#4B4A4A] dark:text-[#FFF]">{project?.market_cap?.display}</p>
												<div className={`flex items-center font-noto`}>
													{formatPercent(project?.market_cap?.change_percent)}
												</div>
											</div>
										</TableCell>
										<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
											<SmallGradientChart color={project?.market_cap?.change_percent > 0 ? 'green' : 'red'} data={project?.market_cap?.trend_chart} />
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