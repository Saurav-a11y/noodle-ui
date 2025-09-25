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
			<CommunityInsightsPanel data={{ ...data?.data?.project?.health_score, ...data?.data?.project?.badges, ...data?.data?.project }} isFetching={isFetching} />
			<CoreCommunityMetrics data={{ ...data?.data?.project?.core_metrics }} isFetching={isFetching} />
			<CrossPlatformSourceAnalytics data={{ ...data?.data?.project?.cross_platform_analytics }} isFetching={isFetching} />
		</div>
	);
};

export default CommunityMetrics;