import { useQuery } from "@tanstack/react-query";

export const useGetTotalActiveUserStocks = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['active-users-stocks'],
        queryFn: async () => {
            const url = `/api/stocks/active-users`;

            const res = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(`Failed: ${res.status} - ${err}`);
            }

            return res.json();
        },
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: options?.enabled ?? true,
    });
};