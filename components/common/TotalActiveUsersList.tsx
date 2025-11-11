'use client';

import TooltipCommon from "@/components/common/TooltipCommon";
import { formatNumberWithCommas } from "@/lib/format";

// 🧠 Hooks cho từng loại tài sản
import { useGetTotalActiveUserStableCoins } from "@/hooks/stablecoins/useGetTotalActiveUserStableCoins";
import { useStockActiveUsers } from "@/hooks/useStocks";
import { useCommodityActiveUsers } from "@/hooks/useCommodities";

interface TotalActiveUsersListProps {
	assetType: "cryptocurrencies" | "stocks" | "commodities";
}

const TotalActiveUsersList = ({ assetType }: TotalActiveUsersListProps) => {
	// 🔁 chọn hook theo assetType
	let data: any = null;
	let isLoading = false;

	switch (assetType) {
		case "stocks": {
			const { data: d, isLoading: loading } = useStockActiveUsers();
			data = d;
			isLoading = loading;
			break;
		}
		case "commodities": {
			const { data: d, isLoading: loading } = useCommodityActiveUsers();
			data = d;
			isLoading = loading;
			break;
		}
		default: {
			const { data: d, isLoading: loading } = useGetTotalActiveUserStableCoins();
			data = d;
			isLoading = loading;
			break;
		}
	}

	const totalActiveUsers = data?.data ?? data ?? {};
	const value = totalActiveUsers?.value ?? 0;
	const direction = totalActiveUsers?.change?.direction ?? null;

	const isUp = direction === "up";
	const isDown = direction === "down";

	const icon = isUp ? "▲" : isDown ? "▼" : "";
	const color = isUp
		? "text-[#00B552]"
		: isDown
			? "text-[#FF0000]"
			: "text-gray-400";

	// 🧩 Dynamic title & tooltip
	const titleMap = {
		cryptocurrencies: "Total Active Users (7D)",
		stocks: "Total Active Stock Users (7D)",
		commodities: "Total Active Commodity Users (7D)",
	};

	const tooltipMap = {
		cryptocurrencies:
			"The total number of crypto users actively engaging with stablecoin projects in the past 7 days.",
		stocks:
			"The total number of users actively trading or following stock projects in the past 7 days.",
		commodities:
			"The total number of users actively monitoring or discussing commodities in the past 7 days.",
	};

	return (
		<div className="p-4 bg-[var(--bg-card)] rounded-xl shadow-xl text-[var(--text)] flex-1">
			<div className="flex items-center gap-2 mb-2">
				<h3 className="font-reddit">{titleMap[assetType]}</h3>
				<TooltipCommon content={tooltipMap[assetType]} />
			</div>

			{isLoading ? (
				<div className="space-y-2">
					<div className="h-10 w-24 bg-[var(--loading)] rounded-md animate-pulse" />
					<div className="h-4 w-32 bg-[var(--loading)] rounded-md animate-pulse" />
				</div>
			) : (
				<>
					<div className="text-4xl font-bold font-noto">
						{formatNumberWithCommas(value)}
					</div>

					{isUp || isDown ? (
						<div
							className={`text-sm ${color} font-medium mt-1 font-noto flex items-center`}
						>
							{icon}&nbsp;
							{isUp ? "+" : isDown ? "-" : ""}
							{formatNumberWithCommas(totalActiveUsers?.change?.absolute)}
							&nbsp;
							{isUp || isDown
								? `(${isUp ? "+" : "-"}${totalActiveUsers?.change?.percentage}%)`
								: ""}
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

export default TotalActiveUsersList;