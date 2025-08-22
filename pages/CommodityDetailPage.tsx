'use client';
import AddToWatchlistButton from "@/components/common/AddToWatchlistButton";
import { AssetDetailLayout } from "@/components/common/AssetDetailLayout";
import { CommodityHeader } from "@/features/commodity-detail/CommodityHeader";
import CommodityMetrics from "@/features/commodity-detail/CommodityMetrics";
import ComingSoon from "@/components/common/ComingSoon";

const CommodityDetailPage = () => {
    return (
        <AssetDetailLayout>
            <>
                <div className="flex items-center justify-between">
                    <CommodityHeader />
                    <AddToWatchlistButton />
                </div>
                <div className="grid grid-cols-4 gap-8">
                    <div className="col-span-4 md:col-span-1 space-y-6">
                        <CommodityMetrics />
                    </div>
                    <div className="col-span-4 md:col-span-3 space-y-5">
                        <ComingSoon />
                        {/* <SocialChart /> */}
                        {/* <YieldsList /> */}
                        {/* <ActivityTimeline /> */}
                        {/* <div className="mt-10">
                            <LiveActivity />
                        </div> */}
                    </div>
                </div>
            </>
        </AssetDetailLayout>
    );
};

export default CommodityDetailPage;