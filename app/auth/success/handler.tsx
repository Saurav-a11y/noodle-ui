// app/auth/success/handler.tsx
'use client';

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthSuccessHandler() {
    const router = useRouter();
    const sp = useSearchParams();

    useEffect(() => {
        const token = sp?.get('token');
        const userParam = sp?.get('user');
        if (!token || !userParam) {
            router.replace('/auth-failed'); return;
        }
        try {
            const user = JSON.parse(decodeURIComponent(userParam));
            Cookies.set("auth_token", token);
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user', JSON.stringify(user));
            const back = localStorage.getItem('redirectAfterLogin') || '/';
            localStorage.removeItem('redirectAfterLogin');
            router.replace(back);
        } catch {
            router.replace('/auth-failed');
        }
    }, [sp, router]);

    return <p>Signing you in…</p>;
}