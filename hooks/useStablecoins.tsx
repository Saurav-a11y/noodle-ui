import { useQuery } from '@tanstack/react-query';
import { CLIENT_API_URL } from '@/lib/config';

export const useGetStableCoins = ({
	q,
	limit,
	page,
	enabled = true,
}: { q?: string; limit?: number; page?: number; enabled?: boolean }) => {
	return useQuery({
		queryKey: ['stablecoins', q, limit, page],
		queryFn: async () => {
			const params = new URLSearchParams();
			if (q) params.append('q', q);
			if (limit) params.append('limit', limit.toString());
			if (page) params.append('page', page.toString());

			const url = `${CLIENT_API_URL}/stablecoins?${params.toString()}`;
			const res = await fetch(url);
			if (!res.ok) throw new Error('Failed to fetch stablecoins');
			return res.json();
		},
		enabled: enabled,
		staleTime: 30_000,
		gcTime: 5 * 60_000,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
};

export const useGetTopGrowthStableCoins = () => {
	return useQuery({
		queryKey: ['top-growth-stablecoins'],
		queryFn: async () => {
			const url = `${CLIENT_API_URL}/top-growth-stablecoins`;
			const res = await fetch(url);
			if (!res.ok) throw new Error('Failed to fetch top growth stablecoins');
			return res.json();
		},
		staleTime: 30_000,
		gcTime: 5 * 60_000,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
};

export const useGetMostTalkedAboutStableCoins = () => {
	return useQuery({
		queryKey: ['most-talked-about-stablecoins'],
		queryFn: async () => {
			const url = `${CLIENT_API_URL}/most-talked-about-stablecoins`;
			const res = await fetch(url);
			if (!res.ok) throw new Error('Failed to fetch most talked about stablecoins');
			return res.json();
		},
		staleTime: 30_000,
		gcTime: 5 * 60_000,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
};

export const useGetNumberTrackedAboutStableCoins = () => {
	return useQuery({
		queryKey: ['stablecoins-number-tracked'],
		queryFn: async () => {
			const url = `${CLIENT_API_URL}/stablecoins-number-tracked`;
			const res = await fetch(url);
			if (!res.ok) throw new Error('Failed to fetch number tracked of stablecoins');
			return res.json();
		},
		staleTime: 30_000,
		gcTime: 5 * 60_000,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
};

export const useGetTotalActiveUserStableCoins = () => {
	return useQuery({
		queryKey: ['active-users-stablecoins'],
		queryFn: async () => {
			const url = `${CLIENT_API_URL}/active-users-stablecoins`;
			const res = await fetch(url);
			if (!res.ok) throw new Error('Failed to fetch active users stablecoins');
			return res.json();
		},
		staleTime: 30_000,
		gcTime: 5 * 60_000,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
};