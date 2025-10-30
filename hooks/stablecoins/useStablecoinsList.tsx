import { useQuery } from "@tanstack/react-query"

export const useGetStableCoinsList = ({
    q,
    limit,
    page,
    enabled = true,
}: { q?: string; limit?: number; page?: number; enabled?: boolean }) => {
    return useQuery({
        queryKey: ['stablecoins', q, limit, page],
        queryFn: async () => {
            const url = `/api/stablecoins/list?q=${q}&limit=${limit}&page=${page}`
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch stablecoins');
            return res.json();
        },
        enabled: enabled,
        staleTime: 1000 * 30,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};