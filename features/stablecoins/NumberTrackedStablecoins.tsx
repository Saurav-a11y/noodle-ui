import TooltipCommon from "@/components/common/TooltipCommon";
import { useGetNumberTrackedAboutStableCoins } from "@/hooks/stablecoins/useGetNumberTrackedAboutStableCoins";
import { formatNumberWithCommas } from "@/lib/format";

const NumberTrackedStablecoins = () => {
	const { data, isLoading: isGettingNumberTrackedAboutStableCoins } = useGetNumberTrackedAboutStableCoins();
	const numberTrackedAboutStableCoins = data?.data;

	return (
		<div className="p-4 bg-[var(--bg-card)] rounded-xl shadow-xl text-[var(--text)] flex-1">
			<div className="flex items-center gap-2 mb-2">
				<h3 className="font-reddit">Number of Tracked Stablecoins</h3>
				<TooltipCommon content="The total number of crypto projects being monitored for community signals and on-chain metrics. Only projects with enough consistent data are included." />
			</div>
			{isGettingNumberTrackedAboutStableCoins ? (
				<div className="space-y-2">
					<div className="h-10 w-24 bg-[var(--loading)] rounded-md animate-pulse" />
					<div className="h-4 w-32 bg-[var(--loading)] rounded-md animate-pulse" />
				</div>
			) : (
				<div className="text-4xl font-bold font-noto">{formatNumberWithCommas(numberTrackedAboutStableCoins?.value)}</div>
			)}
		</div>
	);
};

export default NumberTrackedStablecoins