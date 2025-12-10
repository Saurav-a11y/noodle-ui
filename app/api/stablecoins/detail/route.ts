import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const communityId = searchParams.get('communityId');

        if (!communityId) {
            return NextResponse.json(
                { message: 'Missing communityId' },
                { status: 400 }
            );
        }

        const backendUrl = `https://data-api.agentos.cloud/noodle/community-overview?communityId=${encodeURIComponent(
            communityId
        )}`;

        const res = await fetch(backendUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Backend failed to fetch community overview');
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