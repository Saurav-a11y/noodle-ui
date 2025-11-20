import { useMutation } from "@tanstack/react-query";

export const useSendChatMessage = () => {
    return useMutation({
        mutationFn: async ({
            messages,
            assetType,
            symbol,
            userId, // optional
        }: {
            messages: { ai: boolean; text: string }[];
            assetType: string;
            symbol: string;
            userId?: string;
        }) => {

            const params = new URLSearchParams({
                messages: JSON.stringify(messages),
                assetType,
                symbol,
            });

            if (userId) {
                params.append("userId", userId);
            }

            const res = await fetch(`/api/chat-with-agent?${params.toString()}`, {
                method: "GET",
            });

            if (!res.ok) throw new Error("Failed to fetch chat response");
            return res.json();
        },
    });
};