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
import { formatCurrency, formatNumberShort, formatPercent } from "@/lib/format";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMe } from "@/hooks/useAuth";
import { useAddUserActivityLog } from "@/hooks/useUserActivityLog";

const CommunityHealthRankings = () => {
	const router = useRouter();
	const [filters, setFilters] = useState({
		page: 1,
		limit: 10,
		category: 'All',
		score_range: 'All',
		size: 'All',
	});
	const { data: userData } = useMe()
	const { mutate: addLog } = useAddUserActivityLog();
	const { data, isLoading } = useCommunityHealthRanks(filters);

	const rankings = _get(data, 'data.community_health_rankings', []);
	// const filterCategory = _get(data, 'metadata.filters.category', []);
	const filterScore = _get(data, 'metadata.filters.score_range', []);
	const filterSize = _get(data, 'metadata.filters.size', []);

	const handleFilterChange = (key: string, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
	};

	const handlePageChange = (page: number) => {
		setFilters((prev) => ({ ...prev, page }));
	};

	const renderSelect = (data: string[], key: string) => (
		<Select value={filters[key]} onValueChange={(val) => handleFilterChange(key, val)}>
			<SelectTrigger className="w-[150px] h-8 bg-[#F8F8F8] border-[#E4E4E4] rounded-full text-xs text-[#4B4A4A] dark:text-[#FFF] dark:opacity-50 dark:bg-[#1A1A1A] dark:border-[#4A4A4A] cursor-pointer font-reddit">
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

	const renderPageButton = (page: number, current_page: number) => (
		<div key={page} className={`p-[1px] transition-colors bg-gradient-to-r from-[#DDF346] to-[#84EA07] rounded cursor-pointer`}>
			<button
				className={`min-w-[34.05px] px-3 py-1 h-full rounded text-sm font-medium cursor-pointer font-reddit ${page === current_page
					? 'transition-colors bg-gradient-to-r from-[#DDF346] to-[#84EA07] text-[#494949] font-medium border-transparent'
					: 'bg-white dark:bg-[#1A1A1A] text-[#494949] dark:text-white'
					}`}
				onClick={() => handlePageChange(page)}
			>
				{page}
			</button>
		</div>
	);

	const renderPagination = () => {
		const { current_page = 1, total_pages = 1 } = _get(data, 'metadata.pagination', {});
		if (total_pages <= 1) return null;

		const pages: any[] = [];

		// Prev button
		pages.push(
			<div key="prev" className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1px] rounded cursor-pointer">
				<button
					disabled={current_page === 1}
					onClick={() => handlePageChange(current_page - 1)}
					className="relative bg-white dark:bg-[#1A1A1A] dark:text-[#FFFFFF] cursor-pointer rounded px-3 py-1 font-medium flex items-center gap-2 h-full">
					<ChevronLeft className="w-4" />
				</button>
			</div>
		);

		// Always show first page
		pages.push(renderPageButton(1, current_page));

		if (current_page > 3) {
			pages.push(<span key="dots-left" className="text-white px-2">...</span>);
		}

		const start = Math.max(2, current_page - 1);
		const end = Math.min(total_pages - 1, current_page + 1);

		for (let i = start; i <= end; i++) {
			if (i !== 1 && i !== total_pages) {
				pages.push(renderPageButton(i, current_page));
			}
		}

		if (current_page < total_pages - 2) {
			pages.push(<span key="dots-right" className="text-black dark:text-white px-2 flex items-end">...</span>);
		}

		if (total_pages > 1) {
			pages.push(renderPageButton(total_pages, current_page));
		}

		// Next button
		pages.push(
			<div key="next" className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1px] rounded cursor-pointer">
				<button
					disabled={current_page === total_pages}
					onClick={() => handlePageChange(current_page + 1)}
					className="relative bg-white dark:bg-[#1A1A1A] cursor-pointer dark:text-[#FFFFFF] rounded px-3 py-1 font-medium flex items-center gap-2 h-full">
					<ChevronRight className="w-4" />
				</button>
			</div>
		);

		return <div className="flex justify-end mt-6 gap-2">{pages}</div>;
	};

	return (
		<div>
			<div className="flex items-center gap-2 dark:text-[#FFFFFF] mb-6">
				<h3 className="text-3xl font-medium font-space">Community Health Rankings</h3>
				<TooltipCommon content="A live leaderboard that ranks crypto projects based on their overall community health score. It helps you quickly identify which projects have strong, active, and authentic communities." />
			</div>

			<div className="p-5 bg-white dark:bg-black rounded-xl shadow-xl">
				<div className="flex justify-between items-center w-full mb-5">
					{/* Filters */}
					<div className="flex gap-4">
						{/* {renderSelect(filterCategory, 'category')} */}
						{renderSelect(filterScore, 'score_range')}
						{renderSelect(filterSize, 'size')}
					</div>
					{/* Search */}
					{/* <SearchCryptoInput placeholder="Search by symbol, name" inputClassname="!mx-0 max-w-xs" popupClassname="!left-0 !max-w-xs" /> */}
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<Table>
						<TableHeader className="dark:bg-[#1A1A1A]">
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
												<div className="h-6 bg-gray-200 dark:bg-[#333] rounded animate-pulse w-full" />
											</TableCell>
										))}
									</TableRow>
								))
								: _map(rankings, (project) => (
									<TableRow
										key={project?.rank}
										className="hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] cursor-pointer transition-colors"
										onClick={() => {
											router.push(`/stablecoins/${project?.name}`)
											if (userData?.data?.id) {
												addLog({
													userId: userData?.data?.id,
													type: 'view_detail',
													assetType: 'stablecoins',
													assetSymbol: project.name,
													assetName: project.name_desc,
													assetLogo: project.medium_logo_url,
													content: `See details: '${project.name_desc} (${project.name}) Community'`,
												});
											}
										}}
									>
										<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] text-xs border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{project?.rank}</TableCell>
										<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
											<div className="flex items-center gap-3">
												<div className="w-8 h-8 flex items-center justify-center font-noto">
													<Image src={_get(project, 'medium_logo_url', '/images/icon-section-6_2.png')} alt="Symbol" width={64} height={64} className="rounded-full" />
												</div>
												<div className="text-[#4B4A4A] dark:text-[#FFF]">
													<p className="font-medium text-sm font-noto">{project?.name_desc}</p>
													<div className="text-[10px] font-medium opacity-50 font-noto">{project?.name}</div>
												</div>
											</div>
										</TableCell>
										<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><p className="text-center">{formatNumberShort(project?.health_score)}</p></TableCell>
										<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><p className="text-center">{formatNumberShort(project?.active_users)}</p></TableCell>
										<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto"><div>{formatPercent(project?.engagement_rate_percent)}</div></TableCell>
										<TableCell className="font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">
											<div className={`text-center font-noto`}>
												{formatPercent(project?.growth_rate_percent)}
											</div>
										</TableCell>
										<TableCell className="text-sm font-medium text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#F3F3F3] dark:border-b-[#242424] font-noto">{project?.risk_flag}</TableCell>
										<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
											<div className="flex items-center gap-3">
												<p className="text-sm font-medium font-noto text-[#4B4A4A] dark:text-[#FFF]">{formatCurrency(project?.market_cap?.value)}</p>
												<div className={`flex items-center font-noto text-[#4B4A4A] dark:text-white`}>
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
				{/* Pagination */}
				{renderPagination()}
			</div>
		</div>
	);
};

export default CommunityHealthRankings;