import { useQuery } from "@tanstack/react-query";

export const useGetNumberTrackedAboutStocks = () => {
    return useQuery({
        queryKey: ['stocks-number-tracked'],
        queryFn: async () => {
            const res = await fetch('/api/stocks/number-tracked');
            if (!res.ok) throw new Error('Failed to fetch number tracked stocks');
            return res.json();
        },
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};