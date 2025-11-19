import { useQuery } from "@tanstack/react-query";

export const useGetTopGrowthStableCoins = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ["top-growth-stablecoins"],
        queryFn: async () => {
            const res = await fetch(`/api/stablecoins/top-growth`);
            if (!res.ok) throw new Error("Failed to fetch Top Growth Stablecoins");
            return res.json();
        },
        staleTime: 1000 * 30,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: options?.enabled ?? true,
    });
};