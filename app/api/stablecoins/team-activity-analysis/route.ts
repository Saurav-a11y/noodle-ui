import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const communityId = searchParams.get('communityId');
        const amount = searchParams.get('amount');
        const unit = searchParams.get('unit');

        if (!communityId) {
            return NextResponse.json(
                { message: 'Missing communityId' },
                { status: 400 }
            );
        }

        const backendParams = new URLSearchParams({
            communityId,
            ...(amount && { amount }),
            ...(unit && { unit }),
        });

        const backendUrl =
            `https://data-api.agentos.cloud/noodle/community-team-activity-analysis?${backendParams.toString()}`;

        const res = await fetch(backendUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // ✅ community analysis → không cache server
        });

        if (!res.ok) {
            throw new Error(
                'Backend failed to fetch Community Team Activity Analysis'
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