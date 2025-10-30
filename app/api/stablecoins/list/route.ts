import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = "https://data-api.agentos.cloud/noodle"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const q = searchParams.get("q") || ""
    const limit = searchParams.get("limit") || "20"
    const page = searchParams.get("page") || "1"

    const url = `${BACKEND_URL}/stablecoins?q=${q}&limit=${limit}&page=${page}`

    const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    })

    if (!res.ok) {
        return NextResponse.json(
            { message: "Failed to fetch stablecoins" },
            { status: res.status }
        )
    }

    const data = await res.json()
    return NextResponse.json(data)
}