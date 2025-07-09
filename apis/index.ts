const BASE_URL = 'http://localhost:3000/noodle';

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

export const fetchCommunityHealthRanks = async () => {
    const res = await fetch(`${BASE_URL}/community-health-ranks`);
    if (!res.ok) throw new Error('Failed to fetch community health ranks');
    return res.json();
};