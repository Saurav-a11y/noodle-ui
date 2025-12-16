import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const response = await fetch(
            'https://data-api.agentos.cloud/noodle/auth/remember',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        );

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (err: any) {
        console.error('Remember Proxy Error:', err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}