import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const messages = searchParams.get('messages');
        const assetType = searchParams.get('assetType');
        const userId = searchParams.get('userId');
        const symbol = searchParams.get('symbol');

        if (!messages || !assetType || !userId || !symbol) {
            return NextResponse.json(
                { message: 'Missing required params' },
                { status: 400 }
            );
        }

        const backendParams = new URLSearchParams({
            messages,
            assetType,
            userId,
            symbol,
        });

        const backendUrl =
            `https://data-api.agentos.cloud/noodle/chat-gpt-request?${backendParams.toString()}`;

        const res = await fetch(backendUrl, {
            // ⚠️ chat / AI → KHÔNG CACHE
            cache: 'no-store',
        });

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            return new NextResponse(text || 'Chat request failed', {
                status: res.status,
            });
        }

        // ✅ Trả text thẳng về client
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