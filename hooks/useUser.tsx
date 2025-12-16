import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react';
import { toast } from 'react-toastify'
import { useProfile } from './auth/useProfile';

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
	console.log("🚀 ~ useGetUser ~ userId:", userId)
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

export const useUpdateUser = () => {
	const { refetch } = useProfile();
	return useMutation({
		mutationFn: async (payload: UpdateUserPayload) => {
			const token = localStorage.getItem("token");
			if (!token) throw new Error("Unauthorized");

			const res = await fetch("/api/user/update", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			const text = await res.text();
			let json: any;

			try {
				json = JSON.parse(text);
			} catch {
				throw new Error(text);
			}

			if (!res.ok) {
				throw new Error(json?.error || "Failed to update user");
			}

			return json;
		},
		onSuccess: () => {
			toast.success("Information updated successfully");

			// 🔁 refresh profile
			refetch();
		},
		onError: (err: any) => {
			toast.error(err?.message || "Update failed");
		},
	});
};