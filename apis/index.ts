export const BASE_URL = 'https://data-api.agentos.cloud/noodle';

export type CommunityHealthRankParams = {
	limit?: number;
	page?: number;
	category?: string;
	score_range?: string;
	size?: string;
	search?: string;
};

export type FetchPriceHistoryParams = {
	symbol: string;
	startTime?: number;
	endTime?: number;
	interval?: string;
	type?: string;
}

export type FetchListTweetParams = {
	symbol: string;
	timeRange?: string;
}

export const fetchTopGainingProject = async () => {
	const res = await fetch(`${BASE_URL}/top-gaining-project`);
	if (!res.ok) throw new Error('Failed to fetch top gaining projects');
	return res.json();
};

export const fetchMostTalkedProject = async () => {
	const res = await fetch(`${BASE_URL}/most-talked-about-project`);
	if (!res.ok) throw new Error('Failed to fetch most talked about projects');
	return res.json();
};

export const fetchOverviewStats = async () => {
	const res = await fetch(`${BASE_URL}/overview-stats`);
	if (!res.ok) throw new Error('Failed to fetch overview stats');
	return res.json();
};

export const fetchCommunityHealthRanks = async (params: CommunityHealthRankParams = {}) => {
	const query = new URLSearchParams();

	if (params.limit) query.append('limit', String(params.limit));
	if (params.page) query.append('page', String(params.page));
	if (params.category && params.category !== 'All') query.append('category', params.category);
	if (params.score_range && params.score_range !== 'All') query.append('score_range', params.score_range);
	if (params.size && params.size !== 'All') query.append('size', params.size);
	if (params.search) query.append('search', String(params.search));

	const url = `${BASE_URL}/community-health-ranks?${query.toString()}`;

	const res = await fetch(url);
	if (!res.ok) throw new Error('Failed to fetch community health ranks');
	return res.json();
};

export const fetchCommunityOverview = async ({ communityId }: { communityId: string }) => {
	const res = await fetch(`${BASE_URL}/community-overview?communityId=${encodeURIComponent(communityId)}`);
	if (!res.ok) throw new Error('Failed to fetch community overview');
	return res.json();
};

export const fetchCommunityTeamActivityAnalysis = async ({ communityId, amount, unit }: { communityId: string, amount?: number, unit?: string }) => {
	const query = new URLSearchParams({
		communityId,
		...(amount && { amount: String(amount) }),
		...(unit && { unit: String(unit) }),
	});

	const res = await fetch(`${BASE_URL}/community-team-activity-analysis?${query}`);

	if (!res.ok) throw new Error('Failed to fetch Community Team Activity Analysis');
	return res.json();
};

export const fetchCommunityDataSources = async ({ symbol, platform, page }: { symbol: string, platform: string, page: string }) => {
	const query = new URLSearchParams({ symbol, platform, page });

	const res = await fetch(`${BASE_URL}/community-data-sources?${query}`);

	if (!res.ok) throw new Error('Failed to fetch Community Data Sources');
	return res.json();
};

export const fetchPriceHistory = async ({
	symbol,
	startTime,
	endTime,
	interval,
	type
}: FetchPriceHistoryParams) => {
	const query = new URLSearchParams({
		symbol,
		...(startTime && { startTime: String(startTime) }),
		...(endTime && { endTime: String(endTime) }),
		...(interval && { interval }),
		...(type && { type }),
	});

	const res = await fetch(`https://data-api.agentos.cloud/api/v2/crypto-token/price-history?${query}`);

	if (!res.ok) throw new Error('Failed to fetch price history');
	return res.json();
};

export const fetchListTweets = async ({
	symbol,
	timeRange,
}: FetchListTweetParams) => {
	const query = new URLSearchParams({
		symbol,
		...(timeRange && { timeRange: String(timeRange) }),
	});

	const res = await fetch(`https://data-api.agentos.cloud/api/v3/x-interaction/tweets/by-symbol?${query}`);

	if (!res.ok) throw new Error('Failed to fetch list of tweets');
	return res.json();
};

// Commodities
export const fetchCommoditiesHealthRanks = async ({ limit, page, search, groupFilter }: { limit?: number, page?: number, search?: string, groupFilter?: string }) => {
	const query = new URLSearchParams();

	if (limit) query.append('limit', String(limit));
	if (page) query.append('page', String(page));
	if (search) query.append('search', String(search));
	if (groupFilter) query.append('groupFilter', String(groupFilter));

	const url = `${BASE_URL}/commodities-health-ranks?${query.toString()}`;

	const res = await fetch(url);
	if (!res.ok) throw new Error('Failed to fetch commodities health ranks');
	return res.json();
};

export const fetchTopGrowthCommodities = async () => {
	const res = await fetch(`${BASE_URL}/top-growth-commodities`);
	if (!res.ok) throw new Error('Failed to fetch top growth commodities');
	return res.json();
};

export const fetchCommodityCommunityDataSources = async ({ symbol, platform, page }: { symbol: string, platform: string, page: string }) => {
	const query = new URLSearchParams({ symbol, platform, page });

	const res = await fetch(`${BASE_URL}/commodity-community-data-sources?${query}`);

	if (!res.ok) throw new Error('Failed to fetch Community Data Sources');
	return res.json();
};

// Stocks
export const fetchStocksHealthRanks = async ({ limit, page, search, groupFilter }: { limit?: number, page?: number, search?: string, groupFilter?: string }) => {
	const query = new URLSearchParams();

	if (limit) query.append('limit', String(limit));
	if (page) query.append('page', String(page));
	if (search) query.append('search', String(search));
	if (groupFilter) query.append('groupFilter', String(groupFilter));

	const url = `${BASE_URL}/stock-health-ranks?${query.toString()}`;

	const res = await fetch(url);
	if (!res.ok) throw new Error('Failed to fetch commodities health ranks');
	return res.json();
};

export const fetchTopGrowthStocks = async () => {
	const res = await fetch(`${BASE_URL}/top-growth-stocks`);
	if (!res.ok) throw new Error('Failed to fetch top growth stocks');
	return res.json();
};

export const fetchMostTalkedAboutStocks = async () => {
	const res = await fetch(`${BASE_URL}/most-talked-about-stock`);
	if (!res.ok) throw new Error('Failed to fetch top growth stocks');
	return res.json();
};

export const fetchStockNumberTracked = async () => {
	const res = await fetch(`${BASE_URL}/stock-number-tracked`);
	if (!res.ok) throw new Error('Failed to fetch top growth stocks');
	return res.json();
};

export const fetchStockActiveUsers = async () => {
	const res = await fetch(`${BASE_URL}/stock-active-users`);
	if (!res.ok) throw new Error('Failed to fetch top growth stocks');
	return res.json();
};

export const fetchStockCommunityDataSources = async ({ symbol, platform, page }: { symbol: string, platform: string, page: string }) => {
	const query = new URLSearchParams({ symbol, platform, page });

	const res = await fetch(`${BASE_URL}/stock-community-data-sources?${query}`);

	if (!res.ok) throw new Error('Failed to fetch Community Data Sources');
	return res.json();
};

export const fetchStockCommunityTeamActivityAnalysis = async ({ communityId, amount, unit }: { communityId: string, amount?: number, unit?: string }) => {
	const query = new URLSearchParams({
		communityId,
		...(amount && { amount: String(amount) }),
		...(unit && { unit: String(unit) }),
	});

	const res = await fetch(`${BASE_URL}/stock-community-team-activity-analysis?${query}`);

	if (!res.ok) throw new Error('Failed to fetch Community Team Activity Analysis');
	return res.json();
};

// Chat with AI Agent
export const chatWithAgent = async ({
	messages,
	assetType
}: {
	messages: { ai: boolean; text: string }[];
	assetType: string;
}) => {
	const query = new URLSearchParams();
	query.append('messages', JSON.stringify(messages));
	query.append('assetType', JSON.stringify(assetType));

	const url = `${BASE_URL}/chat-gpt-request?${query.toString()}`;

	const res = await fetch(url);
	if (!res.ok) throw new Error('Failed to fetch chat from agent');
	return res.text();
};

export const sayHello = async () => {
	const url = `${BASE_URL}/say-hello`;

	const res = await fetch(url);
	if (!res.ok) throw new Error('Failed to fetch chat from agent');
	return res.text();
};

export const fetchCommodityOverview = async ({ name_slug }: { name_slug: string }) => {
	const res = await fetch(`${BASE_URL}/commodities-overview?name_slug=${encodeURIComponent(name_slug)}`);
	if (!res.ok) throw new Error('Failed to fetch community overview');
	return res.json();
};

export const fetchStockOverview = async ({ name }: { name: string }) => {
	const res = await fetch(`${BASE_URL}/stocks-overview?name=${encodeURIComponent(name)}`);
	if (!res.ok) throw new Error('Failed to fetch stocks overview');
	return res.json();
};

export const fetchMostTalkedAboutCommodities = async () => {
	const res = await fetch(`${BASE_URL}/most-talked-about-commodity`);
	if (!res.ok) throw new Error('Failed to fetch top growth commodities');
	return res.json();
};

export const fetchCommodityNumberTracked = async () => {
	const res = await fetch(`${BASE_URL}/commodity-number-tracked`);
	if (!res.ok) throw new Error('Failed to fetch top growth commodities');
	return res.json();
};

export const fetchCommodityActiveUsers = async () => {
	const res = await fetch(`${BASE_URL}/commodity-active-users`);
	if (!res.ok) throw new Error('Failed to fetch top growth commodities');
	return res.json();
};

export async function upsertHoldingsApi(input: {
	userId: string;
	assetId: string;
	holdings: number;
}) {
	const res = await fetch(`${BASE_URL}/watchlist/holdings`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(input),
	});
	if (!res.ok) {
		const text = await res.text().catch(() => '');
		throw new Error(text || 'Failed to upsert holdings');
	}
	return res.json(); // { ok: true, action: 'updated' | 'inserted', ... }
}
