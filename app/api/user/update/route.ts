import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const auth = req.headers.get("authorization");
        if (!auth) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const payload = await req.json();

        const res = await fetch(
            "https://data-api.agentos.cloud/noodle/user/update",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth,
                },
                body: JSON.stringify(payload),
            }
        );

        const text = await res.text();
        let json: any;

        try {
            json = JSON.parse(text);
        } catch {
            return NextResponse.json(
                { error: text },
                { status: res.status }
            );
        }

        return NextResponse.json(json, { status: res.status });
    } catch (err: any) {
        return NextResponse.json(
            { error: err?.message || "Update failed" },
            { status: 500 }
        );
    }
}