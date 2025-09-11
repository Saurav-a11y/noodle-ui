import { fetchMostTalkedAboutStocks, fetchStockActiveUsers, fetchStockCommunityTeamActivityAnalysis, fetchStockNumberTracked, fetchStockOverview, fetchStocksHealthRanks, fetchTopGrowthStocks } from "@/apis";
import { useQuery } from "@tanstack/react-query";

export const useTopGrowthStocks = () =>
	useQuery({
		queryKey: ['topGrowthStocks'],
		queryFn: fetchTopGrowthStocks,
		staleTime: 1000 * 60 * 5,
	});

export const useMostTalkedAboutStocks = () =>
	useQuery({
		queryKey: ['mostTalkedAboutStocks'],
		queryFn: fetchMostTalkedAboutStocks,
		staleTime: 1000 * 60 * 5,
	});

export const useStockNumberTracked = () =>
	useQuery({
		queryKey: ['stockNumberTracked'],
		queryFn: fetchStockNumberTracked,
		staleTime: 1000 * 60 * 5,
	});

export const useStockActiveUsers = () =>
	useQuery({
		queryKey: ['stockActiveUsers'],
		queryFn: fetchStockActiveUsers,
		staleTime: 1000 * 60 * 5,
	});

export const useStocksHealthRanks = (params: { limit?: number, page?: number, search?: string, groupFilter?: string }) =>
	useQuery({
		queryKey: ['stocksHealthRanks', params],
		queryFn: () => fetchStocksHealthRanks(params),
		staleTime: 1000 * 60 * 5,
	});

export const useStockCommunityTeamActivityAnalysis = ({ communityId, amount, unit }: { communityId: string, amount?: number, unit?: string }) => {
	return useQuery({
		queryKey: ['stockCommunityTeamActivity', communityId, amount, unit],
		queryFn: () => fetchStockCommunityTeamActivityAnalysis({ communityId, amount, unit }),
		enabled: !!communityId,
		staleTime: 1000 * 60 * 5,
	});
};

export const useStockOverview = (name: string) => {
	return useQuery({
		queryKey: ['stockOverview', name],
		queryFn: () => fetchStockOverview({ name }),
		enabled: !!name,
		staleTime: 1000 * 60 * 5,
	});
};

export const useDividendYieldStock = (symbol: string) => {
	return useQuery({
		queryKey: ["dividend-yield", symbol],
		queryFn: async () => {
			const res = await fetch(`/api/stock-dividend-yield?symbol=${symbol}`);
			const data = await res.json();
			return data;
		},
		enabled: !!symbol,
	});
};