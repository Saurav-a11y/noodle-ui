import { useMutation } from "@tanstack/react-query";
import { CLIENT_API_URL } from "@/lib/config";

interface CompareRequest {
    assetIds: string[];
    assetType: "stablecoin" | "stock" | "commodity";
}

export const useCompareStablecoins = () => {
    return useMutation({
        mutationFn: async (payload: CompareRequest) => {
            const res = await fetch(`${CLIENT_API_URL}/compare`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err?.error || "Failed to compare assets");
            }

            return res.json();
        },
    });
};