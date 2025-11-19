import { useQuery } from "@tanstack/react-query";

const API = process.env.NEXT_PUBLIC_API_URL;

export const useGetTopGrowthStocks = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ["top-growth-stocks"],
        queryFn: async () => {
            if (!API) throw new Error("NEXT_PUBLIC_API_URL is missing");

            const url = `${API}/top-growth-stocks`;

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
        staleTime: 1000 * 30,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: options?.enabled ?? true,
    });
};