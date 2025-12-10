'use client';

import { useQuery } from "@tanstack/react-query";

export const useStockCommunityTeamActivityAnalysis = ({
	communityId,
	amount,
	unit,
}: {
	communityId: string;
	amount?: number;
	unit?: string;
}) => {
	return useQuery({
		queryKey: ['stockCommunityTeamActivity', communityId, amount, unit],
		queryFn: async () => {
			const params = new URLSearchParams({
				communityId,
				...(amount && { amount: String(amount) }),
				...(unit && { unit: String(unit) }),
			});

			const res = await fetch(
				`/api/stocks/team-activity-analysis?${params.toString()}`
			);

			if (!res.ok) {
				throw new Error(
					'Failed to fetch Stock Community Team Activity Analysis'
				);
			}

			return res.json();
		},
		enabled: !!communityId,
		staleTime: 1000 * 60 * 5,
	});
};

export const useStockOverview = (name: string) => {
	return useQuery({
		queryKey: ['stockOverview', name],
		queryFn: async () => {
			const res = await fetch(
				`/api/stocks/detail?name=${encodeURIComponent(name)}`
			);

			if (!res.ok) {
				throw new Error('Failed to fetch stock overview');
			}

			return res.json();
		},
		enabled: !!name,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
};