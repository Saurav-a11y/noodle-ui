import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const name_slug = searchParams.get('name_slug');

        if (!name_slug) {
            return NextResponse.json(
                { message: 'Missing name_slug' },
                { status: 400 }
            );
        }

        const backendUrl = `https://data-api.agentos.cloud/noodle/commodities-overview?name_slug=${encodeURIComponent(
            name_slug
        )}`;

        const res = await fetch(backendUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // ✅ commodity overview theo param → không cache server
        });

        if (!res.ok) {
            throw new Error('Backend failed to fetch commodity overview');
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