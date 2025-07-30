import { useQuery } from '@tanstack/react-query';
import { fetchStocksHealthRanks, fetchTopGrowthStocks } from "@/apis";


export const useTopGrowthStocks = () =>
    useQuery({
        queryKey: ['topGrowthStocks'],
        queryFn: fetchTopGrowthStocks,
        staleTime: 1000 * 60 * 5,
    });

export const useStocksHealthRanks = (params: { limit?: number, page?: number, search?: string, groupFilter?: string }) =>
    useQuery({
        queryKey: ['stocksHealthRanks', params],
        queryFn: () => fetchStocksHealthRanks(params),
        staleTime: 1000 * 60 * 5,
    });