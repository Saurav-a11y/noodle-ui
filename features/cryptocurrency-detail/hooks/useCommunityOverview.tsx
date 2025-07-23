import { fetchCommunityOverview } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useCommunityOverview = (communityId: string) => {
    return useQuery({
        queryKey: ['communityOverview', communityId],
        queryFn: () => fetchCommunityOverview({ communityId }),
        enabled: !!communityId,
        staleTime: 1000 * 60 * 5,
    });
};