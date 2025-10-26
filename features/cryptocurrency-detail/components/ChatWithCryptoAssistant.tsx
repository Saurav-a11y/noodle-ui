import { useState, useLayoutEffect, useRef, useEffect, memo, useReducer } from "react";
import NoodlesMiniLogo from "@/icons/NoodlesMiniLogo";
import Image from "next/image";
import StarIcon from "@/icons/StarIcon";
import SendIcon from "@/icons/SendIcon";
import MiniMumIcon from "@/icons/MinimunIcon";
import { formatPercent } from "@/lib/format";
import { useParams } from "next/navigation";
import { useCommunityOverview } from "../hooks/useCommunityOverview";
import { useGetAISuggestions, useGetMessages, useSayHello, useSendChatMessage, type GetMessagesResponse } from "@/hooks/useChat";
import { motion } from 'framer-motion';
import { useMe } from "@/hooks/useAuth";
import { useAddUserActivityLog } from "@/hooks/useUserActivityLog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { InfiniteData } from "@tanstack/react-query";

function getCurrentTime(): string {
	return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const ChatBubble = memo(({ chat }: { chat: any }) => {
	return (
		<div className="space-y-2">
			{chat.type === "assistant" && (
				<div className="w-full flex justify-start">
					<div className="bg-[var(--bg-messages)] rounded-xl p-4 max-w-[90%] w-fit">
						<motion.div
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className="text-sm text-[var(--text)] prose prose-slate dark:prose-invert leading-relaxed
							 max-w-none"
						>
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{chat.message}
							</ReactMarkdown>
						</motion.div>
						<p className="text-xs text-[var(--text)] opacity-50 mt-1 font-reddit">
							{chat.timestamp}
						</p>
					</div>
				</div>
			)}

			{chat.type === "user" && (
				<div className="w-full flex justify-end">
					<div className="bg-[#FAFFD9] rounded-xl p-4 max-w-[90%] w-fit">
						<p className="text-[#373737] whitespace-pre-wrap text-sm">
							{chat.message}
						</p>
						<p className="text-xs text-gray-500 mt-1 text-right opacity-50 font-reddit">
							{chat.timestamp}
						</p>
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
	);
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
		<div className="p-4 border-t border-[var(--border-popover)] bg-[var(--bg-chat)]">
			<div className={`flex items-center justify-between w-full px-3 py-2 rounded-full bg-[var(--bg-input-chat)]`}>
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

const ChatWithCryptoAssistant = ({ handleCloseChat }: { handleCloseChat?: any }) => {
	const params = useParams();
	const communityId = params?.slug as string;

	const [userInput, setUserInput] = useState("");
	const [chatHistory, setChatHistory] = useState<any[]>([]);
	const chatHistoryRef = useRef<any[]>([]);

	const [_, forceUpdate] = useReducer((x) => x + 1, 0);

	const { mutate: sendMessage, isPending } = useSendChatMessage();
	const { data, isFetching: isGettingCommunity } = useCommunityOverview(communityId);
	const { data: userData } = useMe();
	const { mutate: addLog } = useAddUserActivityLog();
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
	const hasNoUser = !userData?.data?.id;
	const hasNoMessages = messagesData?.pages?.[0]?.messages?.length === 0;

	const { data: initialGreeting, isFetching } = useSayHello({ userId: userData?.data?.id, username: userData?.data?.username, assetType: 'cryptocurrencies', symbol: communityId, isCall: hasNoUser || (!hasNoUser && hasNoMessages) });
	const { data: aiSuggestions, isFetching: isFetchingSuggestions } = useGetAISuggestions({
		assetType: 'cryptocurrencies',
		symbol: communityId,
		recentMessages: chatHistoryRef.current.slice(-3).map((msg) => msg.message),
	});

	const communityOverview = {
		projectName: data?.data?.fullname,
		logo: data?.data?.logo,
		base_currency: data?.data?.name,
		price_usd: data?.data?.price,
		price_change_percent: data?.data?.change ?? 0,
		symbol: data?.data?.symbol,
	};

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

	const handleSendMessage = (customMessage?: string) => {
		const trimmed = (customMessage || userInput).trim();
		if (!trimmed) return;

		const id = Date.now();
		const timestamp = getCurrentTime();

		const userMsg = { id, type: "user", message: trimmed, timestamp };
		forceUpdate();
		pushMessage(userMsg);
		setUserInput("");

		sendMessage(
			{ messages: [{ ai: false, text: trimmed }], assetType: "cryptocurrencies", userId: userData?.data?.id || "", symbol: communityId },
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
							type: "chat",
							assetType: "cryptocurrencies",
							assetSymbol: data?.data?.name,
							assetName: data?.data?.fullname,
							assetLogo: data?.data?.logo,
							content: `AI Chat: Asked about ${trimmed}`,
						});
					}
					forceUpdate();
				},
				onError: (err) => console.error("Error sending message:", err),
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
		<div className="h-full flex flex-col bg-[var(--bg-chat)] drop-shadow-xl rounded-xl overflow-hidden">
			{/* Header */}
			<div className="bg-gradient-to-r from-[#DDF346] to-[#9FD609] p-4 rounded-t-xl relative overflow-hidden">
				<div className="flex items-center gap-3 relative">
					<div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
						<NoodlesMiniLogo />
					</div>
					<div className="text-[#1E1B39] relative z-20">
						<p className="text-lg font-bold font-noto">AI Community Analyst</p>
						<p className="text-xs font-reddit">
							Your intelligent crypto, stock & commodity companion
						</p>
					</div>
				</div>
				<span
					className="absolute top-2 right-2 cursor-pointer z-20"
					onClick={handleCloseChat}
				>
					<MiniMumIcon />
				</span>
			</div>

			{/* Project Info */}
			<div className="p-4 border-b border-b-[var(--border-popover)] text-[#4B4A4A] text-[var(--text)]">
				{isGettingCommunity ? (
					<div className="flex items-center gap-3 animate-pulse">
						<div className="w-10 h-10 bg-[var(--loading)] rounded-full" />
						<div className="space-y-2">
							<div className="w-40 h-6 bg-[var(--loading)] rounded" />
							<div className="w-24 h-4 bg-[var(--loading)] rounded" />
						</div>
					</div>
				) : (
					<div className="flex items-center gap-3">
						{communityOverview.logo && (
							<Image
								src={communityOverview.logo}
								alt="Logo"
								width={40}
								height={40}
								className="rounded-full"
							/>
						)}
						<div className="space-y-1">
							<p className="text-xl font-semibold font-noto">
								{communityOverview.projectName} Community
							</p>
							<div className="flex items-center gap-2 text-xs">
								<span className="font-medium font-noto">
									{communityOverview.base_currency}
								</span>
								<span>•</span>
								<span className="font-medium font-noto">
									${communityOverview.price_usd}
								</span>
								<span>•</span>
								<span className="text-red-500 font-medium font-noto">
									{formatPercent(communityOverview.price_change_percent)}
								</span>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Chat Section */}
			<ChatMessages
				chatHistory={allMessages}
				isLoading={isFetchingNextPage || isPending || isFetching}
				hasMore={hasNextPage}
				onLoadMore={() => fetchNextPage()}
			/>

			{!isFetchingSuggestions && (aiSuggestions?.suggestions ?? []).length > 0 && (
				<div className="px-4 pb-3 border-t border-[var(--border-popover)]">
					<p className="text-xs my-2 font-reddit dark:text-white">
						Suggested questions
					</p>

					<div
						className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
					>
						{(aiSuggestions?.suggestions ?? []).map((s, i) => (
							<button
								key={i}
								onClick={() => handleSendMessage(s)}
								className="flex-shrink-0 cursor-pointer text-sm px-3 py-1.5 rounded-full transition-all border border-[var(--border)]"
							>
								{s}
							</button>
						))}
					</div>
				</div>
			)}
			{/* Input */}
			<ChatInput
				userInput={userInput}
				setUserInput={setUserInput}
				onSend={handleSendMessage}
				placeholder={`Ask me anything about ${communityOverview.projectName}, or any token, stock, or commodity`}
				loading={isPending}
			/>
		</div>
	);
};

export default ChatWithCryptoAssistant;