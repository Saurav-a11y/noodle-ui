export const useResetPassword = () => {
    const resetPassword = async (
        email: string,
        newPassword: string
    ) => {
        const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newPassword }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.error || 'Reset password failed');
        }

        return data;
    };

    return { resetPassword };
};