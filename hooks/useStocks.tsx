import { fetchStockOverview, fetchStocksHealthRanks, fetchTopGrowthStocks } from "@/apis";
import { useQuery } from "@tanstack/react-query";

const FINNHUB_API_KEY = "d30kqghr01qnmrsevdugd30kqghr01qnmrsevdv0";

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