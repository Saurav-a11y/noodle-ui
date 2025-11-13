import { useQuery } from "@tanstack/react-query";

export const useGetTopGrowthStocks = () => {
    return useQuery({
        queryKey: ["top-growth-stocks"],
        queryFn: async () => {
            const res = await fetch(`/api/stocks/top-growth`);
            if (!res.ok) throw new Error("Failed to fetch Top Growth Stocks");
            return res.json();
        },
        staleTime: 1000 * 30,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};