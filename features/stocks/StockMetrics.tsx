import { useStockOverview } from "@/hooks/useStocks";
import { useParams } from "next/navigation";
import CommunityInsightsPanel from "./CommunityInsightsPanel";
import CoreCommunityMetrics from "./CoreCommunityMetrics";
import CrossPlatformSourceAnalytics from "./CrossPlatformSourceAnalytics";

const StockMetrics = () => {
    const params = useParams();
    const slug = params?.slug as string;
    const { isFetching, data } = useStockOverview(slug);
    const stockOverview = data?.data || {};

    return (
        <div className="space-y-5 mb-8">
            {/* Community Health Score */}
            <CommunityInsightsPanel stockOverview={stockOverview} isFetching={isFetching} />
            {/* Core Community Metrics */}
            <CoreCommunityMetrics stockOverview={stockOverview} isFetching={isFetching} />
            {/* Cross-Platform Source Analytics */}
            <CrossPlatformSourceAnalytics stockOverview={stockOverview} isFetching={isFetching} />
        </div>
    );
};

export default StockMetrics;