import { fetchCommodityOverview } from "@/apis";
import { useQuery } from "@tanstack/react-query";

export const useCommodityOverview = (name_slug: string) => {
    return useQuery({
        queryKey: ['commodityOverview', name_slug],
        queryFn: () => fetchCommodityOverview({ name_slug }),
        enabled: !!name_slug,
        staleTime: 1000 * 60 * 5,
    });
};