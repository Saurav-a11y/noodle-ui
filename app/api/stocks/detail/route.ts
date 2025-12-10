import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const name = searchParams.get('name');

        if (!name) {
            return NextResponse.json(
                { message: 'Missing stock name' },
                { status: 400 }
            );
        }

        const backendUrl = `https://data-api.agentos.cloud/noodle/stocks-overview?name=${encodeURIComponent(
            name
        )}`;

        const res = await fetch(backendUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Backend failed to fetch stock overview');
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