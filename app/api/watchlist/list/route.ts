import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId") || "";
        const assetType = searchParams.get("assetType") || "all";
        const page = searchParams.get("page") || "1";

        // Build URL cho backend API
        const backendUrl = `https://data-api.agentos.cloud/noodle/watchlist?userId=${userId}&assetType=${encodeURIComponent(
            assetType
        )}&page=${page}`;

        const res = await fetch(backendUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch Watchlist");
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}