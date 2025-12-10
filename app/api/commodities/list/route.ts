import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "10";
    const page = searchParams.get("page") || "1";
    const groupFilter = searchParams.get("groupFilter") || "";

    const res = await fetch(
        `http://noodle-api:5130/noodle/commodities?limit=${limit}&page=${page}&groupFilter=${groupFilter}`,
        {
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch commodities ranks" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}