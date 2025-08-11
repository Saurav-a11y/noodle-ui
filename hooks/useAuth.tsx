import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState<any>(null);
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
        localStorage.removeItem("user");
        setUser(null);
    };

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error("Failed to parse user data:", error);
            }
        }
        setLoading(false);
    }, []);

    return {
        user,
        loading,
        handleLogin,
        handleLogout,
    };
};