import { useQuery } from "@tanstack/react-query";

export const useGetTotalActiveUserStableCoins = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['active-users-stablecoins'],
        queryFn: async () => {
            const res = await fetch('/api/stablecoins/active-users');
            if (!res.ok) throw new Error('Failed to fetch active users stablecoins');
            return res.json();
        },
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: options?.enabled ?? true,
    });
};