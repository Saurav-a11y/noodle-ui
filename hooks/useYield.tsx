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

const API_BASE = 'https://data-api.agentos.cloud/noodle';

type Options = {
    page?: number;
    limit?: number;
    minTvlUsd?: number;
    enabled?: boolean;   // react-query flag
    signal?: AbortSignal;
};

async function fetchYields(symbol: string, { page = 1, limit = 10, minTvlUsd = 0, signal }: Options = {}) {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        minTvlUsd: String(minTvlUsd),
    });

    const res = await fetch(`${API_BASE}/yields/${encodeURIComponent(symbol)}?` + params.toString(), {
        method: 'GET',
        credentials: 'omit',
        signal,
    });

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Fetch yields failed (${res.status}): ${text || res.statusText}`);
    }

    const json = (await res.json()) as YieldsResponse;
    return json.data;
}

/** Hook: lấy danh sách yields cho 1 symbol, phân trang, lọc theo TVL tối thiểu */
export function useYields(symbol: string | undefined, opts: Options = {}) {
    const { page = 1, limit = 10, minTvlUsd = 0, enabled = true } = opts;

    return useQuery({
        queryKey: ['yields', symbol, page, limit, minTvlUsd],
        queryFn: ({ signal }) => fetchYields(symbol!, { page, limit, minTvlUsd, signal }),
        enabled: enabled && !!symbol,
        placeholderData: keepPreviousData,
    });
}