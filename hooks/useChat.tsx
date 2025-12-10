import { useQuery, useMutation, useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

interface Message {
    id: string;
    ai: boolean;
    text: string;
    timestamp: number;
}

export interface GetMessagesResponse {
    messages: Message[];
    hasMore: boolean;
    nextCursor: string | null;
}

export interface AISuggestion {
    suggestions: string[];
}

interface GetAISuggestionsParams {
    assetType: "stablecoins" | "stocks" | "commodities";
    symbol: string;
    recentMessages?: string[];
}

export const useSendChatMessage = () => {
    return useMutation({
        mutationFn: async ({
            messages,
            assetType,
            userId,
            symbol,
        }: {
            messages: { ai: boolean; text: string }[];
            assetType: string;
            userId: string;
            symbol: string;
        }) => {
            const params = new URLSearchParams();
            params.append('messages', JSON.stringify(messages));
            params.append('assetType', assetType);
            params.append('userId', userId);
            params.append('symbol', symbol);

            const res = await fetch(
                `/api/chat/agent?${params.toString()}`,
                {
                    method: 'GET', // giữ nguyên như backend hiện tại
                }
            );

            if (!res.ok) {
                throw new Error('Failed to fetch chat from agent');
            }

            // ✅ backend trả TEXT (không phải JSON)
            return res.text();
        },
    });
};

export const useSayHello = ({
    userId,
    username,
    assetType,
    symbol,
    isCall,
}: {
    userId: string;
    username: string;
    assetType: string;
    symbol: string;
    isCall: boolean;
}) =>
    useQuery({
        queryKey: ['say-hello', username, assetType, symbol],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append('userId', userId);
            params.append('username', username);
            params.append('symbol', symbol);
            params.append('assetType', assetType);

            const res = await fetch(
                `/api/chat/say-hello?${params.toString()}`
            );

            if (!res.ok) {
                throw new Error('Failed to fetch say hello');
            }

            // ✅ backend trả TEXT
            return res.text();
        },
        enabled: isCall && !!symbol,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });

export const useGetMessages = ({
    userId,
    symbol,
    limit = 20,
}: {
    userId: string;
    symbol: string;
    limit?: number;
}) => {
    return useInfiniteQuery<
        GetMessagesResponse,
        Error,
        InfiniteData<GetMessagesResponse>,
        [string, string, string],
        string | null
    >({
        queryKey: ['chat-messages', userId, symbol],
        queryFn: async ({ pageParam = null }) => {
            const params = new URLSearchParams({
                userId,
                symbol,
                limit: String(limit),
            });
            if (pageParam) params.append('before', String(pageParam));

            const res = await fetch(
                `/api/chat/messages?${params.toString()}`
            );

            if (!res.ok) {
                throw new Error(`Failed to fetch messages (${res.status})`);
            }

            return res.json();
        },
        getNextPageParam: (lastPage) =>
            lastPage.hasMore ? lastPage.nextCursor : undefined,
        enabled: !!userId && !!symbol,
        staleTime: 1000 * 60 * 2, // 2 phút
        refetchOnWindowFocus: false,
        initialPageParam: null,
    });
};

export const useGetAISuggestions = ({
    assetType,
    symbol,
    recentMessages = [],
}: GetAISuggestionsParams) => {
    return useQuery<AISuggestion>({
        queryKey: ['ai-suggestions', assetType, symbol],
        queryFn: async () => {
            const params = new URLSearchParams({
                assetType,
                symbol,
            });

            if (recentMessages.length > 0) {
                params.append(
                    'recentMessages',
                    JSON.stringify(recentMessages)
                );
            }

            const res = await fetch(
                `/api/ai-suggestions?${params.toString()}`
            );

            if (!res.ok) {
                throw new Error('Failed to fetch AI suggestions');
            }

            return res.json();
        },
        enabled: !!assetType && !!symbol,
        staleTime: Infinity, // ✅ luôn dùng cache
        gcTime: Infinity,    // ✅ giữ cache suốt phiên
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};