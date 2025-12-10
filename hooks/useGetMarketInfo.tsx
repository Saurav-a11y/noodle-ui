import { useQuery } from "@tanstack/react-query";

const API_BASE = 'https://data-api.agentos.cloud/noodle';

export const useMarketInfo = (
    symbol?: string,
    page = 1,
    limit = 10
) => {
    return useQuery<any>({
        queryKey: ['market-info', symbol, page, limit],
        enabled: !!symbol,
        staleTime: 1000 * 60 * 5, // 5 phút
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const params = new URLSearchParams({
                symbol: symbol!,
                page: String(page),
                limit: String(limit),
            });

            const res = await fetch(
                `/api/markets?${params.toString()}`
            );

            if (!res.ok) {
                const text = await res.text().catch(() => '');
                throw new Error(
                    `API error: ${res.status} - ${text || res.statusText}`
                );
            }

            return res.json();
        },
    });
};