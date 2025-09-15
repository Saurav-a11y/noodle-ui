import { useQuery, useMutation } from '@tanstack/react-query';
import { chatWithAgent, sayHello } from '@/apis';

export const useSendChatMessage = () => {
	return useMutation({
		mutationFn: ({ messages }: { messages: { ai: boolean; text: string }[] }) =>
			chatWithAgent({ messages }),
	});
};

export const useSayHello = ({ symbol }) =>
	useQuery({
		queryKey: ['say-hello', symbol],
		queryFn: () => sayHello(),
		enabled: !!symbol,
		staleTime: 1000 * 60 * 5,
	});