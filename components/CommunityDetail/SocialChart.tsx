import Calendar from "@/icons/Calendar";
import CandlestickChart from "./CandletickChart";

const SocialChart = () => {
	return (
		<div className="p-6 rounded-xl bg-white text-[#1E1B39]">
			<p className="text-xl font-semibold mb-4 font-noto">
				Social Activity vs On-Chain Behavior Correlation
			</p>
			<CandlestickChart />
			<hr className="text-[#E8E8E8] mt-2" />
			<div className="flex items-center mt-4 justify-between">
				<div className="flex items-center">
					{['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'All'].map((item) => (
						<p
							key={item}
							className="text-xs cursor-pointer hover:bg-[#F4F4F5] px-2 py-1 rounded-md transition-colors"
						>
							{item}
						</p>
					))}
					<div className="border-l mr-2 h-4 border-[#E8E8E8]" />
					<span className="cursor-pointer">
						<Calendar />
					</span>
				</div>
				<div className="flex items-center gap-2 text-xs text-[#222222]">
					<span>09:27:02 (UTC)</span>
					<div className="border-l h-4 border-[#E8E8E8]" />
					<span>%</span>
					<span>log</span>
					<span className="text-blue-500">auto</span>
				</div>
			</div>
		</div>
	);
};

export default SocialChart;