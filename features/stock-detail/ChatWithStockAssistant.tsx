import { useState, useLayoutEffect, useRef, useEffect, memo, useReducer } from "react";
import NoodlesMiniLogo from "@/icons/NoodlesMiniLogo";
import Image from "next/image";
import StarIcon from "@/icons/StarIcon";
import SendIcon from "@/icons/SendIcon";
import MiniMumIcon from "@/icons/MinimunIcon";
import { formatCurrency, formatPercent } from "@/lib/format";
import { useParams } from "next/navigation";
import { useGetMessages, useSayHello, useSendChatMessage, type GetMessagesResponse } from "@/features/commodities/hooks";
import { motion } from 'framer-motion';
import { useStockOverview } from "@/hooks/useStocks";
import { useMe } from "@/hooks/useAuth";
import { useAddUserActivityLog } from "@/hooks/useUserActivityLog";
import { InfiniteData } from "@tanstack/react-query";

function getCurrentTime(): string {
	return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const ChatBubble = memo(({ chat }: { chat: any }) => {
	const lines = chat.message.split('\n').filter(Boolean);

	return (
		<div className="space-y-2">
			{chat.type === 'assistant' && (
				<div className="w-full flex justify-start">
					<div className="bg-[#FBFBFB] rounded-xl p-4 max-w-[90%] w-fit">
						{lines.map((line, idx) => (
							<motion.pre
								key={idx}
								initial={{ opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: idx * 0.1, duration: 0.3 }}
								className="text-sm text-[#373737] whitespace-pre-wrap"
							>
								{line}
							</motion.pre>
						))}
						<p className="text-xs text-gray-500 mt-1 font-reddit">{chat.timestamp}</p>
					</div>
				</div>
			)}
			{chat.type === 'user' && (
				<div className="w-full flex justify-end">
					<div className="bg-[#FAFFD9] rounded-xl p-4 max-w-[90%] w-fit">
						<pre className="text-[#373737] text-right whitespace-pre-wrap text-sm">{chat.message}</pre>
						<p className="text-xs text-gray-500 mt-1 text-right opacity-50 font-reddit">{chat.timestamp}</p>
					</div>
				</div>
			)}
		</div>
	);
});

const TypingIndicator = () => (
	<div className="w-full flex justify-start">
		<div className="bg-[#FBFBFB] rounded-xl px-4 py-3 w-fit flex items-center gap-2">
			<span className="flex space-x-1">
				<span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]" />
				<span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
				<span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
			</span>
		</div>
	</div>
);

const ChatMessages = memo(({ chatHistory, isLoading, onLoadMore, hasMore, }: {
	chatHistory: any[];
	isLoading: boolean;
	onLoadMore: () => void;
	hasMore: boolean;
}) => {
	const scrollRef = useRef<HTMLDivElement>(null);

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		if (e.currentTarget.scrollTop === 0 && hasMore && !isLoading) {
			onLoadMore();
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chatHistory.length, isLoading]);

	return (
		<div
			className="flex-1 p-4 space-y-4 overflow-y-auto"
			onScroll={handleScroll}
		>
			{chatHistory.map((chat) => (
				<ChatBubble key={chat.id} chat={chat} />
			))}
			{isLoading && <TypingIndicator />}
			<div ref={scrollRef} />
		</div>
	)
});

const ChatInput = ({
	userInput,
	setUserInput,
	onSend,
	placeholder,
	loading
}: {
	userInput: string;
	setUserInput: (text: string) => void;
	onSend: () => void;
	placeholder: string;
	loading: boolean;
}) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useLayoutEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
		}
	}, [userInput]);

	return (
		<div className="p-4 border-t border-[#E9E9E9] dark:border-t-[#B1B1B1]">
			<div className="flex items-center justify-between w-full max-w-xl px-3 py-2 border border-[#E9E9E9] rounded-full bg-white">
				<StarIcon />
				<textarea
					ref={textareaRef}
					rows={1}
					value={userInput}
					placeholder={placeholder}
					className="flex-1 mx-2 bg-transparent resize-none placeholder-gray-400 text-sm focus:outline-none max-h-[5rem] overflow-y-auto font-reddit"
					style={{ lineHeight: '1rem' }}
					onChange={(e) => setUserInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							onSend();
						}
					}}
				/>
				<button
					className="flex items-center justify-center w-10 h-10 rounded-full bg-[#84EA07] text-white cursor-pointer"
					onClick={onSend}
					disabled={loading}
				>
					<SendIcon />
				</button>
			</div>
		</div>
	);
};

const ChatWithStockAssistant = ({ handleCloseChat }: { handleCloseChat?: any }) => {
	const params = useParams();
	const communityId = params?.slug as string;

	const [userInput, setUserInput] = useState('');
	const [chatHistory, setChatHistory] = useState<any[]>([]);
	const chatHistoryRef = useRef<any[]>([]);
	const [_, forceUpdate] = useReducer((x) => x + 1, 0)
	const scrollRef = useRef<HTMLDivElement>(null);

	const { mutate: sendMessage, isPending } = useSendChatMessage();
	const { data, isFetching: isGettingCommunity } = useStockOverview(communityId);
	const { data: userData } = useMe()
	const {
		data: rawMessagesData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useGetMessages({
		userId: userData?.data?.id,
		symbol: communityId,
		limit: 20,
	});
	const messagesData = rawMessagesData as InfiniteData<GetMessagesResponse> | undefined;

	const { data: initialGreeting, isFetching } = useSayHello({ userId: userData?.data?.id, username: userData?.data?.username, assetType: 'stocks', symbol: communityId, data: messagesData?.pages?.[0]?.messages?.length });

	const { mutate: addLog } = useAddUserActivityLog();

	const communityOverview = {
		projectName: data?.data?.name,
		logo: data?.data?.logoid,
		price_usd: data?.data?.price,
		price_change_percent: data?.data?.percent,
		symbol: data?.data?.symbol,
	}

	const dbMessages =
		messagesData?.pages?.flatMap((page) =>
			page.messages.map((m) => ({
				id: m.id,
				type: m.ai ? "assistant" : "user",
				message: m.text,
				timestamp: new Date(m.timestamp).toLocaleTimeString(),
			}))
		) || [];

	const allMessages = [...dbMessages, ...chatHistory];

	const pushMessage = (msg: any) => {
		chatHistoryRef.current = [...chatHistoryRef.current, msg];
		setChatHistory([...chatHistoryRef.current]);
	};

	const handleSendMessage = () => {
		const trimmed = userInput.trim();
		if (!trimmed) return;

		const id = Date.now();
		const timestamp = getCurrentTime();

		const userMsg = { id, type: "user", message: trimmed, timestamp };
		forceUpdate();
		pushMessage(userMsg);
		setUserInput("");

		sendMessage(
			{ messages: [{ ai: false, text: trimmed }], assetType: "stocks", userId: userData?.data?.id || "", symbol: communityId },
			{
				onSuccess: (res) => {
					const aiMsg = {
						id: Date.now() + Math.random(),
						type: "assistant",
						message: res || "No response",
						timestamp: getCurrentTime(),
					};
					pushMessage(aiMsg);
					if (userData?.data?.id) {
						addLog({
							userId: userData?.data?.id,
							type: 'chat',
							assetType: 'stocks',
							assetSymbol: data?.data?.symbol,
							assetName: data?.data?.name,
							assetLogo: `https://s3-symbol-logo.tradingview.com/${data?.data?.logoid}.svg`,
							content: `AI Chat: Asked about ${trimmed}`,
						});
					}
					forceUpdate();
				},
				onError: (err) => {
					console.error('Error sending message:', err);
				},
			}
		);
	};

	useEffect(() => {
		if (initialGreeting && chatHistoryRef.current.length === 0) {
			const greetMsg = {
				id: Date.now(),
				type: "assistant",
				message: JSON.parse(initialGreeting).greeting,
				timestamp: getCurrentTime(),
			};
			pushMessage(greetMsg);
		}
	}, [initialGreeting]);

	return (
		<div className="h-full flex flex-col bg-white dark:bg-[#1A1A1A] drop-shadow-xl rounded-xl overflow-hidden">
			{/* Header */}
			<div className="bg-gradient-to-r from-[#DDF346] to-[#9FD609] p-4 rounded-t-xl relative overflow-hidden relative">
				<div className="w-full h-[90px] absolute top-0 left-12">
					{/* <BackgroundChat /> */}
				</div>
				<div className="flex items-center gap-3 relative">
					<div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
						<NoodlesMiniLogo />
					</div>
					<div className="relative z-20">
						<p className="text-lg font-bold font-noto">AI Community Analyst</p>
						<p className="text-xs font-reddit">Your intelligent crypto research companion</p>
					</div>
				</div>
				<span className="absolute top-2 right-2 cursor-pointer z-20" onClick={() => {
					handleCloseChat()
					console.log("Close chat clicked");
				}}>
					<MiniMumIcon />
				</span>
			</div>

			{/* Project Info */}
			<div className="p-4 border-b border-b-[#E9E9E9] dark:border-b-[#B1B1B1] text-[#4B4A4A] dark:text-white">
				{isGettingCommunity ? (
					<div className="flex items-center gap-3 animate-pulse">
						<div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
						<div className="space-y-2">
							<div className="w-40 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
							<div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
						</div>
					</div>
				) : (
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full flex items-center justify-center">
							{communityOverview?.logo && (
								<Image
									src={`https://s3-symbol-logo.tradingview.com/${communityOverview?.logo}.svg` || ""}
									alt="Avatar"
									width={40}
									height={40}
									className="rounded-full"
								/>
							)}
						</div>
						<div className="space-y-1 flex-1">
							<p className="text-xl font-semibold font-noto">{communityOverview?.projectName} Community</p>
							<div className="flex items-center gap-2 text-xs">
								<span className="font-medium font-noto">${communityOverview?.symbol}</span>
								<span>•</span>
								<span className="font-medium font-noto">{formatCurrency(communityOverview?.price_usd)}</span>
								<span>•</span>
								<span className="text-red-500 font-medium font-noto">{formatPercent(communityOverview?.price_change_percent)}</span>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Quick Questions */}
			{/* <QuickQuestions selected={selectedQuestion} onSelect={handleQuickQuestion} /> */}

			{/* Chat Messages */}
			<ChatMessages
				chatHistory={allMessages}
				isLoading={isFetchingNextPage || isPending || isFetching}
				hasMore={hasNextPage}
				onLoadMore={() => fetchNextPage()}
			/>

			{/* Input Area */}
			<ChatInput
				userInput={userInput}
				setUserInput={setUserInput}
				onSend={handleSendMessage}
				placeholder={`Ask me anything about ${communityOverview.projectName}’s community data`}
				loading={isPending}
			/>
		</div>
	);
};

export default ChatWithStockAssistant;