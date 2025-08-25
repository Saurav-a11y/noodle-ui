'use client';
import ActivityTimeline from "@/features/cryptocurrency-detail/components/ActivityTimeline";
import CommunityMetrics from "@/features/cryptocurrency-detail/components/CommunityMetrics";
import LiveActivity from "@/features/cryptocurrency-detail/components/LiveActivity";
import ProjectInfo from "@/features/cryptocurrency-detail/components/ProjectInfo";
import SocialChart from "@/features/cryptocurrency-detail/components/SocialChart";

import AddToWatchlistButton from "@/components/common/AddToWatchlistButton";
import YieldsList from "@/components/common/YieldsList";
import { AssetDetailLayout } from "@/components/common/AssetDetailLayout";
import { AssetHeader } from "@/components/common/AssetHeader";

const CryptocurrencyDetailPage = () => {
	return (
		<AssetDetailLayout>
			<>
				<div className="flex items-center justify-between">
					<AssetHeader />
					<AddToWatchlistButton />
				</div>
				<div className="grid grid-cols-4 gap-8">
					<div className="col-span-4 md:col-span-1 space-y-6">
						<CommunityMetrics />
						<ProjectInfo />
					</div>
					<div className="col-span-4 md:col-span-3 space-y-5">
						<SocialChart type="crypto" />
						<YieldsList />
						<ActivityTimeline />
						<div className="mt-10">
							<LiveActivity />
						</div>
					</div>
				</div>
			</>
		</AssetDetailLayout>
	);
};

export default CryptocurrencyDetailPage;