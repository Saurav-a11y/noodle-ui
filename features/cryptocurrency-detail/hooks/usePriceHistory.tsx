import { fetchPriceHistory } from '@/apis';
import { useQuery } from '@tanstack/react-query';

interface UsePriceHistoryParams {
    symbol: string;
    startTime?: number;
    endTime?: number;
    interval?: string;
}

export const usePriceHistory = ({
    symbol,
    startTime,
    endTime,
    interval,
}: UsePriceHistoryParams) => {
    return useQuery({
        queryKey: ['priceHistory', symbol, startTime, endTime, interval],
        queryFn: () =>
            fetchPriceHistory({ symbol, startTime, endTime, interval }),
        enabled: !!symbol,
        staleTime: 1000 * 60 * 5,
    });
};