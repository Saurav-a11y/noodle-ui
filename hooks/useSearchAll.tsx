import { useInfiniteQuery } from "@tanstack/react-query";

export const useSearchAll = (search: string, opts?: { enabled?: boolean }) => {
    return useInfiniteQuery({
        queryKey: ['search-all', search],
        enabled: !!search && (opts?.enabled ?? true),
        queryFn: async ({ pageParam = 1 }) => {
            const url = new URL('https://data-api.agentos.cloud/noodle/search-all');
            url.searchParams.set('q', search);
            url.searchParams.set('page', String(pageParam ?? 1));
            url.searchParams.set('limit', '20');

            const res = await fetch(url.toString());
            if (!res.ok) throw new Error('Fetch failed');
            return res.json();
        },
        getNextPageParam: (last) => {
            const { page, limit, totals } = last.data;
            console.log("🚀 ~ useSearchAll ~ total:", totals)
            const totalPages = Math.ceil((totals ?? 0) / (limit || 1));
            return page < totalPages ? page + 1 : undefined;
        },
        initialPageParam: 1,
    });
};