// app/auth/success/handler.tsx
'use client';

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthSuccessHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!searchParams) {
            router.push('/auth/failed'); // fallback nếu searchParams is null
            return;
        }

        const userParam = searchParams.get('user');
        const token = searchParams.get('token');

        if (!userParam || !token) {
            router.push('/auth/failed'); // fallback nếu thiếu param
            return;
        }

        try {
            // Giải mã user
            const user = JSON.parse(decodeURIComponent(userParam));

            // Lưu vào cookie hoặc localStorage
            Cookies.set('access_token', token, { expires: 7 }); // 7 ngày
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect về trang trước đó nếu có lưu
            const redirectTo = localStorage.getItem('redirectAfterLogin') || '/homepage';
            localStorage.removeItem('redirectAfterLogin');

            router.push(redirectTo);
        } catch (error) {
            console.error('Invalid user data:', error);
            router.push('/auth/failed');
        }
    }, []);

    return <p>Redirecting...</p>;
}