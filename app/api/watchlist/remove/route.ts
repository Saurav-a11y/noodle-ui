import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, code } = body || {};

        if (!userId || !code) {
            return NextResponse.json(
                { message: "Missing fields" },
                { status: 400 }
            );
        }

        const backendUrl =
            "https://data-api.agentos.cloud/noodle/watchlist/remove";

        const res = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            cache: 'no-store',
            body: JSON.stringify({ userId, code }),
        });

        if (!res.ok) {
            throw new Error("Backend remove watchlist failed");
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}