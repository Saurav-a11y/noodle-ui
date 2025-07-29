import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchCommoditiesHealthRanks, fetchTopGrowthCommodities, fetchOverviewCommoditiesStats, chatWithAgent, sayHello } from '@/apis';

export const useTopGrowthCommodities = () =>
    useQuery({
        queryKey: ['topGrowthCommodities'],
        queryFn: fetchTopGrowthCommodities,
        staleTime: 1000 * 60 * 5,
    });

export const useCommoditiesHealthRanks = (params: { limit?: number, page?: number, search?: string, groupFilter?: string }) =>
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

export const useSendChatMessage = () => {
    return useMutation({
        mutationFn: ({ symbol, prompt, messages }: { symbol: string; prompt: string; messages: { ai: boolean; text: string }[] }) =>
            chatWithAgent({ prompt, messages }),
    });
};

export const useSayHello = ({ symbol }) =>
    useQuery({
        queryKey: ['say-hello', symbol],
        queryFn: () => sayHello(),
        enabled: !!symbol,
    });