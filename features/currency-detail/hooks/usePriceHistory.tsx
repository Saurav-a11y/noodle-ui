import { fetchPriceHistory } from '@/apis';
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
        queryKey: ['priceHistory', symbol, startTime, endTime, interval, type],
        queryFn: () =>
            fetchPriceHistory({ symbol, startTime, endTime, interval, type }),
        enabled: !!symbol,
        staleTime: 1000 * 60 * 5,
    });
};