import { useQuery } from "@tanstack/react-query";
import { CLIENT_API_URL } from "@/lib/config";

export const useGetTotalActiveUserStableCoins = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['active-users-stablecoins'],
        queryFn: async () => {
            const url = `${CLIENT_API_URL}/active-users-stablecoins`;

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