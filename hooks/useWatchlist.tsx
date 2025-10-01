import { upsertHoldingsApi } from '@/apis';
import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

type UpsertVars = { userId: string; assetId: string; holdings: number };

export const useWatchlistStatus = (params: {
	userId?: string;
	code: string;
	assetType: string;
	enabled?: boolean;
}) => {
	const { userId, code, assetType, enabled = true } = params;
	const qc = useQueryClient();

	return useQuery({
		enabled: !!userId && !!code && !!assetType && enabled,
		queryKey: ['watchlist-status', userId, code, assetType],
		queryFn: async () => {
			// ✅ Ưu tiên dùng API check status
			const res = await fetch(
				`https://data-api.agentos.cloud/noodle/watchlist/status?userId=${userId}&code=${code}&assetType=${assetType}`,
			);
			if (res.ok) {
				const data = await res.json();
				// Kỳ vọng { inWatchlist: boolean }
				return { inWatchlist: !!data?.inWatchlist };
			}

			// 🔁 Fallback: nếu có cache list thì tính tại client
			const list = qc.getQueryData<any[]>(['watchlist', userId]) || [];
			const inWatchlist = list.some(
				(i) => i.code === code && i.assetType === assetType
			);
			return { inWatchlist };
		},
		select: (d) => !!d?.inWatchlist,
		staleTime: 15_000,
	});
};

export const useGetWatchlist = (userId: string, assetType: string, page: number, enabled = true) => {
	return useQuery({
		queryKey: ['watchlist', userId, assetType, page],
		queryFn: async () => {
			const res = await fetch(`https://data-api.agentos.cloud/noodle/watchlist?userId=${userId}&assetType=${encodeURIComponent(assetType)}&page=${page}`);
			if (!res.ok) throw new Error('Failed to fetch watchlist');
			return res.json(); // { data: { items: [...] } | [...] } tuỳ bạn
		},
		enabled: !!userId && enabled,
		staleTime: 30_000,             // tuỳ chọn
		gcTime: 5 * 60_000,            // tuỳ chọn
		refetchOnWindowFocus: false,   // tránh refetch gây nháy
		refetchOnMount: false,         // nếu đã có cache
	});
};

export const useAddToWatchlist = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: { userId: string; code: string; assetType: string }) => {
			const res = await fetch(`https://data-api.agentos.cloud/noodle/watchlist/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (!res.ok) throw new Error('Failed to add to watchlist');
			return res.json();
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['watchlist', variables.userId] });
		},
	});
};

export const useRemoveFromWatchlist = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: { userId: string; code: string }) => {
			const res = await fetch(`https://data-api.agentos.cloud/noodle/watchlist/remove`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			if (!res.ok) throw new Error('Failed to remove from watchlist');
			return res.json();
		},

		// 1) Optimistic update
		onMutate: async ({ userId, code }) => {
			await queryClient.cancelQueries({ queryKey: ['watchlist', userId] });

			const prev = queryClient.getQueryData<any>(['watchlist', userId]);

			queryClient.setQueryData(['watchlist', userId], (old: any) => {
				if (!old?.data?.items) return old;
				return {
					...old,
					data: {
						...old.data,
						items: old.data.items.filter((x: any) => String(x.assetId ?? x.id) !== String(code)),
					},
				};
			});

			return { prev };
		},

		// 2) Rollback nếu lỗi
		onError: (_err, { userId }, ctx) => {
			if (ctx?.prev) queryClient.setQueryData(['watchlist', userId], ctx.prev);
		},

		// 3) KHÔNG invalidate để tránh refetch lần nữa
		onSettled: (_data, _err, variables, ctx) => {
			queryClient.invalidateQueries({ queryKey: ['watchlist', variables.userId], refetchType: 'active' });
		},
	});
};

export const useCandidateTokens = (userId: string, search: string) => {
	return useInfiniteQuery({
		queryKey: ['watchlist-candidates', userId, search],
		queryFn: async ({ pageParam = 1 }) => {
			const url = new URL('https://data-api.agentos.cloud/noodle/watchlist/candidates');
			url.searchParams.set('userId', userId);
			if (search) url.searchParams.set('q', search);
			// nếu BE nhận 'page'
			url.searchParams.set('page', String(pageParam));
			// nếu BE nhận 'cursor' thì đổi dòng trên thành:
			// url.searchParams.set('cursor', String(pageParam));

			const res = await fetch(url.toString());
			if (!res.ok) throw new Error('Failed to load candidates');
			return res.json();
		},
		// last = response của 1 page
		getNextPageParam: (last) => {
			const d = last?.data;
			if (!d) return undefined;
			const hasMore = d.page * d.limit < d.total;
			return hasMore ? d.page + 1 : undefined;
		},
		enabled: !!userId,
		initialPageParam: 1,
	});
};

export const useAddBulkToWatchlist = () => {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: async (payload: { userId: string; codes: string[], assetType: string }) => {
			const res = await fetch('https://data-api.agentos.cloud/noodle/watchlist/add-bulk', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})
			if (!res.ok) throw new Error('Failed to add')
			return res.json()
		},
		onSuccess: (_data, vars) => {
			// refresh danh sách watchlist bên ngoài
			qc.invalidateQueries({ queryKey: ['watchlist', vars.userId] })
		},
	})
}

export function useUpsertHoldings(userId: string | undefined) {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (vars: UpsertVars) => upsertHoldingsApi(vars),
		onMutate: async ({ assetId, holdings }) => {
			if (!userId) return;
			const qk = ['watchlist', userId];

			// cancel queries để tránh ghi đè
			await qc.cancelQueries({ queryKey: qk });
			const previous = qc.getQueryData<any>(qk);

			// optimistic update: set holdings cho item tương ứng
			qc.setQueryData(qk, (old: any) => {
				if (!old?.data?.items) return old;
				const items = old.data.items.map((it: any) =>
					String(it.assetId ?? it.id) === String(assetId)
						? { ...it, holdings }
						: it
				);
				return { ...old, data: { ...old.data, items } };
			});

			return { previous, qk };
		},
		onSuccess: () => {
			toast.success("Holdings updated successfully");
		},
		onError: (_err, _vars, ctx) => {
			if (ctx?.previous) {
				// rollback nếu lỗi
				qc.setQueryData(ctx.qk!, ctx.previous);
			}
			toast.error("Failed to update holdings");
		},
		onSettled: () => {
			if (!userId) return;
			qc.invalidateQueries({ queryKey: ['watchlist', userId] });
		},
	});
}