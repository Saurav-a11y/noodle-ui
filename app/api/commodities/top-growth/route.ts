import { NextResponse } from "next/server";

export async function GET() {
    try {
        const API_BASE_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5130"
        const backendUrl = `${API_BASE_URL}/noodle/top-growth-commodities`;

        const res = await fetch(backendUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { revalidate: 10 },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch Top Growth Commodities");
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