import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
	{ date: "May 20", twitter: 9, github: 0, reddit: 2, amas: 0 },
	{ date: "May 21", twitter: 4, github: 0, reddit: 0, amas: 0 },
	{ date: "May 22", twitter: 5, github: 1, reddit: 0, amas: 0 },
	{ date: "May 23", twitter: 10, github: 2, reddit: 1, amas: 0 },
	{ date: "May 24", twitter: 9, github: 3, reddit: 2, amas: 4 },
	{ date: "May 25", twitter: 8, github: 1, reddit: 1, amas: 1 },
	{ date: "May 26", twitter: 4, github: 0, reddit: 0, amas: 0 },
	{ date: "May 27", twitter: 8, github: 1, reddit: 3, amas: 0 },
	{ date: "May 28", twitter: 4, github: 0, reddit: 0, amas: 0 },
	{ date: "May 29", twitter: 8, github: 2, reddit: 2, amas: 0 },
	{ date: "May 30", twitter: 9, github: 0, reddit: 2, amas: 0 },
	{ date: "May 31", twitter: 9, github: 2, reddit: 0, amas: 0 },
	{ date: "Jun 1", twitter: 1, github: 0, reddit: 0, amas: 0 },
	{ date: "Jun 2", twitter: 4, github: 0, reddit: 1, amas: 0 },
	{ date: "Jun 3", twitter: 0, github: 0, reddit: 0, amas: 0 },
	{ date: "Jun 4", twitter: 0, github: 3, reddit: 2, amas: 0 },
	{ date: "Jun 5", twitter: 2, github: 0, reddit: 1, amas: 0 },
	{ date: "Jun 6", twitter: 5, github: 1, reddit: 0, amas: 0 },
	{ date: "Jun 7", twitter: 0, github: 0, reddit: 0, amas: 0 },
	{ date: "Jun 8", twitter: 1, github: 0, reddit: 0, amas: 0 },
	{ date: "Jun 9", twitter: 0, github: 0, reddit: 1, amas: 0 },
	{ date: "Jun 10", twitter: 2, github: 0, reddit: 0, amas: 0 },
	{ date: "Jun 11", twitter: 0, github: 0, reddit: 0, amas: 0 },
	{ date: "Jun 12", twitter: 7, github: 0, reddit: 0, amas: 0 },
	{ date: "Jun 13", twitter: 7, github: 0, reddit: 4, amas: 0 },
	{ date: "Jun 14", twitter: 5, github: 1, reddit: 0, amas: 0 },
	{ date: "Jun 15", twitter: 5, github: 2, reddit: 0, amas: 0 },
	{ date: "Jun 16", twitter: 2, github: 0, reddit: 0, amas: 0 }
];

const chartData = {
	"7D": data.slice(-7),
	"1M": data.slice(-30),
	"3M": data.slice(-90),
	"6M": data.slice(-180),
	"1Y": data.slice(-365),
};

const getTotals = (dataset: typeof data) => {
	return [
		{
			label: "Total Twitter Posts",
			value: dataset.reduce((sum, d) => sum + d.twitter, 0),
			color: "text-blue-500",
		},
		{
			label: "Total GitHub Commits",
			value: dataset.reduce((sum, d) => sum + d.github, 0),
			color: "text-purple-500",
		},
		{
			label: "Total Reddit Posts",
			value: dataset.reduce((sum, d) => sum + d.reddit, 0),
			color: "text-orange-500",
		},
		{
			label: "Total AMAs",
			value: dataset.reduce((sum, d) => sum + d.amas, 0),
			color: "text-red-500",
		},
	];
};

const labels = [
	{ name: 'Twitter Posts', color: '#38E1FF' },
	{ name: 'GitHub Commits', color: '#546DF9' },
	{ name: 'Reddit Posts', color: '#FF7D4D' },
	{ name: 'AMAs', color: '#FF0000' },
]

const ActivityTimeline = () => {

	const [selectedTimeframe, setSelectedTimeframe] = useState<keyof typeof chartData>("1M");
	const [visibleLabels, setVisibleLabels] = useState<string[]>(labels.map(l => l.name));

	const toggleLabel = (labelName: string) => {
		setVisibleLabels(prev =>
			prev.includes(labelName)
				? prev.filter(l => l !== labelName)
				: [...prev, labelName]
		);
	};

	const timeframes: Array<keyof typeof chartData> = ["7D", "1M", "3M", "6M", "1Y"];

	return (
		<div className="p-6 rounded-xl bg-white dark:bg-[#1A1A1A] dark:text-white text-[#1E1B39]">
			<div className="mb-4">
				<p className="text-lg font-semibold font-reddit">
					Founder & Team Activity Analysis
				</p>
				<p className="text-sm font-reddit">Cross-Platform Activity Timeline</p>
			</div>
			<div className="border border-[#E9E9E9] dark:border-[#B1B1B1] rounded-xl p-6">
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
						{timeframes.map((timeframe) => (
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
					<LineChart data={chartData[selectedTimeframe]}>
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
				<div className="grid grid-cols-1 md:grid:col-2 lg:grid-cols-4 gap-4">
					{getTotals(chartData[selectedTimeframe]).map((total, index) => (
						<div key={index} className="text-center border border-[#E9E9E9] dark:border-[#B1B1B1] rounded-xl p-4">
							<p className="text-sm font-reddit">{total.label}</p>
							<p className={`text-2xl font-bold font-noto`}>{total.value}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ActivityTimeline;