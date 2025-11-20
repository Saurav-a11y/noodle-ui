import { useQuery } from "@tanstack/react-query";

export interface CommodityItem {
    name: string;
    group: string;
    healthScore: number;
    energyType?: string;
}

const API = process.env.NEXT_PUBLIC_API_URL;

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
            if (!API) throw new Error("NEXT_PUBLIC_API_URL is missing");

            const url = `${API}/commodities?${queryString}`;

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