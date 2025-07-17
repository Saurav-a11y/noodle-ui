const BASE_URL = 'https://data-api.agentos.cloud/noodle';

export type CommunityHealthRankParams = {
    limit?: number;
    page?: number;
    category?: string;
    score_range?: string;
    size?: string;
};

export type FetchPriceHistoryParams = {
    symbol: string;
    startTime?: number;
    endTime?: number;
    interval?: string;
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

export const fetchCommunityTeamActivityAnalysis = async ({ communityId, fromDate, toDate }: { communityId: string, fromDate?: string, toDate?: string }) => {
    const query = new URLSearchParams({
        communityId,
        ...(fromDate && { fromDate: String(fromDate) }),
        ...(toDate && { toDate: String(toDate) }),
    });

    const res = await fetch(`${BASE_URL}/community-team-activity-analysis?${query}`);

    if (!res.ok) throw new Error('Failed to fetch price history');
    return res.json();
};

export const fetchPriceHistory = async ({
    symbol,
    startTime,
    endTime,
    interval,
}: FetchPriceHistoryParams) => {
    const query = new URLSearchParams({
        symbol,
        ...(startTime && { startTime: String(startTime) }),
        ...(endTime && { endTime: String(endTime) }),
        ...(interval && { interval }),
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