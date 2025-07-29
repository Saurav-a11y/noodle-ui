import { useState, useLayoutEffect, useRef, useEffect, memo, useReducer } from "react";
import { Button } from "@/components/ui/Button";
import NoodlesMiniLogo from "@/icons/NoodlesMiniLogo";
import Image from "next/image";
// import LightIcon from "@/icons/LightIcon";
import StarIcon from "@/icons/StarIcon";
import SendIcon from "@/icons/SendIcon";
import MiniMumIcon from "@/icons/MinimunIcon";
import { formatCurrency, formatPercent } from "@/lib/format";
import { useParams } from "next/navigation";
import { useCommunityOverview } from "../hooks/useCommunityOverview";
// import BackgroundChat from "@/icons/BackgroundChat";
import { useSayHello, useSendChatMessage } from "@/features/commodities/hooks";

function getCurrentTime(): string {
	return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const ChatBubble = memo(({ chat }: { chat: any }) => {
	return (
		<div className="space-y-2">
			{chat.type === 'assistant' && (
				<div className="w-full flex justify-start">
					<div className="bg-[#FBFBFB] rounded-xl p-4 max-w-[90%] w-fit">
						<p className="text-sm text-gray-800 font-reddit">{chat.message}</p>
						<p className="text-xs text-gray-500 mt-1 font-reddit">{chat.timestamp}</p>
					</div>
				</div>
			)}
			{chat.type === 'user' && (
				<div className="w-full flex justify-end">
					<div className="bg-[#FAFFD9] rounded-xl p-4 max-w-[90%] w-fit">
						<p className="text-sm text-[#373737] text-right font-reddit">{chat.message}</p>
						<p className="text-xs text-[#373737] mt-1 text-right opacity-50 font-reddit">{chat.timestamp}</p>
					</div>
				</div>
			)}
		</div>
	);
});

const TypingIndicator = () => (
	<div className="w-full flex justify-start">
		<div className="bg-[#FBFBFB] rounded-xl px-4 py-3 w-fit flex items-center gap-2">
			<div className="w-4 h-4 border-2 border-gray-300 border-t-[#84EA07] rounded-full animate-spin" />
			<span className="text-sm text-gray-500 font-reddit">AI is typing...</span>
		</div>
	</div>
);

const QuickQuestions = ({ selected, onSelect }: { selected: string | null, onSelect: (q: string) => void }) => {
	const questions = [
		"Explain health score",
		"Why the alerts?",
		"Compare to DOGE",
		"Investment advice",
		"Bot detection",
		"Whale impact"
	];

	return (
		<div className="p-4 border-b border-[#E9E9E9] dark:border-[#B1B1B1]">
			<p className="text-sm font-medium text-[#373737] dark:text-white mb-3 font-noto">Quick Questions:</p>
			<div className="flex flex-wrap gap-2">
				{questions.map((question, index) => (
					<Button
						key={index}
						variant="outline"
						size="sm"
						className={`cursor-pointer text-xs h-7 px-2 rounded-full border-[#37373733] font-reddit transition-colors ${selected === question ? 'bg-[#DDF346] border-transparent' : 'hover:bg-[#F6F6F6]'}`}
						onClick={() => onSelect(question)}
					>
						{question}
					</Button>
				))}
			</div>
		</div>
	);
};

const ChatMessages = memo(({ chatHistory, isLoading }: {
	chatHistory: any[],
	isLoading: boolean
}) => (
	<div className="flex-1 p-4 space-y-4 overflow-y-auto">
		{chatHistory.map((chat) => (
			<ChatBubble key={chat.id} chat={chat} />
		))}
		{isLoading && <TypingIndicator />}
	</div>
));

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

const AICommunityAnalyst = ({ handleCloseChat }: { handleCloseChat?: any }) => {
	const params = useParams();
	const communityId = params?.slug as string;

	const [userInput, setUserInput] = useState('');
	const chatHistoryRef = useRef<any[]>([]);
	const [_, forceUpdate] = useReducer((x) => x + 1, 0)
	const scrollRef = useRef<HTMLDivElement>(null);

	const { mutate: sendMessage, isPending } = useSendChatMessage();
	const { data } = useCommunityOverview(communityId);
	const { data: initialGreeting, isFetching } = useSayHello({ symbol: communityId });

	const communityOverview = {
		projectName: data?.data?.project?.name,
		logo: data?.data?.project?.medium_logo_url,
		base_currency: data?.data?.project?.base_currency,
		price_usd: data?.data?.project?.price_usd,
		price_change_percent: data?.data?.project?.price_change_percent,
		symbol: data?.data?.project?.symbol,
	}
	const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

	const handleQuickQuestion = (question: string) => {
		setSelectedQuestion(question);
		console.log("Quick question:", question);
	};

	const handleSendMessage = () => {
		const trimmed = userInput.trim();
		if (!trimmed) return;

		const id = Date.now();
		const timestamp = getCurrentTime();

		chatHistoryRef.current.push({
			id,
			type: 'user',
			message: trimmed,
			timestamp,
		});
		forceUpdate();
		setUserInput('');

		sendMessage(
			{ symbol: communityId, prompt: '', messages: [{ ai: false, text: trimmed }] },
			{
				onSuccess: (res) => {
					chatHistoryRef.current.push({
						id: Date.now(),
						type: 'assistant',
						message: res || 'No response',
						timestamp: getCurrentTime(),
					});
					forceUpdate();
				},
				onError: (err) => {
					console.error('Error sending message:', err);
				},
			}
		);
	};

	// 👇 Auto scroll to bottom when chat updates
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [chatHistoryRef.current.length, isPending]);

	// 👇 Greeting once
	useEffect(() => {
		if (initialGreeting && chatHistoryRef.current.length === 0) {
			chatHistoryRef.current.push({
				id: Date.now(),
				type: 'assistant',
				message: initialGreeting,
				timestamp: getCurrentTime(),
			});
			forceUpdate();
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
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
						{communityOverview?.logo && (
							<Image src={communityOverview?.logo || ""} alt="Avatar" width={40} height={40} className="rounded-full" />
						)}
					</div>
					<div className="space-y-1">
						<p className="text-xl font-semibold font-noto">{communityOverview?.projectName} Community</p>
						<div className="flex items-center gap-2 text-xs">
							<span className="font-medium font-noto">${communityOverview?.base_currency}</span>
							<span>•</span>
							<span className="font-medium font-noto">{formatCurrency(communityOverview?.price_usd)}</span>
							<span>•</span>
							<span className="text-red-500 font-medium font-noto">{formatPercent(communityOverview?.price_change_percent)}</span>
						</div>
					</div>
				</div>
			</div>

			{/* Quick Questions */}
			<QuickQuestions selected={selectedQuestion} onSelect={handleQuickQuestion} />

			{/* Chat Messages */}
			<ChatMessages
				chatHistory={chatHistoryRef.current}
				isLoading={isPending || isFetching}
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

export default AICommunityAnalyst;