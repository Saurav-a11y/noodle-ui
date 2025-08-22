import { fetchStockOverview } from "@/apis";
import { useQuery } from "@tanstack/react-query";

export const useStockOverview = (name: string) => {
    return useQuery({
        queryKey: ['stockOverview', name],
        queryFn: () => fetchStockOverview({ name }),
        enabled: !!name,
        staleTime: 1000 * 60 * 5,
    });
};