import { useQuery } from "@tanstack/react-query";

export const useGetNumberTrackedAboutStocks = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['stocks-number-tracked'],
        queryFn: async () => {
            const url = `/api/stocks/number-tracked`;

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