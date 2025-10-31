// app/api/stablecoins/number-tracked/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(
            'https://data-api.agentos.cloud/noodle/stablecoins-number-tracked',
            { cache: 'no-store' }
        );

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (err: any) {
        console.error('Proxy Error:', err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}