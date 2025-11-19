import { useQuery } from "@tanstack/react-query";

export const useGetMostTalkedAboutStableCoins = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['most-talked-about-stablecoins'],
        queryFn: async () => {
            const res = await fetch('/api/stablecoins/most-talked');
            if (!res.ok) throw new Error('Failed to fetch most talked about stablecoins');
            return res.json();
        },
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: options?.enabled ?? true,
    });
};