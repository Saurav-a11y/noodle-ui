import { useQuery } from "@tanstack/react-query";

export const useGetMostTalkedAboutStocks = () => {
    return useQuery({
        queryKey: ['most-talked-about-stocks'],
        queryFn: async () => {
            const res = await fetch('/api/stocks/most-talked');
            if (!res.ok) throw new Error('Failed to fetch most talked about stocks');
            return res.json();
        },
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};