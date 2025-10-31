import { useQuery } from "@tanstack/react-query";

export const useGetNumberTrackedAboutStableCoins = () => {
    return useQuery({
        queryKey: ['stablecoins-number-tracked'],
        queryFn: async () => {
            const res = await fetch('/api/stablecoins/number-tracked');
            if (!res.ok) throw new Error('Failed to fetch number tracked stablecoins');
            return res.json();
        },
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};