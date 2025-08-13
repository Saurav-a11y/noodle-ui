import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react';
import { toast } from 'react-toastify'

const API_BASE = 'https://data-api.agentos.cloud/noodle';

export type User = {
	id: string
	username?: string
	name?: string
	email?: string
	avatar?: string
	biography?: string
	birthday?: string
	createdAt?: string
	updatedAt?: string
}
type UpdateUserPayload = {
	avatar?: string
	biography?: string
	email?: string
	name?: string
	username?: string
	birthday?: string
}

export const useGetUser = ({ userId }) => {
	return useQuery({
		queryKey: ["user", userId],
		queryFn: async () => {
			if (!userId) throw new Error("User ID not found in localStorage");
			const res = await fetch(`${API_BASE}/user/${userId}`);
			if (!res.ok) throw new Error("Failed to fetch user data");
			return res.json();
		},
		enabled: !!userId,
	});
};

export const useUpdateUser = ({ userId }) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: UpdateUserPayload) => {
			if (!userId) throw new Error("User ID not found in localStorage");

			const res = await fetch(`${API_BASE}/users/update`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId, ...payload }),
			});

			if (!res.ok) throw new Error("Failed to update user");
			return res.json();
		},
		onSuccess: () => {
			toast.success("Cập nhật thông tin thành công");
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: () => {
			toast.error("Cập nhật thất bại");
		},
	});
};