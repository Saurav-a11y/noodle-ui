// app/api/dividend-yield/route.ts
import { NextRequest, NextResponse } from "next/server";

const FINNHUB_API_KEY = "d30kqghr01qnmrsevdugd30kqghr01qnmrsevdv0";

export async function GET(req: NextRequest) {
	const symbol = req.nextUrl.searchParams.get("symbol");

	if (!symbol) {
		return NextResponse.json({ error: "Missing symbol" }, { status: 400 });
	}

	const headers = {
		"X-Finnhub-Token": FINNHUB_API_KEY,
	};

	try {
		// 1. Quote
		const quoteRes = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}?token=${FINNHUB_API_KEY}`, {
			headers,
		});
		const quoteData = await quoteRes.json();
		const currentPrice = quoteData?.c;

		// 2. Dividend
		const dividendRes = await fetch(
			`https://finnhub.io/api/v1/stock/dividend?symbol=${symbol}&from=2023-01-01&to=2025-12-31?token=${FINNHUB_API_KEY}`,
			{ headers }
		);
		const dividendData = await dividendRes.json();
		const totalDividend = dividendData.reduce(
			(sum: number, item: any) => sum + (item?.amount || 0),
			0
		);

		const yieldPercent = currentPrice
			? ((totalDividend / currentPrice) * 100).toFixed(2)
			: "0.00";

		return NextResponse.json({
			symbol,
			currentPrice,
			totalDividend,
			yield: yieldPercent + "%",
		});
	} catch (error) {
		console.log("🚀 ~ GET ~ error:", error)
		return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
	}
}