import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const url = `http://localhost:5130/noodle/active-users-stablecoins`;
        console.log("Requesting:", url);

        const response = await fetch(url, { cache: 'no-store' });
        console.log("Status from backend:", response.status);

        const text = await response.text();
        console.log("RAW RESPONSE:", text);

        try {
            const data = JSON.parse(text);
            return NextResponse.json(data, { status: response.status });
        } catch (err) {
            console.log("JSON PARSE ERROR:", err);
            return NextResponse.json({ error: "Invalid JSON" }, { status: 500 });
        }

    } catch (err: any) {
        console.error("Proxy Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}