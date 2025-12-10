import { useQuery } from "@tanstack/react-query";
import { CLIENT_API_URL } from "@/lib/config";

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
            const url = `/api/commodities/list?${queryString}`;

            const res = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(`Failed: ${res.status} - ${err}`);
            }

            return res.json();
        },
    });
};