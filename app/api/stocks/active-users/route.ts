import { NextResponse } from 'next/server';
import { API_BASE_URL } from "@/lib/config";

export async function GET() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/active-users-stock`,
            { cache: 'no-store' }
        );

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (err: any) {
        console.error('Proxy Error:', err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}