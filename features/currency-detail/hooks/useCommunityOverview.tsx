'use client';

import { useQuery } from '@tanstack/react-query';

export const useCommunityOverview = (communityId: string) => {
    return useQuery({
        queryKey: ['communityOverview', communityId],
        queryFn: async () => {
            const res = await fetch(
                `/api/stablecoins/detail?communityId=${encodeURIComponent(
                    communityId
                )}`
            );
            if (!res.ok) {
                throw new Error('Failed to fetch community overview');
            }

            return res.json();
        },
        enabled: !!communityId,
        staleTime: 1000 * 60 * 5,
    });
};