import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const symbol = searchParams.get('symbol');
        const platform = searchParams.get('platform');
        const page = searchParams.get('page');

        if (!symbol || !platform || !page) {
            return NextResponse.json(
                { message: 'Missing query params' },
                { status: 400 }
            );
        }

        const backendParams = new URLSearchParams({
            symbol,
            platform,
            page,
        });

        const backendUrl =
            `https://data-api.agentos.cloud/noodle/commodity-community-data-sources?${backendParams.toString()}`;

        const res = await fetch(backendUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error(
                'Backend failed to fetch Commodity Community Data Sources'
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