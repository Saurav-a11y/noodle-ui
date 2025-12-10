import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
    req: Request,
    context: { params: Promise<{ symbol: string }> }
) {
    try {
        // ✅ BẮT BUỘC await
        const { symbol } = await context.params;
        const { searchParams } = new URL(req.url);

        if (!symbol) {
            return NextResponse.json(
                { message: 'Missing symbol' },
                { status: 400 }
            );
        }

        const backendUrl =
            `https://data-api.agentos.cloud/noodle/yields/${encodeURIComponent(
                symbol
            )}?${searchParams.toString()}`;

        const res = await fetch(backendUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            return NextResponse.json(
                { message: text || res.statusText },
                { status: res.status }
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