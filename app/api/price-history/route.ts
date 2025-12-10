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
            `https://data-api.agentos.cloud/api/v2/crypto-token/price-history?${searchParams.toString()}`;

        const res = await fetch(backendUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Backend failed to fetch price history');
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