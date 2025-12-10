import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, assetId, holdings } = body || {};

        if (!userId || !assetId || holdings == null) {
            return NextResponse.json(
                { message: "Invalid payload" },
                { status: 400 }
            );
        }

        const backendUrl =
            "https://data-api.agentos.cloud/noodle/watchlist/holdings";

        const res = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
            body: JSON.stringify({
                userId,
                assetId,
                holdings,
            }),
        });

        if (!res.ok) {
            throw new Error("Backend upsert holdings failed");
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