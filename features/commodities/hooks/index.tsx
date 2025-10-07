import { useQuery, useMutation } from '@tanstack/react-query';
import { chatWithAgent, sayHello } from '@/apis';

export const useSendChatMessage = () => {
	return useMutation({
		mutationFn: ({ messages, assetType }: { messages: { ai: boolean; text: string }[], assetType: string }) =>
			chatWithAgent({ messages, assetType }),
	});
};

export const useSayHello = ({ symbol }) =>
	useQuery({
		queryKey: ['say-hello', symbol],
		queryFn: () => sayHello(),
		enabled: !!symbol,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
	});