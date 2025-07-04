import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const SocialChart = () => {
	const data = [
		{ time: "06:00", price: 15300, twitter: 2, reddit: 1, github: 0, youtube: 0 },
		{ time: "09:00", price: 15320, twitter: 5, reddit: 2, github: 1, youtube: 1 },
		{ time: "12:00", price: 15340, twitter: 8, reddit: 3, github: 2, youtube: 0 },
		{ time: "15:00", price: 15380, twitter: 12, reddit: 8, github: 1, youtube: 2 },
		{ time: "18:00", price: 15420, twitter: 15, reddit: 12, github: 3, youtube: 1 },
		{ time: "21:00", price: 15450, twitter: 18, reddit: 15, github: 2, youtube: 3 },
		{ time: "00:00", price: 15430, twitter: 10, reddit: 8, github: 1, youtube: 1 },
	];

	const platforms = [
		{ name: "All", active: true },
		{ name: "Twitter", active: false },
		{ name: "Reddit", active: false },
		{ name: "Github", active: false },
		{ name: "Youtube", active: false },
	];

	const timeframes = [
		{ name: "7D", active: true },
		{ name: "30D", active: false },
		{ name: "90D", active: false },
	];

	return (
		<div className="p-6 rounded-xl bg-white text-[#1E1B39]">
			<p className="text-xl font-semibold mb-4 font-noto">
				Social Activity vs On-Chain Behavior Correlation
			</p>

			<div className="flex items-center justify-between gap-2 mb-6">
				<div className="flex items-center gap-2">
					{platforms.map((platform) => (
						<button
							key={platform.name}
							className={`px-3 py-1.5 rounded text-sm font-reddit font-medium ${platform.active
								? "bg-[#DDF346]"
								: "border border-[#DDF346]"
								}`}
						>
							{platform.name}
						</button>
					))}
				</div>
				<div className="flex items-center gap-1 bg-[#F9F9F9] p-2 rounded">
					{timeframes.map((timeframe) => (
						<button
							key={timeframe.name}
							className={`px-3 py-1.5 rounded cursor-pointer text-xs font-medium font-reddit ${timeframe.active
								? "bg-[#DDF346]"
								: ""
								}`}
						>
							{timeframe.name}
						</button>
					))}
				</div>
			</div>

			<div className="h-80">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
						<XAxis dataKey="time" stroke="#666" fontSize={12} />
						<YAxis yAxisId="price" orientation="right" stroke="#666" fontSize={12} />
						<YAxis yAxisId="activity" orientation="left" stroke="#666" fontSize={12} />
						<Tooltip
							contentStyle={{
								backgroundColor: "white",
								border: "1px solid #e5e7eb",
								borderRadius: "8px",
								boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
							}}
						/>
						<Line
							yAxisId="price"
							type="monotone"
							dataKey="price"
							stroke="#10b981"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							yAxisId="activity"
							type="monotone"
							dataKey="twitter"
							stroke="#1da1f2"
							strokeWidth={2}
							dot={{ fill: "#1da1f2", r: 4 }}
						/>
						<Line
							yAxisId="activity"
							type="monotone"
							dataKey="reddit"
							stroke="#ff4500"
							strokeWidth={2}
							dot={{ fill: "#ff4500", r: 4 }}
						/>
						<ReferenceLine yAxisId="price" y={15416.12} stroke="#666" strokeDasharray="2 2" />
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div className="flex items-center justify-between text-xs text-gray-500 mt-4">
				<span>09:27:02 (UTC)</span>
				<span>%</span>
				<span>log</span>
				<span className="text-blue-500">auto</span>
			</div>
		</div>
	);
};

export default SocialChart;