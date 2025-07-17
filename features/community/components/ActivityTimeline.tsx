'use client';
import { useMemo, useState } from "react";
import { endOfDay, subDays, startOfDay } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useCommunityTeamActivityAnalysis } from "../hooks/useCommunityTeamActivityAnalysis";
import { useParams } from "next/navigation";

const labels = [
	{ name: 'Twitter Posts', color: '#38E1FF' },
	{ name: 'GitHub Commits', color: '#546DF9' },
	{ name: 'Reddit Posts', color: '#FF7D4D' },
	{ name: 'AMAs', color: '#FF0000' },
]

const timeframeDays: Record<string, number> = {
	"7D": 7,
	"1M": 30,
	"3M": 90,
	"6M": 180,
	"1Y": 365,
};

const getDateRange = (days: number) => {
	const toDate = endOfDay(new Date());
	const fromDate = startOfDay(subDays(toDate, days - 1));
	return {
		fromDate: fromDate.toISOString(),
		toDate: toDate.toISOString(),
	};
};

const ActivityTimeline = () => {
	const params = useParams();
	const communityId = params?.slug as string;

	const [selectedTimeframe, setSelectedTimeframe] = useState("1M");
	const [visibleLabels, setVisibleLabels] = useState<string[]>(labels.map(l => l.name));

	const { fromDate, toDate } = useMemo(
		() => getDateRange(timeframeDays[selectedTimeframe]),
		[selectedTimeframe]
	);
	const { data, isFetching } = useCommunityTeamActivityAnalysis({
		communityId,
		fromDate,
		toDate
	})

	const toggleLabel = (labelName: string) => {
		setVisibleLabels(prev =>
			prev.includes(labelName)
				? prev.filter(l => l !== labelName)
				: [...prev, labelName]
		);
	};

	const timeframes = ["7D", "1M", "3M", "6M", "1Y"];
	const totals = data?.data?.totals || null
	const dataChart = data?.data?.time_series
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
							const isSelected = visibleLabels.includes(label.name);
							return (
								<div
									key={label.name}
									className={`px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer ${isSelected ? "bg-[#F9F9F9] dark:bg-[#222]" : ""}`}
									onClick={() => toggleLabel(label.name)}
								>
									<span className="w-6 h-1 rounded-full" style={{ backgroundColor: label.color }}></span>
									<p className="text-xs font-reddit">{label.name}</p>
								</div>
							);
						})}
					</div>
					<div className="flex items-center justify-end w-fit gap-1 bg-[#F9F9F9] dark:bg-[#222] p-1.5 rounded">
						{Object.keys(timeframeDays).map((timeframe) => (
							<button
								key={timeframe}
								onClick={() => setSelectedTimeframe(timeframe)}
								className={`px-2 py-1 rounded cursor-pointer text-xs font-reddit font-medium ${selectedTimeframe === timeframe ? "bg-[#DDF346] dark:text-[#222]" : ""
									}`}
							>
								{timeframe}
							</button>
						))}
					</div>
				</div>
				{/* Chart Block */}
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={dataChart}>
						<CartesianGrid strokeDasharray="3 3" stroke="#E9E9E9" />
						<XAxis dataKey="date" tick={{ fontSize: 12 }} />
						<YAxis tick={{ fontSize: 12 }} />
						<Tooltip content={undefined} />
						{visibleLabels.includes("Twitter Posts") && (
							<Line type="monotone" dataKey="twitter" stroke="#38E1FF" strokeWidth={2} dot={false} />
						)}
						{visibleLabels.includes("GitHub Commits") && (
							<Line type="monotone" dataKey="github" stroke="#546DF9" strokeWidth={2} dot={false} />
						)}
						{visibleLabels.includes("Reddit Posts") && (
							<Line type="monotone" dataKey="reddit" stroke="#FF7D4D" strokeWidth={2} dot={false} />
						)}
						{visibleLabels.includes("AMAs") && (
							<Line type="monotone" dataKey="amas" stroke="#FF0000" strokeWidth={2} dot={false} />
						)}
					</LineChart>
				</ResponsiveContainer>
				<div className="grid grid-cols-1 md:grid:col-2 lg:grid-cols-4 gap-4 mt-4">
					<div className="text-center flex flex-col items-center border border-[#E9E9E9] dark:border-none dark:bg-[#0B0B0B] rounded-xl p-4">
						<p className="text-sm font-reddit mb-2">Total Twitter Posts</p>
						{isFetching ? <div className="w-20 h-8 bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <p className={`text-2xl font-bold font-noto`}>{totals?.twitter_posts}</p>}
					</div>
					<div className="text-center flex flex-col items-center border border-[#E9E9E9] dark:border-none dark:bg-[#0B0B0B] rounded-xl p-4">
						<p className="text-sm font-reddit mb-2">Total GitHub Commits</p>
						{isFetching ? <div className="w-20 h-8 bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <p className={`text-2xl font-bold font-noto`}>{totals?.github_commits}</p>}
					</div>
					<div className="text-center flex flex-col items-center border border-[#E9E9E9] dark:border-none dark:bg-[#0B0B0B] rounded-xl p-4">
						<p className="text-sm font-reddit mb-2">Total Reddit Posts</p>
						{isFetching ? <div className="w-20 h-8 bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <p className={`text-2xl font-bold font-noto`}>{totals?.reddit_posts}</p>}
					</div>
					<div className="text-center flex flex-col items-center border border-[#E9E9E9] dark:border-none dark:bg-[#0B0B0B] rounded-xl p-4">
						<p className="text-sm font-reddit mb-2">Total AMAs</p>
						{isFetching ? <div className="w-20 h-8 bg-gray-200 dark:bg-[#333] rounded animate-pulse" /> : <p className={`text-2xl font-bold font-noto`}>{totals?.amas}</p>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ActivityTimeline;