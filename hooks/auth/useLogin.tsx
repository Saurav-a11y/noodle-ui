// src/hooks/auth/useLogin.ts
export const useLogin = () => {
    const login = async (email: string, password: string) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.error || 'Login failed');
        }

        if (data?.data?.token) {
            localStorage.setItem('token', data.data.token);
        }

        return data;
    };

    return { login };
};