import { useQuery } from '@tanstack/react-query';
import { fetchCommunityHealthRanks } from '@/apis';

export const useCommunityHealthRanks = () =>
    useQuery({
        queryKey: ['communityHealthRanks'],
        queryFn: fetchCommunityHealthRanks,
        staleTime: 1000 * 60 * 5,
    });