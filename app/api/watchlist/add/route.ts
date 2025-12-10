import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, code, assetType } = body || {};

        if (!userId || !code || !assetType) {
            return NextResponse.json(
                { message: "Missing fields" },
                { status: 400 }
            );
        }

        const backendUrl =
            "https://data-api.agentos.cloud/noodle/watchlist/add";

        const res = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, code, assetType }),
        });

        if (!res.ok) {
            throw new Error("Backend add watchlist failed");
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