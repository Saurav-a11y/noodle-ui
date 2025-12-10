import { useQuery } from '@tanstack/react-query';

export const useCommunityTeamActivityAnalysis = ({
    communityId,
    amount,
    unit,
}: {
    communityId: string;
    amount?: number;
    unit?: string;
}) => {
    return useQuery({
        queryKey: ['communityTeamActivity', communityId, amount, unit],
        queryFn: async () => {
            const params = new URLSearchParams({
                communityId,
                ...(amount && { amount: String(amount) }),
                ...(unit && { unit: String(unit) }),
            });

            const res = await fetch(
                `/api/stablecoins/team-activity-analysis?${params.toString()}`
            );

            if (!res.ok) {
                throw new Error(
                    'Failed to fetch Community Team Activity Analysis'
                );
            }

            return res.json();
        },
        enabled: !!communityId,
        staleTime: 1000 * 60 * 5, // 5 phút – analysis không cần realtime
        refetchOnWindowFocus: false,
    });
};