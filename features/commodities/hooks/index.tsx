import { useQuery } from '@tanstack/react-query';
import { fetchCommoditiesHealthRanks, fetchTopGrowthCommodities, fetchOverviewCommoditiesStats } from '@/apis';

export const useTopGrowthCommodities = () =>
    useQuery({
        queryKey: ['topGrowthCommodities'],
        queryFn: fetchTopGrowthCommodities,
        staleTime: 1000 * 60 * 5,
    });

export const useCommoditiesHealthRanks = (params: { limit: number, page: number, search: string, groupFilter: string }) =>
    useQuery({
        queryKey: ['commoditiesHealthRanks', params],
        queryFn: () => fetchCommoditiesHealthRanks(params),
        staleTime: 1000 * 60 * 5,
    });

export const useOverviewCommoditiesStats = () =>
    useQuery({
        queryKey: ['overviewCommoditiesStats'],
        queryFn: fetchOverviewCommoditiesStats,
        staleTime: 1000 * 60 * 5,
    });