import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('authorization');

        if (!authHeader) {
            return NextResponse.json(null, { status: 401 });
        }

        const res = await fetch(
            'https://data-api.agentos.cloud/api/v2/auth/me',
            {
                method: 'GET',
                headers: {
                    Authorization: authHeader, // ✅ forward nguyên Bearer token
                },
                cache: 'no-store',
            }
        );

        if (res.status === 401) {
            return NextResponse.json(null, { status: 401 });
        }

        if (!res.ok) {
            throw new Error('Backend /me failed');
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}