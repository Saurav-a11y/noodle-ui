// hooks/useYields.ts
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export type YieldRow = {
    project: string | null;
    chain: string | null;
    apy: number;       // %
    tvlUsd: number;    // USD
    pool: string | null;
};

export type YieldsResponse = {
    data: {
        items: YieldRow[];
        page: number;
        limit: number;
        total: number;
    };
};

type Options = {
    page?: number;
    limit?: number;
    minTvlUsd?: number;
    enabled?: boolean;   // react-query flag
    signal?: AbortSignal;
};

export function useYields(
    symbol: string | undefined,
    opts: Options = {}
) {
    const { page = 1, limit = 10, minTvlUsd = 0 } = opts;

    return useQuery({
        queryKey: ['yields', symbol, page, limit, minTvlUsd],
        queryFn: async ({ signal }) => {
            if (!symbol) return [];

            const params = new URLSearchParams({
                page: String(page),
                limit: String(limit),
                minTvlUsd: String(minTvlUsd),
            });

            const res = await fetch(
                `/api/yields/${encodeURIComponent(symbol)}?${params.toString()}`,
                { signal }
            );

            if (!res.ok) {
                const text = await res.text().catch(() => '');
                throw new Error(
                    `Fetch yields failed (${res.status}): ${text || res.statusText}`
                );
            }

            const json = (await res.json()) as YieldsResponse;
            return json.data;
        },
        enabled: !!symbol,
        placeholderData: keepPreviousData,
        staleTime: 60 * 1000, // 1 phút – yields thay đổi khá nhanh
        refetchOnWindowFocus: false,
    });
}