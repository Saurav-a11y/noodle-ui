import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const payload = await req.json();

        const res = await fetch(`http://localhost:5130/noodle/compare`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            return NextResponse.json(
                { error: err?.error || "Failed to compare assets" },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unexpected error";
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}