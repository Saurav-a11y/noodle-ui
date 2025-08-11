// app/auth/success/handler.tsx
'use client';

import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useMe } from '@/hooks/useAuth';

export default function AuthSuccessHandler() {
    const router = useRouter();
    const { data, isLoading } = useMe();

    useEffect(() => {
        if (!isLoading && data) {
            const dest = localStorage.getItem('redirectAfterLogin') || '/';
            localStorage.removeItem('redirectAfterLogin');
            router.replace(dest);
        }
    }, [isLoading, data, router]);

    return <p>Signing you in…</p>;
}