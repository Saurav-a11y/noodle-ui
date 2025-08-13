import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
	const [userId, setUserId] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	const handleLogin = async () => {
		try {
			setLoading(true);
			localStorage.setItem("redirectAfterLogin", window.location.pathname);
			const res = await fetch(`https://data-api.agentos.cloud/api/v2/auth/twitter`);
			const data = await res.json();
			window.location.href = data.url;
		} catch (error) {
			console.error("Login error:", error);
			setLoading(false);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("userId");
		setUserId(null);
	};

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if (userId) {
			try {
				setUserId(JSON.parse(userId));
			} catch (error) {
				console.error("Failed to parse user data:", error);
			}
		}
		setLoading(false);
	}, []);

	return {
		userId,
		loading,
		handleLogin,
		handleLogout,
	};
};

export function useMe(opts?: { enabled?: boolean }) {
	return useQuery({
		queryKey: ['me'],
		enabled: opts?.enabled ?? true,
		retry: false,
		refetchOnWindowFocus: false,
		queryFn: async () => {
			const res = await fetch('https://data-api.agentos.cloud/api/v2/auth/me', {
				credentials: 'include' // ✅ gửi cookie token
			});
			console.log("🚀 ~ queryFn: ~ res:", res)
			if (res.status === 401) return null;
			if (!res.ok) throw new Error('Failed to fetch /me');
			return res.json();
		},
	});
}

export const useTwitterLogin = () => {
	const login = () => {
		localStorage.setItem('redirectAfterLogin', window.location.pathname + window.location.search);
		window.location.href = 'https://data-api.agentos.cloud/api/v2/auth/twitter-v2';
	};
	return { login };
};

export const useLogout = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			await fetch('https://data-api.agentos.cloud/api/v2/auth/logout', {
				method: 'POST',
			});
		},
		onSuccess: () => {
			qc.removeQueries({ queryKey: ['me'] });
		}
	});
};