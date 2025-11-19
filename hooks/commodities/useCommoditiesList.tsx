import { useQuery } from "@tanstack/react-query";

export interface CommodityItem {
    name: string;
    group: string;
    healthScore: number;
    energyType?: string;
}

export const useGetCommoditiesList = (params?: {
    limit?: number;
    page?: number;
    groupFilter?: string;
}) => {
    const queryString = new URLSearchParams({
        limit: String(params?.limit ?? 10),
        page: String(params?.page ?? 1),
        groupFilter: params?.groupFilter ?? "",
    }).toString();

    return useQuery({
        queryKey: ["commodities", params],
        queryFn: async () => {
            const res = await fetch(`/api/commodities/list?${queryString}`);
            if (!res.ok) throw new Error("Failed to fetch commodities list");
            return res.json();
        },
    });
};