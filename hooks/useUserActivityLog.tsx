import { BASE_URL } from '@/apis';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import qs from 'query-string';

export interface UserActivityLog {
	_id: string;
	userId: string;
	type: string;
	assetType: string;
	assetSymbol: string;
	assetName: string;
	assetLogo: string;
	searchQuery?: string;
	sortBy?: string;
	filterBy?: string;
	content: string;
	createdAt: string;
	activity?: string;
}

interface GetUserActivityLogsParams {
	userId: string;
	page?: number;
	limit?: number;
	time: number; // số ngày
	type?: string;
	assetType?: string;
	assetSymbol?: string;
}

interface AddUserActivityLogInput {
	userId: string;
	type: string;
	assetType: string;
	assetSymbol: string;
	assetName: string;
	assetLogo: string;
	content: string;
	searchQuery?: string;
	sortBy?: string;
	filterBy?: string;
	activity?: string;
}

export const useGetUserActivityLogs = (
	params: GetUserActivityLogsParams,
	enabled = true
) => {
	return useQuery({
		queryKey: ['user_activity_logs', params],
		queryFn: async (): Promise<{
			data: UserActivityLog[];
			metadata: {
				page: number;
				limit: number;
				total: number;
				totalPages: number;
			};
		}> => {
			const query = qs.stringify(params);

			const res = await fetch(`/api/user/activity-list?${query}`);

			if (!res.ok) {
				throw new Error('Failed to fetch activity logs');
			}

			return res.json();
		},
		enabled,
		staleTime: 30_000,          // logs không cần realtime
		refetchOnWindowFocus: false,
	});
};

export const useAddUserActivityLog = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: AddUserActivityLogInput) => {
			const res = await fetch('/api/user/activity-logs', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				throw new Error('Failed to add activity log');
			}

			return res.json();
		},

		onSuccess: () => {
			// invalidate list logs nếu có UI hiển thị
			queryClient.invalidateQueries({
				queryKey: ['user_activity_logs'],
			});
		},
	});
};

export const useDeleteUserActivityLog = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const res = await fetch(`${BASE_URL}/user_activity_logs/${id}`, {
				method: 'DELETE',
			});
			if (!res.ok) throw new Error('Failed to delete activity log');
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user_activity_logs'] });
		},
	});
};