// import { CLIENT_API_URL } from "@/lib/config";

export const BASE_URL = "https://data-api.agentos.cloud/noodle";

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
};

export type FetchListTweetParams = {
  symbol: string;
  timeRange?: string;
};

export const fetchTopGainingProject = async () => {
  const res = await fetch(`${BASE_URL}/top-gaining-project`);
  if (!res.ok) throw new Error("Failed to fetch top gaining projects");
  return res.json();
};

export const fetchMostTalkedProject = async () => {
  const res = await fetch(`${BASE_URL}/most-talked-about-project`);
  if (!res.ok) throw new Error("Failed to fetch most talked about projects");
  return res.json();
};

export const fetchOverviewStats = async () => {
  const res = await fetch(`${BASE_URL}/overview-stats`);
  if (!res.ok) throw new Error("Failed to fetch overview stats");
  return res.json();
};

export const fetchCommunityHealthRanks = async (
  params: CommunityHealthRankParams = {}
) => {
  const query = new URLSearchParams();

  if (params.limit) query.append("limit", String(params.limit));
  if (params.page) query.append("page", String(params.page));
  if (params.category && params.category !== "All")
    query.append("category", params.category);
  if (params.score_range && params.score_range !== "All")
    query.append("score_range", params.score_range);
  if (params.size && params.size !== "All") query.append("size", params.size);
  if (params.search) query.append("search", String(params.search));

  const url = `${BASE_URL}/community-health-ranks?${query.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch community health ranks");
  return res.json();
};

export const fetchCommunityDataSources = async ({
  symbol,
  platform,
  page,
}: {
  symbol: string;
  platform: string;
  page: string;
}) => {
  const params = new URLSearchParams({
    symbol,
    platform,
    page,
  });

  const res = await fetch(
    `/api/stablecoins/data-sources?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch Community Data Sources');
  }

  return res.json();
};

// Commodities
export const fetchCommoditiesHealthRanks = async ({
  limit,
  page,
  search,
  groupFilter,
}: {
  limit?: number;
  page?: number;
  search?: string;
  groupFilter?: string;
}) => {
  const query = new URLSearchParams();

  if (limit) query.append("limit", String(limit));
  if (page) query.append("page", String(page));
  if (search) query.append("search", String(search));
  if (groupFilter) query.append("groupFilter", String(groupFilter));

  const url = `${BASE_URL}/commodities-health-ranks?${query.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch commodities health ranks");
  return res.json();
};

export const fetchTopGrowthCommodities = async () => {
  const res = await fetch(`${BASE_URL}/top-growth-commodities`);
  if (!res.ok) throw new Error("Failed to fetch top growth commodities");
  return res.json();
};

export const fetchCommodityCommunityDataSources = async ({
  symbol,
  platform,
  page,
}: {
  symbol: string;
  platform: string;
  page: string;
}) => {
  const params = new URLSearchParams({ symbol, platform, page });

  const res = await fetch(
    `/api/commodities/data-sources?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch Commodity Community Data Sources');
  }

  return res.json();
};

// Stocks
export const fetchStockCommunityDataSources = async ({
  symbol,
  platform,
  page,
}: {
  symbol: string;
  platform: string;
  page: string;
}) => {
  const params = new URLSearchParams({ symbol, platform, page });

  const res = await fetch(
    `/api/stocks/data-sources?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch Stock Community Data Sources');
  }

  return res.json();
};

export const fetchMostTalkedAboutCommodities = async () => {
  const res = await fetch(`${BASE_URL}/most-talked-about-commodity`);
  if (!res.ok) throw new Error("Failed to fetch top growth commodities");
  return res.json();
};

export const fetchCommodityNumberTracked = async () => {
  const res = await fetch(`${BASE_URL}/commodity-number-tracked`);
  if (!res.ok) throw new Error("Failed to fetch top growth commodities");
  return res.json();
};

export const fetchCommodityActiveUsers = async () => {
  const res = await fetch(`${BASE_URL}/commodity-active-users`);
  if (!res.ok) throw new Error("Failed to fetch top growth commodities");
  return res.json();
};
