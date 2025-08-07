import { Suspense } from 'react';
import AuthFailedHandler from './handler';

export default function AuthFailedPage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <AuthFailedHandler />
        </Suspense>
    );
}