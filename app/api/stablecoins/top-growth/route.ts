import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/config";

export async function GET() {
	try {
		const backendUrl = `${API_BASE_URL}/top-growth-stablecoins`;

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