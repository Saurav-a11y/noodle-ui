import { useQuery } from "@tanstack/react-query";

export const useGetMostTalkedAboutCommodities = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['most-talked-about-commodities'],
        queryFn: async () => {
            const res = await fetch('/api/commodities/most-talked');
            if (!res.ok) throw new Error('Failed to fetch most talked about commodities');
            return res.json();
        },
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: options?.enabled ?? true,
    });
};