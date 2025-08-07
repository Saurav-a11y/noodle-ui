'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const AuthFailedHandler = () => {
    const searchParams = useSearchParams();
    const reason = searchParams?.get('reason');

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="max-w-md text-center space-y-4">
                <h1 className="text-3xl font-bold text-yellow-400">⚠️ Login was cancelled</h1>
                {reason === 'access_denied' ? (
                    <p>You chose not to log in with X (Twitter). If this was a mistake, you can try again.</p>
                ) : (
                    <p>Something went wrong while trying to log in. Please try again later.</p>
                )}

                <div className="flex flex-col gap-3 items-center">
                    <Link
                        href="/"
                        className="inline-block bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition w-fit"
                    >
                        Back to home page
                    </Link>
                    <a
                        href="https://x.com/home"
                        className="inline-block text-blue-500 px-4 py-2 rounded hover:text-blue-600 transition text-sm"
                    >
                        Go to your X homepage
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AuthFailedHandler;