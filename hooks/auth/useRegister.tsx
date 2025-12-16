export const useRegister = () => {
    const register = async (
        username: string,
        email: string,
        password: string
    ) => {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.error || 'Register failed');
        }

        return data;
    };

    return { register };
};