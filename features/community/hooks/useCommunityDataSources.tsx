import { fetchCommunityDataSources } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useCommunityDataSources = ({ symbol, platform }: { symbol: string, platform: string }) => {
    return useQuery({
        queryKey: ['communityTeamActivity', symbol, platform],
        queryFn: () => fetchCommunityDataSources({ symbol, platform }),
        enabled: !!symbol,
    });
};