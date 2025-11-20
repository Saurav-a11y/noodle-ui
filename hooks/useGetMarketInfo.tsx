import { useQuery } from "@tanstack/react-query";

const API_BASE = 'https://data-api.agentos.cloud/noodle';

export const useMarketInfo = (symbol?: string, page = 1, limit = 10) => {
    return useQuery<any>({
        queryKey: ["market-info", symbol, page, limit],
        enabled: !!symbol, // chỉ gọi khi có symbol
        staleTime: 1000 * 60 * 5, // cache 5 phút
        queryFn: async () => {
            const res = await fetch(`${API_BASE}/markets?symbol=${symbol}&page=${page}&limit=${limit}`, {
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`API error: ${res.status} - ${text}`);
            }

            return res.json();
        },
    });
};