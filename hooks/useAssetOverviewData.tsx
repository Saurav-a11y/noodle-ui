import { useCommunityOverview } from "@/features/cryptocurrency-detail/hooks/useCommunityOverview";
import { formatCurrency, formatPercent } from "@/lib/format";
import { useParams, usePathname } from "next/navigation";
import { useCommodityOverview } from "./useCommodities";
import { useStockOverview } from "./useStocks";
import { useTypeFromPath } from "@/lib/useTypeFromPath";

export const useAssetOverviewData = () => {
    const type = useTypeFromPath();
    const params = useParams();
    const slug = params?.slug as string;

    // Gọi hook phù hợp
    let data, isFetching;

    if (type === "stocks") {
        const result = useStockOverview(slug);
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
        projectName: data?.data?.fullname || data?.data?.name || "",
        logo: data?.data?.logo || data?.data?.medium_logo_url || `https://s3-symbol-logo.tradingview.com/${data?.data?.logoid}.svg`,
        base_currency: data?.data?.name || "",
        price_usd: data?.data?.price ?? null,
        price_change_percent: data?.data?.change || data?.data?.percent,
        symbol: data?.data?.symbol || "",
    };

    return {
        isFetching,
        overview,
        formatted: {
            priceUsd: overview.price_usd,
            priceChange: typeof overview.price_change_percent === 'string' ? overview.price_change_percent : formatPercent(overview.price_change_percent),
        },
    };
};