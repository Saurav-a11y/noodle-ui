import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const userId = searchParams.get("userId");
        const code = searchParams.get("code");
        const assetType = searchParams.get("assetType");

        if (!userId || !code || !assetType) {
            return NextResponse.json(
                { message: "Missing params" },
                { status: 400 }
            );
        }

        const backendUrl = `https://data-api.agentos.cloud/noodle/watchlist/status?userId=${userId}&code=${code}&assetType=${assetType}`;

        const res = await fetch(backendUrl, {
            headers: { "Content-Type": "application/json" },
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch watchlist status");
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