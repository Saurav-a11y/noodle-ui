// app/api/chat-with-agent/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const messages = searchParams.get('messages');
        const assetType = searchParams.get('assetType');
        const userId = searchParams.get('userId') || ""
        const symbol = searchParams.get('symbol');

        if (!messages || !assetType || !symbol) {
            return NextResponse.json(
                { error: 'Missing required query params' },
                { status: 400 }
            );
        }

        const targetUrl = new URL(
            'https://data-api.agentos.cloud/noodle/chat-gpt-request'
        );

        targetUrl.searchParams.set('messages', messages);
        targetUrl.searchParams.set('assetType', assetType);
        targetUrl.searchParams.set('userId', userId);
        targetUrl.searchParams.set('symbol', symbol);

        const response = await fetch(targetUrl.toString(), {
            method: 'GET',
            cache: 'no-store',
        });

        const text = await response.text();
        return new NextResponse(text, {
            status: response.status,
            headers: { "Content-Type": "text/plain" }
        });
    } catch (err: any) {
        console.error('Proxy Chat Error:', err);
        return NextResponse.json(
            { error: err.message || 'Unexpected error' },
            { status: 500 }
        );
    }
}