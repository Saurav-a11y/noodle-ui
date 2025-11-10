'use client';

import TooltipCommon from "@/components/common/TooltipCommon";
import { formatNumberWithCommas } from "@/lib/format";

// 🧠 Hooks cho từng loại tài sản
import { useGetNumberTrackedAboutStableCoins } from "@/hooks/stablecoins/useGetNumberTrackedAboutStableCoins";
import { useStockNumberTracked } from "@/hooks/useStocks";
import { useCommodityNumberTracked } from "@/hooks/useCommodities";

interface NumberTrackedListProps {
    assetType: 'cryptocurrencies' | 'stocks' | 'commodities';
}

const NumberTrackedList = ({ assetType }: NumberTrackedListProps) => {
    // 🔁 Chọn hook phù hợp theo assetType
    let data: any = null;
    let isLoading = false;

    switch (assetType) {
        case 'stocks': {
            const { data: d, isLoading: loading } = useStockNumberTracked();
            data = d;
            isLoading = loading;
            break;
        }
        case 'commodities': {
            const { data: d, isLoading: loading } = useCommodityNumberTracked();
            data = d;
            isLoading = loading;
            break;
        }
        default: {
            const { data: d, isLoading: loading } = useGetNumberTrackedAboutStableCoins();
            data = d;
            isLoading = loading;
            break;
        }
    }

    const numberTracked = data?.data?.value ?? data?.value ?? 0;

    // 🧩 dynamic title + tooltip
    const titleMap = {
        cryptocurrencies: 'Number of Tracked Stablecoins',
        stocks: 'Number of Tracked Stocks',
        commodities: 'Number of Tracked Commodities',
    };

    const tooltipMap = {
        cryptocurrencies:
            'The total number of stablecoin projects being monitored for community signals and on-chain metrics. Only projects with enough consistent data are included.',
        stocks:
            'The total number of stocks being monitored for price movement, sentiment, and community discussions.',
        commodities:
            'The total number of commodities being tracked for price and sentiment changes.',
    };

    return (
        <div className="p-4 bg-[var(--bg-card)] rounded-xl shadow-xl text-[var(--text)] flex-1">
            <div className="flex items-center gap-2 mb-2">
                <h3 className="font-reddit">{titleMap[assetType]}</h3>
                <TooltipCommon content={tooltipMap[assetType]} />
            </div>

            {isLoading ? (
                <div className="space-y-2">
                    <div className="h-10 w-24 bg-[var(--loading)] rounded-md animate-pulse" />
                    {/* <div className="h-4 w-32 bg-[var(--loading)] rounded-md animate-pulse" /> */}
                </div>
            ) : (
                <div className="text-4xl font-bold font-noto">
                    {formatNumberWithCommas(numberTracked)}
                </div>
            )}
        </div>
    );
};

export default NumberTrackedList;