// src/app/api/user/profile/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const token = req.headers.get('authorization');

        const response = await fetch(
            'https://data-api.agentos.cloud/noodle/profile',
            {
                headers: {
                    Authorization: token || '',
                },
                cache: 'no-store',
            }
        );

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}