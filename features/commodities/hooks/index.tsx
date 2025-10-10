import { useQuery, useMutation, useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { chatWithAgent, sayHello } from '@/apis';

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
	assetType: "cryptocurrencies" | "stocks" | "commodities";
	symbol: string;
	recentMessages?: string[];
}

export const useSendChatMessage = () => {
	return useMutation({
		mutationFn: ({ messages, assetType, userId, symbol }: { messages: { ai: boolean; text: string }[], assetType: string, userId: string, symbol: string }) =>
			chatWithAgent({ messages, assetType, userId, symbol }),
	});
};

export const useSayHello = ({ userId, username, assetType, symbol, isCall }) =>
	useQuery({
		queryKey: ['say-hello', userId, username, assetType, symbol],
		queryFn: () => sayHello({ userId, username, assetType, symbol }),
		enabled: isCall && !!userId && !!symbol,
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
		Error,                         // TError
		InfiniteData<GetMessagesResponse>, // TData (data trả về của hook)
		[string, string | undefined, string | undefined], // TQueryKey
		string | null
	>({
		queryKey: ["chat-messages", userId, symbol],
		queryFn: async ({ pageParam = null }) => {
			const params = new URLSearchParams({
				userId,
				symbol,
				limit: String(limit),
			});
			if (pageParam) params.append("before", String(pageParam));

			const res = await fetch(`https://data-api.agentos.cloud/noodle/get-messages?${params.toString()}`);
			if (!res.ok) throw new Error(`Failed to fetch messages (${res.status})`);

			return res.json();
		},
		getNextPageParam: (lastPage) =>
			lastPage.hasMore ? lastPage.nextCursor : undefined,
		enabled: !!userId && !!symbol,
		staleTime: 1000 * 60 * 2, // cache 2 phút
		initialPageParam: "1",
	});
};

export const useGetAISuggestions = ({
	assetType,
	symbol,
	recentMessages = [],
}: GetAISuggestionsParams) => {
	return useQuery<AISuggestion>({
		queryKey: ["ai-suggestions", assetType, symbol],
		queryFn: async () => {
			const params = new URLSearchParams({
				assetType,
				symbol,
			});

			if (recentMessages.length > 0) {
				params.append("recentMessages", JSON.stringify(recentMessages));
			}

			const res = await fetch(`https://data-api.agentos.cloud/noodle/get-suggestions?${params.toString()}`);
			if (!res.ok) throw new Error("Failed to fetch AI suggestions");
			return res.json();
		},
		enabled: !!assetType && !!symbol,
		staleTime: Infinity, // ❗️luôn dùng cache
		gcTime: Infinity, // giữ cache suốt phiên
	});
};