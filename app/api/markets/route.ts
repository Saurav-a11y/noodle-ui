import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const symbol = searchParams.get('symbol');
        const page = searchParams.get('page') || '1';
        const limit = searchParams.get('limit') || '10';

        if (!symbol) {
            return NextResponse.json(
                { message: 'Missing symbol' },
                { status: 400 }
            );
        }

        const backendUrl =
            `https://data-api.agentos.cloud/noodle/markets?symbol=${encodeURIComponent(
                symbol
            )}&page=${page}&limit=${limit}`;

        const res = await fetch(backendUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // ✅ market data theo user/filter
        });

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            return NextResponse.json(
                { message: text || res.statusText },
                { status: res.status }
            );
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