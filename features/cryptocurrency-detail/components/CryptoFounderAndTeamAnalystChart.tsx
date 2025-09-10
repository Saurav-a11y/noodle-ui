'use client';
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useCommunityTeamActivityAnalysis } from "../hooks/useCommunityTeamActivityAnalysis";
import { useParams } from "next/navigation";

const labels = [
	{ name: 'Twitter Posts', color: '#38E1FF' },
	{ name: 'GitHub Commits', color: '#546DF9' },
	{ name: 'Reddit Posts', color: '#FF7D4D' },
	{ name: 'YouTube', color: '#FF0000' },
]

const timeframeOptions: Record<string, { amount: number; unit: "day" | "month" }> = {
	"7D": { amount: 7, unit: "day" },
	"1M": { amount: 30, unit: "day" },
	"3M": { amount: 3, unit: "month" },
	"6M": { amount: 6, unit: "month" },
	"1Y": { amount: 12, unit: "month" },
};

const CryptoFounderAndTeamAnalystChart = () => {
	const params = useParams();
	const communityId = params?.slug as string;
	const tokenSymbol =
		typeof communityId === "string"
			? communityId.slice(0, -3) // bỏ 3 ký tự cuối
			: "";
	const [selectedTimeframe, setSelectedTimeframe] = useState<keyof typeof timeframeOptions>("1M");
	const [visibleLabels, setVisibleLabels] = useState<string[]>(labels.map(l => l.name));

	const timeOption = timeframeOptions[selectedTimeframe];

	const { data, isFetching } = useCommunityTeamActivityAnalysis({
		communityId: tokenSymbol,
		amount: timeOption.amount,
		unit: timeOption.unit,
	})

	const toggleLabel = (labelName: string) => {
		setVisibleLabels(prev =>
			prev.includes(labelName)
				? prev.filter(l => l !== labelName)
				: [...prev, labelName]
		);
	};

	const totals = data?.data?.totals || null
	const dataChart = data?.data?.time_series

	const activeLabels = labels.filter(label => {
		if (label.name === "Twitter Posts") return totals?.twitter_posts > 0;
		if (label.name === "GitHub Commits") return totals?.github_commits > 0;
		if (label.name === "Reddit Posts") return totals?.reddit_posts > 0;
		if (label.name === "YouTube") return totals?.youtube_videos > 0;
		return false;
	});

	useEffect(() => {
		// Khi dữ liệu về, chỉ cho visible labels là những cái có data
		if (totals) {
			const newVisible: string[] = [];
			if (totals?.twitter_posts > 0) newVisible.push("Twitter Posts");
			if (totals?.github_commits > 0) newVisible.push("GitHub Commits");
			if (totals?.reddit_posts > 0) newVisible.push("Reddit Posts");
			if (totals?.youtube_videos > 0) newVisible.push("YouTube");
			setVisibleLabels(newVisible);
		}
	}, [totals]);

	return (
		<div className="p-6 rounded-xl bg-white dark:bg-[#1A1A1A] dark:text-white text-[#1E1B39]">
			<div className="mb-4">
				<p className="text-lg font-semibold font-reddit">
					Founder & Team Activity Analysis
				</p>
				<p className="text-sm font-reddit">Cross-Platform Activity Timeline</p>
			</div>
			<div className="border border-[#E9E9E9] dark:border-none bg-white dark:bg-black rounded-xl p-6">
				<div className="flex flex-col gap-3 xl:flex-row xl:items-center justify-end xl:justify-between mb-4 w-full">
					<div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
						{labels.map((label) => {
							const isActive = activeLabels.some(l => l.name === label.name);
							const isSelected = visibleLabels.includes(label.name);
							return (
								<div
									key={label.name}
									className={
										`px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer ${isSelected && isActive ? "bg-[#F9F9F9] dark:bg-[#222]" : ""} ${!isActive ? "opacity-40 pointer-events-none" : ""}`
									}
									onClick={() => isActive && toggleLabel(label.name)}
								>
									<span className="w-6 h-1 rounded-full" style={{ backgroundColor: label.color }}></span>
									<p className="text-xs font-reddit">{label.name}</p>
								</div>
							);
						})}
					</div>
					<div className="flex items-center justify-end w-fit gap-1 bg-[#F9F9F9] dark:bg-[#222] p-1.5 rounded">
						{Object.keys(timeframeOptions).map((timeframe) => (
							<button
								key={timeframe}
								onClick={() => setSelectedTimeframe(timeframe as keyof typeof timeframeOptions)}
								className={`px-2 py-1 rounded cursor-pointer text-xs font-reddit font-medium ${selectedTimeframe === timeframe ? "bg-[#DDF346] dark:text-[#222]" : ""
									}`}
							>
								{timeframe}
							</button>
						))}
					</div>
				</div>
				{/* Chart Block */}
				<div className="relative min-h-[300px]">
					{isFetching ? (
						// Loading skeleton
						<div className="flex items-center justify-center h-[300px]">
							<div className="w-full h-full bg-gray-100 dark:bg-[#1A1A1A] rounded-xl animate-pulse flex items-center justify-center">
								<span className="text-gray-400 dark:text-gray-600 text-lg">Loading chart...</span>
							</div>
						</div>
					) : data?.data?.time_series?.length > 0 ? (
						<ResponsiveContainer width="100%" height={300}>
							<LineChart data={dataChart}>
								<CartesianGrid strokeDasharray="3 3" stroke="#E9E9E9" />
								<XAxis dataKey="date" tick={{ fontSize: 12 }} />
								<YAxis tick={{ fontSize: 12 }} />
								<Tooltip content={undefined} />
								{totals?.twitter_posts > 0 && visibleLabels.includes("Twitter Posts") && (
									<Line type="monotone" dataKey="twitter_posts" stroke="#38E1FF" strokeWidth={2} dot={false} />
								)}
								{totals?.github_commits > 0 && visibleLabels.includes("GitHub Commits") && (
									<Line type="monotone" dataKey="github_commits" stroke="#546DF9" strokeWidth={2} dot={false} />
								)}
								{totals?.reddit_posts > 0 && visibleLabels.includes("Reddit Posts") && (
									<Line type="monotone" dataKey="reddit_posts" stroke="#FF7D4D" strokeWidth={2} dot={false} />
								)}
								{totals?.youtube_videos > 0 && visibleLabels.includes("YouTube") && (
									<Line type="monotone" dataKey="youtube_videos" stroke="#FF0000" strokeWidth={2} dot={false} />
								)}
							</LineChart>
						</ResponsiveContainer>
					) : (
						// No data UI
						<div className="flex items-center justify-center h-[300px] bg-gray-50 dark:bg-[#181818] rounded-xl">
							<span className="text-gray-400 dark:text-gray-600 text-lg font-medium">No activity data available for this timeframe.</span>
						</div>
					)}
				</div>
				<div className="grid grid-cols-1 md:grid:col-2 lg:grid-cols-4 gap-4 mt-4">
					<div className="text-center flex flex-col items-center border border-[#E9E9E9] dark:border-none dark:bg-[#0B0B0B] rounded-xl p-4">
						<p className="text-sm font-reddit mb-2">Total Twitter Posts</p>
						{isFetching ? <div className="w-20 h-8 bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <p className={`text-2xl font-bold font-noto`}>{totals?.twitter_posts || 0}</p>}
					</div>
					<div className="text-center flex flex-col items-center border border-[#E9E9E9] dark:border-none dark:bg-[#0B0B0B] rounded-xl p-4">
						<p className="text-sm font-reddit mb-2">Total GitHub Commits</p>
						{isFetching ? <div className="w-20 h-8 bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <p className={`text-2xl font-bold font-noto`}>{totals?.github_commits || 0}</p>}
					</div>
					<div className="text-center flex flex-col items-center border border-[#E9E9E9] dark:border-none dark:bg-[#0B0B0B] rounded-xl p-4">
						<p className="text-sm font-reddit mb-2">Total Reddit Posts</p>
						{isFetching ? <div className="w-20 h-8 bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <p className={`text-2xl font-bold font-noto`}>{totals?.reddit_posts || 0}</p>}
					</div>
					<div className="text-center flex flex-col items-center border border-[#E9E9E9] dark:border-none dark:bg-[#0B0B0B] rounded-xl p-4">
						<p className="text-sm font-reddit mb-2">Total YouTube</p>
						{isFetching ? <div className="w-20 h-8 bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <p className={`text-2xl font-bold font-noto`}>{totals?.youtube_videos || 0}</p>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CryptoFounderAndTeamAnalystChart;