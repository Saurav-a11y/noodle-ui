import { Heart, Loader, MessageCircle, RotateCcw } from "lucide-react";
import XIcon from "@/icons/XIcon";
import RecentActivityDropIcon from "@/icons/RecentActivityDropIcon";
import GithubIcon from "@/icons/GithubIcon";
import RedditIcon from "@/icons/RedditIcon";
import LightIcon from "@/icons/LightIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import { useState } from "react";
import RotateIcon from "@/icons/RotateIcon";
import ChatIcon from "@/icons/ChatIcon";
import TooltipCommon from "../../../components/common/TooltipCommon";
import { useCommunityDataSources } from "../hooks/useCommunityDataSources";
import { useParams } from "next/navigation";
import { formattedDate } from "@/lib/format";
import Image from "next/image";

const LiveActivity = () => {
	const params = useParams();
	const communityId = params?.slug as string;

	// "All Activity", 
	const tabs = ["Twitter", "Reddit", "GitHub", "YouTube"];
	const [activeTab, setActiveTab] = useState("Twitter");
	console.log("🚀 ~ LiveActivity ~ activeTab:", activeTab)
	const { data, isFetching } = useCommunityDataSources({ symbol: communityId, platform: activeTab })
	console.log("🚀 ~ LiveActivity ~ data:", data)

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
		<div className="text-[#1E1B39] dark:text-white">
			<div className="flex items-center gap-2 mb-3">
				<h3 className="text-xl font-semibold font-noto">Live Community Data Sources</h3>
				<TooltipCommon content="Real-time data pulled from Twitter, Reddit, GitHub, YouTube, and blockchain activity. Powers all insights shown on this dashboard." />
			</div>

			<div className="flex items-center gap-2 mb-4 border-b border-[#C5C5C5] overflow-scroll">
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`border-b-2 px-4 py-2 text-sm text-[#373737] dark:text-white font-medium transition-all duration-200 cursor-pointer font-reddit hover:bg-[#F0F0F0] dark:hover:bg-[#222] hover:rounded-t ${activeTab === tab
							? "border-[#7FCE00] font-semibold"
							: "border-transparent"
							}`}
					>
						{tab}
					</button>
				))}
			</div>

			<div className={`grid ${activeTab === "All Activity" ? "grid-cols-2" : "grid-cols-1"} gap-6 min-h-[500px]`}>
				{["All Activity", "Twitter", "GitHub"].includes(activeTab) && (
					<div className={`${activeTab === "All Activity" ? "col-span-full md:col-span-1" : "col-span-full"} space-y-5`}>
						{(activeTab === "All Activity" || activeTab === "Twitter") && (
							<>
								{isFetching && <p className="flex justify-center font-noto"><Loader className="animate-spin" /></p>}
								{!isFetching && data?.data?.items?.length === 0 && (
									<>

										<p className="text-center font-reddit text-[#373737] dark:text-white">No Twitter activity found for this community.</p>
									</>
								)}
								{!isFetching && data?.data?.items?.length > 0 && (
									<div className="bg-[#F6F6F6] dark:bg-[#1A1A1A] p-4 rounded-xl">
										<div className="flex items-center justify-between mb-2 md:mb-4 space-x-2">
											<div className="flex items-center text-black dark:text-white gap-2">
												<XIcon width={24} height={24} />
												<p className="font-semibold font-noto">Latest Twitter Activity</p>
												<span className="ml-3 text-xs text-[#373737] dark:text-white font-reddit hidden md:block"><b>2.3K</b> mentions today</span>
											</div>
											<button className="text-xs bg-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded cursor-pointer font-reddit hidden md:block hover:bg-[#F0F0F0] transition-colors duration-200">View all on Twitter</button>
										</div>
										<div className="flex items-center block md:hidden justify-between mb-4">
											<span className="text-xs text-[#373737] font-reddi"><b>2.3K</b> mentions today</span>
											<button className="text-xs bg-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded cursor-pointer font-reddit hover:bg-[#F0F0F0] transition-colors duration-200">View all on Twitter</button>
										</div>
										<div className="space-y-4">
											{data?.data?.items.map((tweet, index) => (
												<div key={index} className="bg-white dark:bg-[#000] rounded-xl p-5 space-y-4 text-[#373737] dark:text-[#fff]">
													<div className="flex items-start gap-3">
														<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
															<Image src={tweet?.profileImageUrl} alt="Avatar" height={40} width={40} />
														</div>
														<div className="flex-1">
															<div className="mb-1 font-noto">
																<span className="text-sm font-semibold">{tweet.userName}</span>
																<div className="flex items-center gap-2 text-[#4B4A4A] dark:text-white">
																	<span className="text-xs opacity-50">{tweet.metrics?.followers_count}</span>
																	<span>•</span>
																	<span className="text-xs">{formattedDate(tweet.createdAt)}</span>
																</div>
															</div>
														</div>
														{tweet.verified && (
															<span className="bg-[#DDFFE4] text-[#16BC00] px-2 py-1 rounded-full text-xs font-reddit">Authentic</span>
														)}
													</div>
													<p className="text-sm font-reddit">{tweet.description}</p>
													<hr className="text-[#C5C5C5]" />
													<div className="flex items-center gap-4 text-xs font-medium font-noto">
														<div className="flex items-center gap-1"><Heart className="w-4 h-4" />{tweet.engagement.likes}</div>
														<div className="flex items-center gap-1"><RotateIcon />{tweet.engagement.retweets}</div>
														<div className="flex items-center gap-1"><ChatIcon className="w-4 h-4" />{tweet.engagement.replies}</div>
														<span className="text-xs ml-auto font-reddit text-[#373737] dark:text-white"><span className="opacity-50">Engagement:</span> <b>{tweet.engagement.rate}</b></span>
													</div>
												</div>
											))}
											<div className="bg-[#FFF7E2] border border-[#FFDA78] rounded-xl p-5">
												<div className="flex items-center gap-1.5 mb-2">
													<RecentActivityDropIcon />
													<span className="font-semibold text-[#DD7519] font-noto">Suspicious Activity Detected</span>
												</div>
												<p className="text-sm text-[#373737] font-reddit">
													47 similar comments posted within 30 minutes by new accounts.
													<button className="text-[#DD7519] underline ml-1 cursor-pointer">View Details</button>
												</p>
											</div>
										</div>
									</div>
								)}
							</>
						)}

						{(activeTab === "All Activity" || activeTab === "GitHub") && (
							<>
								{isFetching && <p className="flex justify-center font-noto"><Loader className="animate-spin" /></p>}
								{!isFetching && data?.data?.items?.length === 0 && (
									<p className="text-center font-reddit text-[#373737] dark:text-white">No GitHub activity found for this community.</p>
								)}
								{!isFetching && data?.data?.items?.length > 0 && (
									<div className="bg-[#F6F6F6] dark:bg-[#1A1A1A] p-4 rounded-xl">
										<div className="flex items-center justify-between mb-2 md:mb-4 space-x-2">
											<div className="flex items-center gap-2">
												<GithubIcon width={24} height={24} />
												<p className="font-semibold font-noto">GitHub Development Activity</p>
												<span className="ml-3 text-xs text-[#373737] dark:text-[#FFF] font-reddit hidden md:block"><b>12</b> commits this month</span>
											</div>
											<button className="text-xs dark:bg-[#000] dark:hover:bg-[#222] bg-white px-2 py-1.5 rounded cursor-pointer font-reddit hidden md:block hover:bg-[#F0F0F0] transition-colors duration-200">View Repository</button>
										</div>
										<div className="flex items-center justify-between block md:hidden mb-4">
											<span className="ml-3 text-xs text-[#373737] font-reddit"><b>12</b> commits this month</span>
											<button className="text-xs bg-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded cursor-pointer font-reddit hover:bg-[#F0F0F0] transition-colors duration-200">View Repository</button>
										</div>
										{githubActivity.map((item, i) => (
											<div key={i} className="bg-white dark:bg-black rounded-xl p-5">
												<div className="space-y-4">
													<div className="flex items-start gap-3 font-noto">
														<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
															{/* {github.user[1].toUpperCase()} */}
														</div>
														<div className="flex-1">
															<div className="mb-1">
																<span className="text-sm font-semibold">{item.repo}</span>
																<div className="flex items-center gap-2 text-[#4B4A4A] dark:text-white">
																	<span className="text-xs opacity-50">{item.time}</span>
																</div>
															</div>
														</div>
													</div>
													<p className="text-sm font-reddit">{item.commit}</p>
													<p className="text-xs text-[#4B4A4A] opacity-50 font-noto dark:text-white">{item.stats}</p>
												</div>
											</div>
										))}
										<div className="bg-[#E2FEFF] border border-[#3DE1E6] rounded-xl p-5 mt-4">
											<div className="flex items-center gap-1.5 mb-2"><LightIcon /><span className="font-semibold text-[#00B2B8] font-noto">Development Insight</span></div>
											<p className="text-sm text-[#373737] font-reddit">Consistent contributor activity with meaningful commits.</p>
										</div>
									</div>
								)}
							</>
						)}
					</div>
				)}
				{["All Activity", "Reddit", "YouTube"].includes(activeTab) && (
					<div className={`${activeTab === "All Activity" ? "col-span-full md:col-span-1" : "col-span-full"} space-y-5`}>
						{(activeTab === "All Activity" || activeTab === "Reddit") && (
							<>
								{isFetching && <p className="flex justify-center font-noto"><Loader className="animate-spin" /></p>}
								{!isFetching && data?.data?.items?.length === 0 && (
									<p className="text-center font-reddit text-[#373737] dark:text-white">No Reddit activity found for this community.</p>
								)}
								{!isFetching && data?.data?.items?.length > 0 && (
									<div className="bg-[#F6F6F6] dark:bg-[#1A1A1A] p-4 rounded-xl">
										<div className="flex items-center justify-between mb-2 md:mb-4 space-x-2">
											<div className="flex items-center gap-2">
												<RedditIcon width={24} height={24} fill="#000" />
												<p className="font-semibold font-noto">Latest Reddit Discussions</p>
												<span className="ml-3 text-xs text-[#373737] dark:text-white font-reddit hidden md:block"><b>156</b> posts today</span>
											</div>
											<button className="text-xs bg-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded font-reddit hidden md:block cursor-pointer hover:bg-[#F0F0F0] transition-colors duration-200">View all on Reddit</button>
										</div>
										<div className="flex items-center justify-between mb-4 md:hidden">
											<span className="ml-3 text-xs text-[#373737] font-reddit"><b>156</b> posts today</span>
											<button className="text-xs bg-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded font-reddit cursor-pointer hover:bg-[#F0F0F0] transition-colors duration-200">View all on Reddit</button>
										</div>
										{redditActivity.map((post, i) => (
											<div key={i} className="bg-white dark:bg-black rounded-xl p-5">
												<div className="space-y-4">
													<div className="flex items-start gap-3">
														<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
															{post.user[1].toUpperCase()}
														</div>
														<div className="flex-1">
															<div className="mb-1 font-noto">
																<span className="text-sm font-semibold">{post.user}</span>
																<div className="flex items-center gap-2 text-[#4B4A4A] dark:text-white">
																	<span className="text-xs opacity-50">r/bonk</span>
																	<span>•</span>
																	<span className="text-xs opacity-50">{post.time}</span>
																	<span>•</span>
																	<span className="text-xs"> {post.karma}</span>
																</div>
															</div>
														</div>
														<span className="bg-[#DDFFE4] text-[#16BC00] px-2 py-1 rounded-full text-xs font-reddit">
															Authentic
														</span>
													</div>
													<p className="text-sm font-reddit">{post.content}</p>
													<hr className="text-[#C5C5C5]" />
													<div className="flex items-center gap-4 text-sm font-noto text-[#4B4A4A]">
														<div className="flex items-center gap-1 font-medium text-xs dark:text-white">
															<Heart className="w-4 h-4" />
															{post.engagement.upvotes}
														</div>
														<div className="flex items-center gap-1 font-medium text-xs dark:text-white">
															<ChatIcon />
															{post.engagement.comments}
														</div>
														<span className="ml-auto font-reddit text-sm text-[#373737] dark:text-white"><span className="opacity-50 text-xs">Sentiment:</span> <b>{post.sentiment}</b></span>
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</>
						)}

						{(activeTab === "All Activity" || activeTab === "YouTube") && (
							<>
								{isFetching && <p className="flex justify-center font-noto"><Loader className="animate-spin" /></p>}
								{!isFetching && data?.data?.items?.length === 0 && (
									<p className="text-center font-reddit text-[#373737] dark:text-white">No Reddit activity found for this community.</p>
								)}
								{!isFetching && data?.data?.items?.length > 0 && (
									<div className="bg-[#F6F6F6] dark:bg-[#1A1A1A] p-4 rounded-xl">
										<div className="flex items-center justify-between mb-2 md:mb-4 space-x-2">
											<div className="flex items-center gap-2">
												<YoutubeIcon width={24} height={24} fill="#000" />
												<p className="font-semibold font-noto">YouTube Community Content</p>
												<span className="ml-3 text-xs text-[#373737] dark:text-white font-reddit hidden md:block"><b>18</b> videos this week</span>
											</div>
											<button className="text-xs bg-white text-[#373737] dark:text-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded font-reddit hidden md:block cursor-pointer hover:bg-[#F0F0F0] transition-colors duration-200">View Channel</button>
										</div>
										<div className="flex items-center justify-between mb-4 md:hidden">
											<span className="ml-3 text-xs text-[#373737] font-reddit"><b>18</b> videos this week</span>
											<button className="text-xs bg-white text-[#373737] dark:text-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded font-reddit cursor-pointer hover:bg-[#F0F0F0] transition-colors duration-200">View Channel</button>
										</div>
										{youtubeActivity.map((video, i) => (
											<div key={i} className="bg-white dark:bg-[#000] dark:hover:bg-[#222] rounded-xl p-5">
												<div className="space-y-2 md:space-y-4">
													<div className="flex items-start gap-3">
														<div className="w-[100px] h-[50px] bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
															{/* {youtube.user[1].toUpperCase()} */}
														</div>
														<div className="flex-1">
															<div className="mb-1 space-y-1">
																<span className="font-semibold font-noto text-[#373737] dark:text-white line-clamp-2">{video.title}</span>
																<div className="flex items-center gap-2 text-[#4B4A4A] dark:text-white font-noto hidden md:flex">
																	<span className="text-xs opacity-50">{video.channel}</span>
																	<span>•</span>
																	<span className="text-xs font-medium">{video.views}</span>
																	<span>•</span>
																	<span className="text-xs font-medium"> {video.time}</span>
																</div>
																<div className="flex items-center gap-4 text-xs font-noto text-[#4B4A4A] dark:text-white hidden md:flex">
																	<div className="flex items-center gap-1">
																		<Heart className="w-4 h-4" />
																		{video.engagement.likes}
																	</div>
																	<div className="flex items-center gap-1">
																		<RotateIcon />
																		{video.engagement.shares}
																	</div>
																	<div className="flex items-center gap-1">
																		<ChatIcon />
																		{video.engagement.comments}
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="flex items-center gap-2 text-[#4B4A4A] font-noto md:hidden">
														<span className="text-xs opacity-50">{video.channel}</span>
														<span>•</span>
														<span className="text-xs font-medium">{video.views}</span>
														<span>•</span>
														<span className="text-xs font-medium"> {video.time}</span>
													</div>
													<div className="flex items-center gap-4 text-xs font-noto text-[#4B4A4A] flex md:hidden">
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
										))}
									</div>
								)}
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default LiveActivity;