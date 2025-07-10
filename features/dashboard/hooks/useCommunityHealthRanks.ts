import { useQuery } from '@tanstack/react-query';
import { CommunityHealthRankParams, fetchCommunityHealthRanks } from '@/apis';

export const useCommunityHealthRanks = (params: CommunityHealthRankParams = {}) =>
    useQuery({
        queryKey: ['communityHealthRanks', params],
        queryFn: () => fetchCommunityHealthRanks(params),
        staleTime: 1000 * 60 * 5,
    });