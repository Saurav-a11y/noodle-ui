'use client';
import AddToWatchlistButton from "@/components/common/AddToWatchlistButton";
import ComingSoon from "@/components/common/ComingSoon";
import SocialChart from "@/features/cryptocurrency-detail/components/SocialChart";
import StockFounderAndTeamAnalystChart from "@/features/stock-detail/StockFounderAndTeamAnalystChart";
import StockHeader from "@/features/stock-detail/StockHeader";
import StockMetrics from "@/features/stock-detail/StockMetrics";
import ReactQueryProvider from "@/lib/react-query-provider";

const StockDetailPage = () => {
	return (
		<ReactQueryProvider>
			<div className="flex items-center justify-between">
				<StockHeader />
				<AddToWatchlistButton />
			</div>
			<div className="grid grid-cols-4 gap-8">
				<div className="col-span-4 md:col-span-1 space-y-6">
					<StockMetrics />
				</div>
				<div className="col-span-4 md:col-span-3 space-y-5">
					<SocialChart type="stock" />
					{/* <YieldsList /> */}
					<StockFounderAndTeamAnalystChart />
					<ComingSoon />
					{/* <div className="mt-10">
                            <LiveActivity />
                        </div> */}
				</div>
			</div>
		</ReactQueryProvider>
	);
};

export default StockDetailPage;