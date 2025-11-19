import { fetchListTweets } from '@/apis';
import { useQuery } from '@tanstack/react-query';

interface UseListTweetsParams {
    symbol: string;
    timeRange?: string;
}

export const useListTweets = ({
    symbol,
    timeRange,
}: UseListTweetsParams) => {
    return useQuery({
        queryKey: ['listTweet', symbol, timeRange],
        queryFn: () =>
            fetchListTweets({ symbol, timeRange }),
        enabled: !!symbol,
        staleTime: 1000 * 60 * 5,
    });
};