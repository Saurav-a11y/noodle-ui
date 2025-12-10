'use client';

import { fetchCommoditiesHealthRanks, fetchCommodityActiveUsers, fetchCommodityNumberTracked, fetchMostTalkedAboutCommodities, fetchTopGrowthCommodities } from "@/apis";
import { useQuery } from "@tanstack/react-query";

export const useCommodityOverview = (name_slug: string) => {
    return useQuery({
        queryKey: ['commodityOverview', name_slug],
        queryFn: async () => {
            const res = await fetch(
                `/api/commodities/detail?name_slug=${encodeURIComponent(
                    name_slug
                )}`
            );
            if (!res.ok) {
                throw new Error('Failed to fetch commodity overview');
            }
            return res.json();
        },
        enabled: !!name_slug,
        staleTime: 1000 * 60 * 5, // 5 phút – overview không cần realtime
        refetchOnWindowFocus: false,
    });
};

export const useTopGrowthCommodities = () =>
    useQuery({
        queryKey: ['topGrowthCommodities'],
        queryFn: fetchTopGrowthCommodities,
        staleTime: 1000 * 60 * 5,
    });

export const useCommoditiesHealthRanks = (params: { limit?: number, page?: number, groupFilter?: string }) =>
    useQuery({
        queryKey: ['commoditiesHealthRanks', params],
        queryFn: () => fetchCommoditiesHealthRanks(params),
        staleTime: 1000 * 60 * 5,
    });

export const useMostTalkedAboutCommodities = (options?: { enabled?: boolean }) =>
    useQuery({
        queryKey: ['mostTalkedAboutCommodities'],
        queryFn: fetchMostTalkedAboutCommodities,
        staleTime: 1000 * 60 * 5,
        enabled: options?.enabled ?? true,
    });

export const useCommodityNumberTracked = () =>
    useQuery({
        queryKey: ['commodityNumberTracked'],
        queryFn: fetchCommodityNumberTracked,
        staleTime: 1000 * 60 * 5,
    });

export const useCommodityActiveUsers = () =>
    useQuery({
        queryKey: ['CommodityActiveUsers'],
        queryFn: fetchCommodityActiveUsers,
        staleTime: 1000 * 60 * 5,
    });
