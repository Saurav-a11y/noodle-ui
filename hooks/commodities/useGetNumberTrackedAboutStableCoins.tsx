import { useQuery } from "@tanstack/react-query";

export const useGetNumberTrackedAboutCommodities = () => {
    return useQuery({
        queryKey: ['commodities-number-tracked'],
        queryFn: async () => {
            const res = await fetch('/api/commodities/number-tracked');
            if (!res.ok) throw new Error('Failed to fetch number tracked commodities');
            return res.json();
        },
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};