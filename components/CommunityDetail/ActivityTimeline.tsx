import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card } from "../ui/Card";

const ActivityTimeline = () => {
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

	const timeframes = [
		{ name: "7D", active: false },
		{ name: "30D", active: true },
		{ name: "3M", active: false },
		{ name: "6M", active: false },
		{ name: "1Y", active: false },
	];

	const totals = [
		{ label: "Total Twitter Posts", value: "144", color: "text-blue-500" },
		{ label: "Total GitHub Commits", value: "22", color: "text-purple-500" },
		{ label: "Total Reddit Posts", value: "30", color: "text-orange-500" },
		{ label: "Total AMAs", value: "10", color: "text-red-500" },
	];

	const labels = [
		{ name: 'Twitter Posts', color: '#38E1FF' },
		{ name: 'GitHub Commits', color: '#546DF9' },
		{ name: 'Reddit Posts', color: '#FF7D4D' },
		{ name: 'AMAs', color: '#FF0000' },
	]
	return (
		<div className="p-6 rounded-xl bg-white text-[#1E1B39]">
			<div className="mb-4">
				<p className="text-lg font-semibold">
					Founder & Team Activity Analysis
				</p>
				<p className="text-sm">Cross-Platform Activity Timeline</p>
			</div>
			<div className="border border-[#E9E9E9] rounded-xl p-6">
				<div className="flex flex-col gap-3 xl:flex-row xl:items-center justify-end xl:justify-between mb-4 w-full">
					<div className="flex items-center gap-4">
						{labels.map((label) => (
							<div key={label.name} className="bg-[#F9F9F9] px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer">
								<span className="w-6 h-1 rounded-full" style={{ backgroundColor: label.color }}></span>
								<p className="text-xs">{label.name}</p>
							</div>
						))}
					</div>
					<div className="flex items-center justify-end w-fit gap-1 bg-[#F9F9F9] p-1.5 rounded">
						{timeframes.map((timeframe) => (
							<button
								key={timeframe.name}
								className={`px-3 py-1.5 rounded cursor-pointer text-xs font-medium ${timeframe.active
									? "bg-[#DDF346]"
									: ""
									}`}
							>
								{timeframe.name}
							</button>
						))}
					</div>
				</div>
				<div className="bg-gray-300 rounded-xl w-full h-[350px] mb-6"></div>
				{/* <ResponsiveContainer width="100%" height="100%">
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
						<XAxis dataKey="date" stroke="#666" fontSize={12} />
						<YAxis stroke="#666" fontSize={12} />
						<Tooltip
							contentStyle={{
								backgroundColor: "white",
								border: "1px solid #e5e7eb",
								borderRadius: "8px",
								boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
							}}
						/>
						<Legend />
						<Line
							type="monotone"
							dataKey="twitter"
							stroke="#00D2FF"
							strokeWidth={2}
							name="Twitter Posts"
							dot={{ fill: "#00D2FF", r: 3 }}
						/>
						<Line
							type="monotone"
							dataKey="github"
							stroke="#4338ca"
							strokeWidth={2}
							name="GitHub Commits"
							dot={{ fill: "#4338ca", r: 3 }}
						/>
						<Line
							type="monotone"
							dataKey="reddit"
							stroke="#ff6b35"
							strokeWidth={2}
							name="Reddit Posts"
							dot={{ fill: "#ff6b35", r: 3 }}
						/>
						<Line
							type="monotone"
							dataKey="amas"
							stroke="#dc2626"
							strokeWidth={2}
							name="AMAs"
							dot={{ fill: "#dc2626", r: 3 }}
						/>
					</LineChart>
				</ResponsiveContainer> */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
					{totals.map((total, index) => (
						<div key={index} className="text-center border border-[#E9E9E9] rounded-xl p-4">
							<p className="text-sm">{total.label}</p>
							<p className={`text-2xl font-bold`}>{total.value}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ActivityTimeline;