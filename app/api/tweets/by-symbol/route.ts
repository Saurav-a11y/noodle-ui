import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const symbol = searchParams.get('symbol');

        if (!symbol) {
            return NextResponse.json(
                { message: 'Missing symbol' },
                { status: 400 }
            );
        }

        // Proxy toàn bộ query params sang backend
        const backendUrl =
            `https://data-api.agentos.cloud/api/v3/x-interaction/noodle/tweets/by-symbol?${searchParams.toString()}`;

        const res = await fetch(backendUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // ✅ social data theo thời gian → không cache server
        });

        if (!res.ok) {
            throw new Error('Backend failed to fetch list tweets');
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