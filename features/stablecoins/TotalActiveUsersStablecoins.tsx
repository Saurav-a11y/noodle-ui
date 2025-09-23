import TooltipCommon from "@/components/common/TooltipCommon";
import { useGetTotalActiveUserStableCoins } from "@/hooks/useStablecoins";
import { formatNumberWithCommas } from "@/lib/format";

const TotalActiveUsersStablecoins = () => {
	const { data, isLoading: isGettingTotalActiveUserStableCoins } = useGetTotalActiveUserStableCoins();
	const totalActiveUserStableCoins = data?.data;

	const isUp = totalActiveUserStableCoins?.change?.direction === 'up';
	const isDown = totalActiveUserStableCoins?.change?.direction === 'down';

	let icon = '';
	let color = '';
	if (isUp) {
		icon = '▲';
		color = 'text-[#00B552]';
	} else if (isDown) {
		icon = '▼';
		color = 'text-[#FF0000]';
	} else {
		icon = '';
		color = 'text-gray-400';
	}

	return (
		<div className="p-4 bg-white dark:bg-black rounded-xl shadow-xl dark:text-white flex-1">
			<div className="flex items-center gap-2 mb-2">
				<h3 className="font-reddit">Number of Tracked Stablecoins</h3>
				<TooltipCommon content="The total number of crypto projects being monitored for community signals and on-chain metrics. Only projects with enough consistent data are included." />
			</div>
			{isGettingTotalActiveUserStableCoins ? (
				<div className="space-y-2">
					<div className="h-10 w-24 bg-gray-200 dark:bg-[#333] rounded-md animate-pulse" />
					<div className="h-4 w-32 bg-gray-200 dark:bg-[#333] rounded-md animate-pulse" />
				</div>
			) : (
				<>
					<div className="text-4xl font-bold font-noto">{formatNumberWithCommas(totalActiveUserStableCoins?.value)}</div>
					{isUp || isDown ? (
						<div className={`text-sm ${color} font-medium mt-1 font-noto flex items-center`}>
							{icon} {isUp ? '+' : '-'}
							{formatNumberWithCommas(totalActiveUserStableCoins?.change?.absolute)}
							{isUp || isDown ? ` (${isUp ? '+' : '-'}${totalActiveUserStableCoins?.change?.percentage}%)` : ''}
						</div>
					) : (
						<div className="text-sm text-gray-400 font-medium mt-1 font-noto flex items-center">
							<span style={{ letterSpacing: 0.5 }}>No change</span>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default TotalActiveUsersStablecoins