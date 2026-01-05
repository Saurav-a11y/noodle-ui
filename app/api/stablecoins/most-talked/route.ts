import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const API_BASE_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5130"
        const response = await fetch(
            `${API_BASE_URL}/noodle/most-talked-about-stablecoins`,
            { cache: 'no-store' }
        );

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (err: any) {
        console.error('Proxy Error:', err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}