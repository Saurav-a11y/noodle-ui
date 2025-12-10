import { useQuery } from '@tanstack/react-query';

interface UsePriceHistoryParams {
    symbol: string;
    startTime?: number;
    endTime?: number;
    interval?: string;
    type?: string;
}

export const usePriceHistory = ({
    symbol,
    startTime,
    endTime,
    interval,
    type,
}: UsePriceHistoryParams) => {
    return useQuery({
        queryKey: [
            'priceHistory',
            symbol,
            startTime,
            endTime,
            interval,
            type,
        ],
        queryFn: async () => {
            const params = new URLSearchParams({
                symbol,
                ...(startTime && { startTime: String(startTime) }),
                ...(endTime && { endTime: String(endTime) }),
                ...(interval && { interval }),
                ...(type && { type }),
            });

            const res = await fetch(
                `/api/price-history?${params.toString()}`
            );

            if (!res.ok) {
                throw new Error('Failed to fetch price history');
            }

            return res.json();
        },
        enabled: !!symbol,
        staleTime: 1000 * 60 * 5, // 5 phút – chart không cần realtime từng giây
        refetchOnWindowFocus: false,
    });
};