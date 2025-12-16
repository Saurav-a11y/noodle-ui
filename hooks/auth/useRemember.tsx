export const useRemember = () => {
    const remember = async () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const res = await fetch('/api/auth/remember', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok || data?.data?.valid === false) {
            localStorage.removeItem('token');
            return null;
        }

        return data;
    };

    return { remember };
};