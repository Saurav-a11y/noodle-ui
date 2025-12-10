import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const assetType = searchParams.get('assetType');
        const symbol = searchParams.get('symbol');
        const recentMessages = searchParams.get('recentMessages');

        if (!assetType || !symbol) {
            return NextResponse.json(
                { message: 'Missing assetType or symbol' },
                { status: 400 }
            );
        }

        const backendParams = new URLSearchParams({
            assetType,
            symbol,
            ...(recentMessages && { recentMessages }),
        });

        const backendUrl =
            `https://data-api.agentos.cloud/noodle/get-suggestions?${backendParams.toString()}`;

        const res = await fetch(backendUrl, {
            cache: 'no-store', // ✅ AI suggestions → backend không cache
        });

        if (!res.ok) {
            throw new Error('Backend failed to fetch AI suggestions');
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