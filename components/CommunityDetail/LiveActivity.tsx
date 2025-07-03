import { Heart, MessageCircle, RotateCcw } from "lucide-react";
import QuestionIcon from "@/icons/QuestionIcon";
import XIcon from "@/icons/XIcon";
import RecentActivityDropIcon from "@/icons/RecentActivityDropIcon";
import GithubIcon from "@/icons/GithubIcon";
import RedditIcon from "@/icons/RedditIcon";
import LightIcon from "@/icons/LightIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import { useState } from "react";

const LiveActivity = () => {
	const tabs = ["All Activity", "Twitter", "Reddit", "GitHub", "Youtube"];
	const [activeTab, setActiveTab] = useState("All Activity");

	const twitterActivity = [
		{
			user: "@kathryn_bonk",
			followers: "2.5K followers",
			time: "2 hours ago",
			content: '"This is me when $BONK surpasses Bitcoin. 😍❤️ #BONK #SOLEcosystem"',
			engagement: { likes: 131, retweets: 81, replies: 315, rate: "7.6%" },
			authentic: true,
			verified: true
		}
	];

	const redditActivity = [
		{
			user: "u/crypto_researcher_2024",
			karma: "2.3K karma",
			time: "3 hours ago",
			title: "Analysis: BONK's recent partnerships",
			content: "Here's what I found interesting...",
			engagement: { upvotes: 89, comments: 34 },
			sentiment: "Positive"
		}
	];

	const youtubeActivity = [
		{
			title: "BONK Analysis: Why This Dip Might Be Opportunity",
			channel: "CryptoAnalyst47",
			views: "12K views",
			time: "1 day ago",
			engagement: { likes: 131, comments: 81, shares: 315 }
		}
	];

	const githubActivity = [
		{
			repo: "bonk-community-dev",
			time: "2 days ago",
			commit: "feat: Add new staking mechanism integration",
			stats: "+247 lines -12 lines • contracts/staking.rs"
		}
	];

	return (
		<div className="text-[#1E1B39]">
			<div className="flex items-center gap-2 mb-3">
				<h3 className="text-xl font-semibold">Live Community Data Sources</h3>
				<QuestionIcon />
			</div>

			<div className="flex items-center gap-2 mb-4 border-b border-[#C5C5C5]">
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`px-4 py-2 text-sm text-[#373737] font-medium border-b-2 transition-colors cursor-pointer ${activeTab === tab ? "border-[#7FCE00] font-semibold" : "border-transparent"
							}`}
					>
						{tab}
					</button>
				))}
			</div>

			<div className={`grid ${activeTab === "All Activity" ? "grid-cols-2" : "grid-cols-1"} gap-6`}>
				<div className={`${activeTab === "All Activity" ? "col-span-1" : "col-span-full"} space-y-5`}>
					{(activeTab === "All Activity" || activeTab === "Twitter") && (
						<div className="bg-[#F6F6F6] p-4 rounded-xl">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									<XIcon width={24} height={24} fill="#000" />
									<p className="font-semibold">Latest Twitter Activity</p>
									<span className="ml-3 text-xs text-[#373737]"><b>2.3K</b> mentions today</span>
								</div>
								<button className="text-xs bg-white px-2 py-1.5 rounded cursor-pointer">View all on Twitter</button>
							</div>
							<div className="space-y-4">
								{twitterActivity.map((tweet, index) => (
									<div key={index} className="bg-white rounded-xl p-5 space-y-4 text-[#373737]">
										<div className="flex items-start gap-3">
											<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
												{tweet.user[1].toUpperCase()}
											</div>
											<div className="flex-1">
												<div className="mb-1">
													<span className="text-sm font-semibold">{tweet.user}</span>
													<div className="flex items-center gap-2 text-[#4B4A4A]">
														<span className="text-xs opacity-50">{tweet.followers}</span>
														<span>•</span>
														<span className="text-xs">{tweet.time}</span>
													</div>
												</div>
											</div>
											{tweet.authentic && (
												<span className="bg-[#DDFFE4] text-[#16BC00] px-2 py-1 rounded-full text-xs">Authentic</span>
											)}
										</div>
										<p className="text-sm">{tweet.content}</p>
										<hr className="text-[#C5C5C5]" />
										<div className="flex items-center gap-4 text-sm">
											<div className="flex items-center gap-1"><Heart className="w-4 h-4" />{tweet.engagement.likes}</div>
											<div className="flex items-center gap-1"><RotateCcw className="w-4 h-4" />{tweet.engagement.retweets}</div>
											<div className="flex items-center gap-1"><MessageCircle className="w-4 h-4" />{tweet.engagement.replies}</div>
											<span className="text-xs ml-auto"><span className="opacity-50">Engagement:</span> <b>{tweet.engagement.rate}</b></span>
										</div>
									</div>
								))}
								<div className="bg-[#FFF7E2] border border-[#FFDA78] rounded-xl p-5">
									<div className="flex items-center gap-1.5 mb-2">
										<RecentActivityDropIcon />
										<span className="font-semibold text-[#DD7519]">Suspicious Activity Detected</span>
									</div>
									<p className="text-sm text-[#373737]">
										47 similar comments posted within 30 minutes by new accounts.
										<button className="text-[#DD7519] underline ml-1">View Details</button>
									</p>
								</div>
							</div>
						</div>
					)}

					{(activeTab === "All Activity" || activeTab === "GitHub") && (
						<div className="bg-[#F6F6F6] p-4 rounded-xl">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									<GithubIcon width={24} height={24} />
									<p className="font-semibold">GitHub Development Activity</p>
									<span className="ml-3 text-xs text-[#373737]"><b>12</b> commits this month</span>
								</div>
								<button className="text-xs bg-white px-2 py-1.5 rounded cursor-pointer">View Repository</button>
							</div>
							{githubActivity.map((item, i) => (
								<div key={i} className="bg-white rounded-xl p-5">
									<div className="space-y-4">
										<div className="flex items-start gap-3">
											<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
												{/* {github.user[1].toUpperCase()} */}
											</div>
											<div className="flex-1">
												<div className="mb-1">
													<span className="text-sm font-semibold">{item.repo}</span>
													<div className="flex items-center gap-2 text-[#4B4A4A]">
														<span className="text-xs opacity-50">{item.time}</span>
													</div>
												</div>
											</div>
										</div>
										<p className="text-sm">{item.commit}</p>
										<p className="text-sm text-gray-500">{item.stats}</p>
									</div>
								</div>
							))}
							<div className="bg-[#E2FEFF] border border-[#3DE1E6] rounded-xl p-5 mt-4">
								<div className="flex items-center gap-1.5 mb-2"><LightIcon /><span className="font-semibold text-[#00B2B8]">Development Insight</span></div>
								<p className="text-sm text-[#373737]">Consistent contributor activity with meaningful commits.</p>
							</div>
						</div>
					)}
				</div>

				<div className={`${activeTab === "All Activity" ? "col-span-1" : "col-span-full"} space-y-5`}>
					{(activeTab === "All Activity" || activeTab === "Reddit") && (
						<div className="bg-[#F6F6F6] p-4 rounded-xl">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									<RedditIcon width={24} height={24} fill="#000" />
									<p className="font-semibold">Latest Reddit Discussions</p>
									<span className="ml-3 text-xs text-[#373737]"><b>156</b> posts today</span>
								</div>
								<button className="text-xs bg-white px-2 py-1.5 rounded">View all on Reddit</button>
							</div>
							{redditActivity.map((post, i) => (
								<div key={i} className="bg-white rounded-xl p-5">
									<div className="space-y-4">
										<div className="flex items-start gap-3">
											<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
												{post.user[1].toUpperCase()}
											</div>
											<div className="flex-1">
												<div className="mb-1">
													<span className="text-sm font-semibold">{post.user}</span>
													<div className="flex items-center gap-2 text-[#4B4A4A]">
														<span className="text-xs opacity-50">r/bonk</span>
														<span>•</span>
														<span className="text-xs opacity-50">{post.time}</span>
														<span>•</span>
														<span className="text-xs"> {post.karma}</span>
													</div>
												</div>
											</div>
											<span className="bg-[#DDFFE4] text-[#16BC00] px-2 py-1 rounded-full text-xs">
												Authentic
											</span>
										</div>
										<p className="text-sm">{post.content}</p>
										<hr className="text-[#C5C5C5]" />
										<div className="flex items-center gap-4 text-sm">
											<div className="flex items-center gap-1">
												<RotateCcw className="w-4 h-4" />
												{post.engagement.upvotes}
											</div>
											<div className="flex items-center gap-1">
												<MessageCircle className="w-4 h-4" />
												{post.engagement.comments}
											</div>
											<span className="ml-auto"><span className="text-[#373737] opacity-50">Sentiment:</span> <b>{post.sentiment}</b></span>
										</div>
									</div>
								</div>
							))}
						</div>
					)}

					{(activeTab === "All Activity" || activeTab === "Youtube") && (
						<div className="bg-[#F6F6F6] p-4 rounded-xl">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									<YoutubeIcon width={24} height={24} fill="#000" />
									<p className="font-semibold">YouTube Community Content</p>
									<span className="ml-3 text-xs text-[#373737]"><b>18</b> videos this week</span>
								</div>
								<button className="text-xs bg-white px-2 py-1.5 rounded">View Channel</button>
							</div>
							{youtubeActivity.map((video, i) => (
								<div key={i} className="bg-white rounded-xl p-5">
									<div className="space-y-4">
										<div className="flex items-start gap-3">
											<div className="w-[100px] h-[50px] bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
												{/* {youtube.user[1].toUpperCase()} */}
											</div>
											<div className="flex-1">
												<div className="mb-1 space-y-1">
													<span className="font-semibold">{video.title}</span>
													<div className="flex items-center gap-2 text-[#4B4A4A]">
														<span className="text-xs opacity-50">{video.channel}</span>
														<span>•</span>
														<span className="text-xs opacity-50">{video.views}</span>
														<span>•</span>
														<span className="text-xs"> {video.time}</span>
													</div>
													<div className="flex items-center gap-4 text-sm">
														<div className="flex items-center gap-1">
															<Heart className="w-4 h-4" />
															{video.engagement.likes}
														</div>
														<div className="flex items-center gap-1">
															<RotateCcw className="w-4 h-4" />
															{video.engagement.shares}
														</div>
														<div className="flex items-center gap-1">
															<MessageCircle className="w-4 h-4" />
															{video.engagement.comments}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default LiveActivity;