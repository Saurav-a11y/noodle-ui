import { fetchCommunityTeamActivityAnalysis } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useCommunityTeamActivityAnalysis = ({ communityId, amount, unit }: { communityId: string, amount?: number, unit?: string }) => {
    return useQuery({
        queryKey: ['communityTeamActivity', communityId, amount, unit],
        queryFn: () => fetchCommunityTeamActivityAnalysis({ communityId, amount, unit }),
        enabled: !!communityId,
        staleTime: 1000 * 60 * 5,
    });
};