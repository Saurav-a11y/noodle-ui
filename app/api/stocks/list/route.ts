import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/config";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "10";
    const page = searchParams.get("page") || "1";
    const groupFilter = searchParams.get("groupFilter") || "";
    const search = searchParams.get("search") || "";

    const res = await fetch(
        `${API_BASE_URL}/stocks?limit=${limit}&page=${page}&groupFilter=${groupFilter}&search=${search}`,
        {
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch stocks" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}