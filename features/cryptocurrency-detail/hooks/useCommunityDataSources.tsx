import { fetchCommunityDataSources } from '@/apis';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useCommunityDataSources = ({ symbol, platform, page }: { symbol: string, platform: string, page: string }) => {
    return useInfiniteQuery({
        queryKey: ['communityTeamActivity', symbol, platform, page],
        queryFn: ({ pageParam = 1 }) =>
            fetchCommunityDataSources({ symbol, platform, page: pageParam.toString() }),
        getNextPageParam: (lastPage, allPages) => {
            const hasMore = lastPage?.data?.items?.length > 0;
            return hasMore ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1, // 👈 THÊM DÒNG NÀY
        enabled: !!symbol,
        staleTime: 1000 * 60 * 5,
    });
};