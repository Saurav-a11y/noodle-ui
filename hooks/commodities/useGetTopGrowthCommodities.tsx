import { useQuery } from "@tanstack/react-query";

export const useGetTopGrowthCommodities = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ["top-growth-commodities"],
        queryFn: async () => {
            const res = await fetch(`/api/commodities/top-growth`);
            if (!res.ok) throw new Error("Failed to fetch Top Growth Commodities");
            return res.json();
        },
        staleTime: 1000 * 30,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: options?.enabled ?? true,
    });
};