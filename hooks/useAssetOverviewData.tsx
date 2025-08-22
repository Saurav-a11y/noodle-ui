import { useCommunityOverview } from "@/features/cryptocurrency-detail/hooks/useCommunityOverview";
import { formatCurrency, formatPercent } from "@/lib/format";
import { useParams, usePathname } from "next/navigation";
import { useCommodityOverview } from "./useCommodities";

export const useAssetOverviewData = () => {
    const params = useParams();
    const pathname = usePathname();
    const slug = params?.slug as string;

    let type: "cryptocurrencies" | "stocks" | "commodities" = "cryptocurrencies";

    if (pathname?.includes("/stocks")) type = "stocks";
    else if (pathname?.includes("/commodities")) type = "commodities";

    // Gọi hook phù hợp
    let data, isFetching;

    if (type === "stocks") {
        const result = {
            data: [],
            isFetching: false,
        }
        data = result.data;
        isFetching = result.isFetching;
    } else if (type === "commodities") {
        const result = useCommodityOverview(slug);
        data = result.data;
        isFetching = result.isFetching;
    } else {
        const result = useCommunityOverview(slug);
        data = result.data;
        isFetching = result.isFetching;
    }
    // Chuẩn hoá dữ liệu đầu ra
    const overview = {
        projectName: data?.data?.project?.name,
        logo: data?.data?.project?.medium_logo_url || "",
        base_currency: data?.data?.project?.base_currency || "",
        price_usd: data?.data?.project?.price_usd ?? null,
        price_change_percent: data?.data?.project?.price_change_percent ?? null,
        symbol: data?.data?.project?.symbol || "",
    };

    return {
        isFetching,
        overview,
        formatted: {
            priceUsd: formatCurrency(overview.price_usd),
            priceChange: formatPercent(overview.price_change_percent),
        },
    };
};