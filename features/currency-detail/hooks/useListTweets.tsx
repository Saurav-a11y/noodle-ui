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
        queryFn: async () => {
            const params = new URLSearchParams({
                symbol,
                ...(timeRange && { timeRange: String(timeRange) }),
            });

            const res = await fetch(
                `/api/tweets/by-symbol?${params.toString()}`
            );

            if (!res.ok) {
                throw new Error('Failed to fetch list of tweets');
            }

            return res.json();
        },
        enabled: !!symbol,
        staleTime: 1000 * 60 * 5, // 5 phút – tweets không cần realtime từng giây
        refetchOnWindowFocus: false,
    });
};