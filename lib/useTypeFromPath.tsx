'use client";'
import { usePathname } from "next/navigation";

export function useTypeFromPath(): "cryptocurrencies" | "stocks" | "commodities" | "stablecoins" {
    const pathname = usePathname();
    if (pathname && pathname.includes("/stocks")) return "stocks";
    if (pathname && pathname.includes("/commodities")) return "commodities";
    if (pathname && pathname.includes("/stablecoins")) return "stablecoins";
    return "cryptocurrencies";
}