'use client'
// import { useRouter } from "next/navigation";
import TooltipCommon from "@/components/common/TooltipCommon"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import Image from "next/image";
import _get from "lodash/get";
import _map from "lodash/map";
import { formatCurrency, formatPercent } from "@/lib/format";
import { useState } from "react";
import { useMe } from "@/hooks/useAuth";
import { useAddUserActivityLog } from "@/hooks/useUserActivityLog";
import { useGetStocksList } from "@/hooks/stocks/useStocksList";

const TABS = [
    { key: "overview", label: "Overview" },
    { key: "performance", label: "Performance" },
    { key: "valuation", label: "Valuation" },
    { key: "dividends", label: "Dividends" },
    { key: "profitability", label: "Profitability" },
    { key: "income", label: "Income Statement" },
    { key: "balance", label: "Balance Sheet" },
    { key: "cashflow", label: "Cash Flow" },
    { key: "technicals", label: "Technicals" },
];

const TopCompaniesByMarketCap = () => {
    const [selectedTab, setSelectedTab] = useState("overview");
    const { data: stocksHealthRanksData, isFetching: isGettingStocks } = useGetStocksList({
        limit: 20,
        page: 1,
        search: "",
        groupFilter: selectedTab
    })
    const stocks = stocksHealthRanksData?.items;
    // const router = useRouter();
    const { data: userData } = useMe()
    const { mutate: addLog } = useAddUserActivityLog();
    return (
        <div>
            <div className="flex gap-2 mb-4 overflow-x-auto">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setSelectedTab(tab.key)}
                        className={`cursor-pointer text-xs font-noto px-3 py-1 border rounded transition-all whitespace-nowrap
        ${selectedTab === tab.key
                                ? "bg-[#84EA07] text-black border-[#84EA07]"
                                : "bg-transparent text-[var(--text)] border-[var(--border)]"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-[var(--bg-hover)]">
                        <TableRow className="border-b-[var(--border)]">
                            <TableHead className="text-[var(--text-table)] border-b-[var(--border)] font-noto rounded-tl-lg font-normal text-xs">#</TableHead>
                            <TableHead className="text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
                                <p className="text-xs font-noto">Company Name</p>
                            </TableHead>
                            <TableHead className="text-center  text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
                                <div className="flex items-center gap-1">
                                    <p className="text-xs font-noto">Price (USD)</p>
                                    <TooltipCommon content="A score from 0 to 100 that represents the overall health of a project’s community. It’s calculated using growth, engagement, authenticity, and activity consistency." />
                                </div>
                            </TableHead>
                            <TableHead className="text-center  text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
                                <div className="flex items-center gap-1">
                                    <p className="text-xs font-noto">Change %</p>
                                    <TooltipCommon content="Represents the number of unique users who interacted with the project during a specific time range. Higher numbers indicate a more active and engaged community." />
                                </div>
                            </TableHead>
                            <TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
                                <div className="flex items-center gap-1">
                                    <p className="text-xs font-noto">Volume</p>
                                    <TooltipCommon content="Measures how many users are actively participating (likes, comments, shares) relative to the total audience. It reflects the quality and loyalty of community interactions." />
                                </div>
                            </TableHead>
                            <TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
                                <div className="flex items-center gap-1">
                                    <p className="text-xs font-noto">Market Cap</p>
                                    <TooltipCommon content="Shows how fast the project’s community or activity is increasing over time. A steady or rising growth rate often signals momentum or renewed interest." />
                                </div>
                            </TableHead>
                            <TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
                                <div className="flex items-center gap-1">
                                    <p className="text-xs font-noto">P/E</p>
                                    <TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
                                </div>
                            </TableHead>
                            <TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
                                <div className="flex items-center gap-1">
                                    <p className="text-xs font-noto">EPS (TTM)</p>
                                    <TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
                                </div>
                            </TableHead>
                            <TableHead className="text-center text-[var(--text-table)] border-b-[var(--border)] font-noto font-normal text-xs">
                                <div className="flex items-center gap-1">
                                    <p className="text-xs font-noto">EPS Growth YoY</p>
                                    <TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
                                </div>
                            </TableHead>
                            <TableHead className="text-[var(--text-table)] border-b-[var(--border)] font-noto rounded-tr-lg font-normal text-xs w-[164px] text-center">
                                <div className="flex items-center gap-1">
                                    <p className="text-xs font-noto">Div yield TMT</p>
                                    <TooltipCommon content="Indicates any warning signals such as sudden drops in activity, negative sentiment, or whale sell-offs. Helps identify potential community or project risks." />
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isGettingStocks
                            ? Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i} className="animate-pulse">
                                    {Array.from({ length: 10 }).map((_, j) => (
                                        <TableCell key={j} className="py-4 h-[73px] border-b border-b-[var(--border)]">
                                            <div className="h-6 bg-[var(--loading)] rounded animate-pulse w-full" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                            : _map(stocks, (stock, index) => (
                                <TableRow
                                    key={index}
                                    className="hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
                                    onClick={() => {
                                        // router.push(`/stocks/${stock.symbol}`)
                                        if (userData?.data?.id) {
                                            addLog({
                                                userId: userData?.data?.id,
                                                type: 'view_detail',
                                                assetType: 'stocks',
                                                assetSymbol: stock.name,
                                                assetName: stock.description,
                                                assetLogo: stock.logo,
                                                content: `See details: '${stock.description} (${stock.name}) Community'`,
                                            });
                                        }
                                    }}
                                >
                                    <TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)] font-noto">{index + 1}</TableCell>
                                    <TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 flex items-center justify-center font-noto rounded-full">
                                                <Image src={stock?.logo || '/images/icon-section-6_2.png'} alt="Symbol" width={64} height={64} className="rounded-full" />
                                            </div>
                                            <div className="font-noto">
                                                <p className="font-medium">{stock?.description}</p>
                                                <div className="text-muted-foreground">{stock?.name}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)] text-center font-noto"><p className="text-center">{formatCurrency(stock?.close)}</p></TableCell>
                                    <TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)] text-center font-noto"><div className="text-center">{formatPercent(stock?.change)}</div></TableCell>
                                    <TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)] text-center font-noto"><div>{formatCurrency(stock?.volume)}</div></TableCell>
                                    <TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)] text-center font-noto">
                                        <div className={`text-center font-noto`}>
                                            {formatCurrency(stock?.marketCapBasic)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)] text-center font-noto">{Number((stock?.priceEarningsTtm ?? 0).toFixed(2))}</TableCell>
                                    <TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)] text-center font-noto">{Number((stock?.earningsPerShareDilutedTtm ?? 0).toFixed(2))}</TableCell>
                                    <TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)] text-center font-noto">{formatPercent(stock?.earningsPerShareDilutedYoyGrowthTtm)}</TableCell>
                                    <TableCell className="border-b border-b-[var(--border)] text-xs text-[var(--text)] text-center font-noto">{Number((stock?.dividendsYield ?? 0).toFixed(2))}%</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default TopCompaniesByMarketCap