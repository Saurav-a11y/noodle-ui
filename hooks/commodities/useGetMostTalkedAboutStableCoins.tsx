import { useQuery } from "@tanstack/react-query";

export const useGetMostTalkedAboutCommodities = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['most-talked-about-commodities'],
        queryFn: async () => {
            const url = `/api/commodities/most-talked`;

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