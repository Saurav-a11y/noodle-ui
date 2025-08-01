import { fetchCommunityDataSources } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useCommunityDataSources = ({ symbol, platform, page }: { symbol: string, platform: string, page: string }) => {
    return useQuery({
        queryKey: ['communityTeamActivity', symbol, platform, page],
        queryFn: () => fetchCommunityDataSources({ symbol, platform, page }),
        enabled: !!symbol,
        staleTime: 1000 * 60 * 5,
    });
};