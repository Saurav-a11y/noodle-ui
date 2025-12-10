import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const userId = searchParams.get('userId');
        const username = searchParams.get('username');
        const assetType = searchParams.get('assetType');
        const symbol = searchParams.get('symbol');

        if (!userId || !username || !assetType || !symbol) {
            return NextResponse.json(
                { message: 'Missing required params' },
                { status: 400 }
            );
        }

        const backendParams = new URLSearchParams({
            userId,
            username,
            assetType,
            symbol,
        });

        const backendUrl =
            `https://data-api.agentos.cloud/noodle/say-hello?${backendParams.toString()}`;

        const res = await fetch(backendUrl, {
            cache: 'no-store', // ✅ chat / greeting → không cache
        });

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            return new NextResponse(text || 'Say hello failed', {
                status: res.status,
            });
        }

        const text = await res.text();
        return new NextResponse(text, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}