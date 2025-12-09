import { NextResponse } from "next/server";

export async function GET() {
	try {
		const backendUrl = `http://noodle-api:5130/noodle/top-growth-stablecoins`;

		const res = await fetch(backendUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			next: { revalidate: 10 },
		});

		if (!res.ok) {
			throw new Error("Failed to fetch Top Growth Stablecoins");
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