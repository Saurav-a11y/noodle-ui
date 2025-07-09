import {
	AreaChart,
	Area,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const getColors = (color: "green" | "red") => {
	if (color === "green") {
		return {
			stroke: "#00D22D",
			gradient: "#5CFF7F",
		};
	} else {
		return {
			stroke: "#E60000",
			gradient: "#F34646",
		};
	}
};

const SmallGradientChart = ({
	color = "green",
	data,
}: {
	color?: "green" | "red";
	data: { value: number }[];
}) => {
	const gradientId = `gradient-${color}`;
	const { stroke, gradient } = getColors(color);
	return (
		<ResponsiveContainer width={80} height={40}>
			<AreaChart data={data}>
				<defs>
					<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor={gradient} stopOpacity={0.6} />
						<stop offset="100%" stopColor={gradient} stopOpacity={0} />
					</linearGradient>
				</defs>
				<Tooltip content={() => null} />
				<Area
					type="monotone"
					dataKey="value"
					stroke={stroke}
					fill={`url(#${gradientId})`}
					strokeWidth={1}
				/>
				<XAxis hide />
				<YAxis hide />
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default SmallGradientChart;