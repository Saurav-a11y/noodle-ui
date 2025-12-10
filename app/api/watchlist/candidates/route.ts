import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const userId = searchParams.get("userId");
        const page = searchParams.get("page") || "1";
        const type = searchParams.get("type") || "all";
        const q = searchParams.get("q") || "";

        if (!userId) {
            return NextResponse.json(
                { message: "Missing userId" },
                { status: 400 }
            );
        }

        const backendUrl = new URL(
            "https://data-api.agentos.cloud/noodle/watchlist/candidates"
        );

        backendUrl.searchParams.set("userId", userId);
        backendUrl.searchParams.set("page", page);
        backendUrl.searchParams.set("type", type);

        if (q) backendUrl.searchParams.set("q", q);

        const res = await fetch(backendUrl.toString(), {
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch watchlist candidates");
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