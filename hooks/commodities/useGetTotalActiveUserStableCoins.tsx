import { useQuery } from "@tanstack/react-query";

export const useGetTotalActiveUserCommodities = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['active-users-commodities'],
        queryFn: async () => {
            const res = await fetch('/api/commodities/active-users');
            if (!res.ok) throw new Error('Failed to fetch active users commodities');
            return res.json();
        },
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: options?.enabled ?? true,
    });
};