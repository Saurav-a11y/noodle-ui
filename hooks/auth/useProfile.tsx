// src/hooks/auth/useProfile.ts
import { useEffect, useState } from 'react';

export interface UserProfile {
    id: string;
    username: string;
    email: string;
    avatar?: string | null;
    biography?: string | null;
    birthday?: string | null;
    createdAt?: string;
}

export const useProfile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setProfile(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || 'Failed to fetch profile');
            }

            setProfile(data.data);
        } catch (err: any) {
            setError(err.message);
            setProfile(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return {
        profile,
        isLoading,
        error,
        refetch: fetchProfile,
    };
};