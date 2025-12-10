import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body) {
            return NextResponse.json(
                { message: 'Missing payload' },
                { status: 400 }
            );
        }

        const backendUrl = `https://data-api.agentos.cloud/noodle/user_activity_logs`;

        const res = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            cache: 'no-store', // ✅ mutation → không cache
        });

        if (!res.ok) {
            throw new Error('Backend failed to add activity log');
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