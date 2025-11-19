import { useQuery } from "@tanstack/react-query";

export interface StockItem {
    name: string;
    group: string;
    healthScore: number;
    energyType?: string;
}

export const useGetStocksList = (params?: {
    limit?: number;
    page?: number;
    groupFilter?: string;
    search?: string;
}) => {
    const queryString = new URLSearchParams({
        limit: String(params?.limit ?? 10),
        page: String(params?.page ?? 1),
        groupFilter: params?.groupFilter ?? "",
        search: params?.search ?? "",
    }).toString();

    return useQuery({
        queryKey: ["stocks", params],
        queryFn: async () => {
            const res = await fetch(`/api/stocks/list?${queryString}`);
            if (!res.ok) throw new Error("Failed to fetch stocks list");
            return res.json();
        },
    });
};