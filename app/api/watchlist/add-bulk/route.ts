import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, codes, assetType } = body || {};

        if (!userId || !Array.isArray(codes) || !codes.length || !assetType) {
            return NextResponse.json(
                { message: "Invalid payload" },
                { status: 400 }
            );
        }

        const backendUrl =
            "https://data-api.agentos.cloud/noodle/watchlist/add-bulk";

        const res = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
            body: JSON.stringify({ userId, codes, assetType }),
        });

        if (!res.ok) {
            throw new Error("Backend add-bulk watchlist failed");
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