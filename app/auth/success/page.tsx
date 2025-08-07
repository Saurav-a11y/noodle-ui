// app/auth/success/page.tsx
import { Suspense } from 'react';
import AuthSuccessHandler from './handler';

export default function AuthSuccessPage() {
    return (
        <Suspense fallback={<p>Redirecting...</p>}>
            <AuthSuccessHandler />
        </Suspense>
    );
}