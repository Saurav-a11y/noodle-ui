import { fetchCommunityTeamActivityAnalysis } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useCommunityTeamActivityAnalysis = ({ communityId, fromDate, toDate }: { communityId: string, fromDate?: string, toDate?: string }) => {
    return useQuery({
        queryKey: ['communityTeamActivity', communityId, fromDate, toDate],
        queryFn: () => fetchCommunityTeamActivityAnalysis({ communityId, fromDate, toDate }),
        enabled: !!communityId,
        staleTime: 1000 * 60 * 5,
    });
};