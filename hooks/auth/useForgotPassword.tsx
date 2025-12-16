export const useForgotPassword = () => {
    const forgotPassword = async (email: string) => {
        const res = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.error || 'Email not found');
        }

        return data;
    };

    return { forgotPassword };
};