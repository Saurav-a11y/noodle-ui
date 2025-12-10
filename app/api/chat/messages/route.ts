import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const userId = searchParams.get('userId');
        const symbol = searchParams.get('symbol');
        const limit = searchParams.get('limit') || '20';
        const before = searchParams.get('before');

        if (!userId || !symbol) {
            return NextResponse.json(
                { message: 'Missing userId or symbol' },
                { status: 400 }
            );
        }

        const backendParams = new URLSearchParams({
            userId,
            symbol,
            limit,
            ...(before && { before }),
        });

        const backendUrl =
            `https://data-api.agentos.cloud/noodle/get-messages?${backendParams.toString()}`;

        const res = await fetch(backendUrl, {
            cache: 'no-store', // ✅ chat messages → không cache
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