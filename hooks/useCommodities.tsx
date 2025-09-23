'use client';

import { fetchCommoditiesHealthRanks, fetchCommodityActiveUsers, fetchCommodityNumberTracked, fetchCommodityOverview, fetchMostTalkedAboutCommodities, fetchTopGrowthCommodities } from "@/apis";
import { useQuery } from "@tanstack/react-query";

export const useCommodityOverview = (name_slug: string) => {
    return useQuery({
        queryKey: ['commodityOverview', name_slug],
        queryFn: () => fetchCommodityOverview({ name_slug }),
        enabled: !!name_slug,
        staleTime: 1000 * 60 * 5,
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

export const useMostTalkedAboutCommodities = () =>
    useQuery({
        queryKey: ['mostTalkedAboutCommodities'],
        queryFn: fetchMostTalkedAboutCommodities,
        staleTime: 1000 * 60 * 5,
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
