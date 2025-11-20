'use client'

import { useCommunityOverview } from "../hooks/useCommunityOverview";
import { useParams } from "next/navigation";
import CommunityInsightsPanel from "./CommunityInsightsPanel";
import CoreCommunityMetrics from "./CoreCommunityMetrics";
import CrossPlatformSourceAnalytics from "./CrossPlatformSourceAnalytics";

const CommunityMetrics = () => {
	const params = useParams();
	const communityId = params?.slug as string;
	const { data, isFetching } = useCommunityOverview(communityId);

	return (
		<div className="space-y-5 mb-8">
			<CommunityInsightsPanel data={data?.data} isFetching={isFetching} />
			<CoreCommunityMetrics data={data?.data} isFetching={isFetching} />
			<CrossPlatformSourceAnalytics data={data?.data} isFetching={isFetching} />
		</div>
	);
};

export default CommunityMetrics;