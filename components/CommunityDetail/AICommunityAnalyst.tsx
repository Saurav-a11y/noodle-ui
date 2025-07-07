import { Button } from "../ui/Button";
import NoodlesMiniLogo from "@/icons/NoodlesMiniLogo";
import Image from "next/image";
import chatBg from "@/images/bg-chat.png";
import LightIcon from "@/icons/LightIcon";
import StarIcon from "@/icons/StarIcon";
import SendIcon from "@/icons/SendIcon";
import MiniMumIcon from "@/icons/MinimunIcon";
import bonk from '../../images/tokens/bonk.png'

const AICommunityAnalyst = ({ handleCloseChat }: { handleCloseChat: any }) => {
	const quickQuestions = [
		"Explain health score",
		"Why the alerts?",
		"Compare to DOGE",
		"Investment advice",
		"Bot detection",
		"Whale impact"
	];

	const chatHistory = [
		{
			id: 1,
			type: "assistant",
			message: "Hi! I'm your BONK community intelligence assistant. I can see you're viewing the project dashboard.",
			timestamp: "4 minutes ago"
		},
		{
			id: 2,
			type: "insight",
			message: "BONK's health score of 78 puts it in the \"Good\" category, but the recent 15% engagement drop combined with whale activity suggests increased caution is warranted.",
			timestamp: "4 minutes ago"
		},
		{
			id: 3,
			type: "assistant",
			message: "Hi! I'm your BONK community intelligence assistant. I can see you're viewing the project dashboard",
			timestamp: "4 minutes ago"
		}
	];

	const handleQuickQuestion = (question: string) => {
		console.log("Quick question:", question);
	};

	return (
		<div className="h-full flex flex-col bg-white drop-shadow-xl rounded-xl overflow-hidden">
			{/* Header */}
			<div className="bg-gradient-to-r from-[#DDF346] to-[#9FD609] p-4 rounded-t-xl relative overflow-hidden relative">
				<Image src={chatBg} alt="Background" className="w-full h-full absolute top-0 left-0" width={320} height={320} />
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
			<div className="p-4 border-b border-b-[#E9E9E9] text-[#4B4A4A]">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
						<Image src={bonk} alt="Avatar" />
					</div>
					<div className="space-y-1">
						<p className="text-xl font-semibold font-noto">BONK Community</p>
						<div className="flex items-center gap-2 text-xs">
							<span className="font-medium font-noto">$BONK</span>
							<span>•</span>
							<span className="font-medium font-noto">$0.1703</span>
							<span>•</span>
							<span className="text-red-500 font-medium font-noto">▼ 5.54%</span>
						</div>
					</div>
				</div>
			</div>

			{/* Quick Questions */}
			<div className="p-4 border-b border-b-[#E9E9E9]">
				<p className="text-sm font-medium text-[#373737] mb-3 font-noto">Quick Questions:</p>
				<div className="flex flex-wrap gap-2">
					{quickQuestions.map((question, index) => (
						<Button
							key={index}
							variant="outline"
							size="sm"
							className="text-xs h-7 px-2 rounded-full border-[#37373733] font-reddit"
							onClick={() => handleQuickQuestion(question)}
						>
							{question}
						</Button>
					))}
				</div>
			</div>

			{/* Chat Messages */}
			<div className="flex-1 p-4 space-y-4 overflow-y-auto">
				{chatHistory.map((chat) => (
					<div key={chat.id} className="space-y-2">
						{chat.type === "assistant" && (
							<div className="w-full flex justify-start">
								<div className="bg-[#FBFBFB] rounded-xl p-4 w-[90%]">
									<p className="text-sm text-gray-800 font-reddit">{chat.message}</p>
									<p className="text-xs text-gray-500 mt-1 font-reddit">{chat.timestamp}</p>
								</div>
							</div>
						)}

						{chat.type === "insight" && (
							<div className="w-full flex justify-start">
								<div className="border-l border-l-5 border-[#DDF346] rounded-xl p-4 bg-[#FBFBFB] w-[90%]">
									<div className="flex items-center gap-2 mb-2">
										<LightIcon />
										<span className="text-sm font-medium text-[#30B500] font-noto">Real-time Insight</span>
									</div>
									<p className="text-sm text-[#373737] font-reddit">{chat.message}</p>
									<p className="text-xs text-[#373737] mt-1 opacity-50 font-reddit">{chat.timestamp}</p>
								</div>
							</div>
						)}
					</div>
				))}
				<div className="w-full flex justify-end">
					<div className="bg-[#FAFFD9] rounded-xl p-4 w-[90%]">
						<p className="text-sm text-[#373737] text-right font-reddit">{`Hi! I'm your BONK community intelligence assistant. I can see you're viewing the project dashboard`}</p>
						<p className="text-xs text-[#373737] mt-1 text-right opacity-50 font-reddit">4 minutes ago</p>
					</div>
				</div>
			</div>

			{/* Input Area */}
			<div className="p-4 border-t border-t-[#E9E9E9]">
				<div className="flex items-center justify-between w-full max-w-xl px-3 py-2 border border-[#E9E9E9] rounded-full bg-white">
					{/* Left Icon */}
					<StarIcon />
					<textarea
						rows={1}
						placeholder="Ask me anything about BONK’s community data"
						className="flex-1 mx-2 bg-transparent resize-none placeholder-gray-400 text-sm focus:outline-none max-h-[5rem] overflow-y-auto font-reddit"
						style={{ lineHeight: "1rem" }}
						onInput={(e) => {
							const el = e.currentTarget;
							el.style.height = "auto";
							el.style.height = el.scrollHeight + "px";
						}}
					/>

					{/* Right Submit Button */}
					<button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#84EA07] text-white cursor-pointer">
						<SendIcon />
					</button>
				</div>
			</div>
		</div>
	);
};

export default AICommunityAnalyst;