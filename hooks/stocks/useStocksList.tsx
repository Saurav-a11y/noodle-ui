import { useQuery } from "@tanstack/react-query";

export interface StockItem {
    name: string;
    group: string;
    healthScore: number;
    energyType?: string;
}

const API = process.env.NEXT_PUBLIC_API_URL;

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
            if (!API) throw new Error("NEXT_PUBLIC_API_URL is missing");

            const url = `${API}/stocks?${queryString}`;

            const res = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(`Failed to fetch stocks list: ${res.status} - ${err}`);
            }

            return res.json();
        },
    })
};