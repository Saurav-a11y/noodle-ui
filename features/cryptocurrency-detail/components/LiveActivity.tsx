import { Loader, MessageCircle } from "lucide-react";
import XIcon from "@/icons/XIcon";
import he from 'he'
import { format } from 'date-fns';
import GithubIcon from "@/icons/GithubIcon";
import RedditIcon from "@/icons/RedditIcon";
// import LightIcon from "@/icons/LightIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import { useState } from "react";
import RotateIcon from "@/icons/RotateIcon";
import ChatIcon from "@/icons/ChatIcon";
import TooltipCommon from "../../../components/common/TooltipCommon";
import { useCommunityDataSources } from "../hooks/useCommunityDataSources";
import { useParams } from "next/navigation";
import { calculateEngagementRate, formatNumberShort, formatTimestamp } from "@/lib/format";
import PostAvatar from "@/components/common/PostAvatar";
import Image from "next/image";

const LiveActivity = () => {
	const params = useParams();
	const communityId = params?.slug as string;
	const tokenSymbol = typeof communityId === 'string' ? communityId.replace('USD', '') : '';
	// "All Activity", 
	const tabs = ["Twitter", "Reddit", "GitHub", "YouTube"];
	const [activeTab, setActiveTab] = useState("Twitter");
	const { data, isFetching } = useCommunityDataSources({ symbol: tokenSymbol, platform: activeTab })

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
												<span className="ml-3 text-xs text-[#373737] dark:text-white font-reddit hidden md:block"><b>{formatNumberShort(data?.data?.summary?.total_posts)}</b> mentions</span>
											</div>
											<button className="text-xs bg-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded cursor-pointer font-reddit hidden md:block hover:bg-[#F0F0F0] transition-colors duration-200">View all on Twitter</button>
										</div>
										<div className="flex items-center block md:hidden justify-between mb-4">
											<span className="text-xs text-[#373737] font-reddi"><b>{formatNumberShort(data?.data?.summary?.total_posts)}</b> mentions</span>
											<button className="text-xs bg-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded cursor-pointer font-reddit hover:bg-[#F0F0F0] transition-colors duration-200">View all on Twitter</button>
										</div>
										<div className="space-y-6">
											{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
											{data?.data?.items.map((tweet, index) => (
												<div key={index} className="bg-white dark:bg-[#000] rounded-xl p-5 space-y-4 text-[#373737] dark:text-[#fff]">
													<div className="flex items-start gap-3">
														<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
															<PostAvatar username={tweet.username} src={tweet?.user?.profileImageUrl} />
														</div>
														<div className="flex-1">
															<div className="font-noto">
																<span className="text-sm font-semibold">{tweet.username}</span>
																<div className="flex items-center gap-2 text-[#4B4A4A] dark:text-white">
																	<span className="text-xs opacity-50">{formatTimestamp(tweet.timestamp)}</span>
																	<span>•</span>
																	<span className="text-xs font-medium">{formatNumberShort(tweet.user?.followersCount)} followers</span>
																</div>
															</div>
														</div>
														{tweet.verified && (
															<span className="bg-[#DDFFE4] text-[#16BC00] px-2 py-1 rounded-full text-xs font-reddit">Authentic</span>
														)}
													</div>
													<p className="text-sm font-reddit [&>a]:text-blue-500 leading-[1.7]" dangerouslySetInnerHTML={{ __html: tweet.html }} />
													<hr className="text-[#C5C5C5]" />
													<div className="flex items-center gap-4 text-xs font-medium font-noto">
														<div className="flex items-center gap-1">
															<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
																<path d="M9.38733 3.97987C9.75898 3.561 10.2108 3.22087 10.7161 2.97956C11.2214 2.73824 11.77 2.60065 12.3294 2.5749C12.8888 2.54915 13.4476 2.63577 13.973 2.82964C14.4983 3.02351 14.9795 3.3207 15.388 3.70365C15.7966 4.0866 16.1243 4.54755 16.3517 5.05926C16.5791 5.57098 16.7017 6.12308 16.7121 6.68296C16.7226 7.24283 16.6207 7.79913 16.4126 8.31898C16.2044 8.83884 15.8942 9.31171 15.5003 9.70965L9.34169 15.9274C9.29686 15.9727 9.24349 16.0086 9.18468 16.0331C9.12587 16.0577 9.06277 16.0703 8.99905 16.0703C8.93532 16.0703 8.87223 16.0577 8.81342 16.0331C8.7546 16.0086 8.70124 15.9727 8.6564 15.9274L2.49783 9.70965C1.7511 8.95532 1.31837 7.94578 1.28699 6.88482C1.25561 5.82386 1.62792 4.79051 2.32876 3.99337C3.99248 2.10144 6.93805 2.09501 8.61076 3.97987L8.99905 4.41701L9.38733 3.97987Z" fill="#FF5959" />
															</svg>
															{tweet?.likes}
														</div>
														<div className="flex items-center gap-1"><RotateIcon />{tweet?.retweets}</div>
														<div className="flex items-center gap-1"><ChatIcon className="w-4 h-4" />{tweet?.replies}</div>
														<span className="text-xs ml-auto font-reddit text-[#373737] dark:text-white"><span className="opacity-50">Engagement:</span> <b>{calculateEngagementRate(tweet?.likes, tweet?.retweets, tweet?.replies, tweet.user?.followersCount)}%</b></span>
													</div>
												</div>
											))}
											{/* </div> */}
											{/* <div className="bg-[#FFF7E2] border border-[#FFDA78] rounded-xl p-5">
												<div className="flex items-center gap-1.5 mb-2">
													<RecentActivityDropIcon />
													<span className="font-semibold text-[#DD7519] font-noto">Suspicious Activity Detected</span>
												</div>
												<p className="text-sm text-[#373737] font-reddit">
													47 similar comments posted within 30 minutes by new accounts.
													<button className="text-[#DD7519] underline ml-1 cursor-pointer">View Details</button>
												</p>
											</div> */}
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
												<span className="ml-3 text-xs text-[#373737] dark:text-[#FFF] font-reddit hidden md:block"><b>{formatNumberShort(data?.data?.summary?.total_commits)}</b> commits</span>
											</div>
											<button className="text-xs dark:bg-[#000] dark:hover:bg-[#222] bg-white px-2 py-1.5 rounded cursor-pointer font-reddit hidden md:block hover:bg-[#F0F0F0] transition-colors duration-200">View Repository</button>
										</div>
										<div className="flex items-center justify-between block md:hidden mb-4">
											<span className="ml-3 text-xs text-[#373737] font-reddit"><b>{formatNumberShort(data?.data?.summary?.total_commits)}</b> commits</span>
											<button className="text-xs bg-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded cursor-pointer font-reddit hover:bg-[#F0F0F0] transition-colors duration-200">View Repository</button>
										</div>
										{data?.data?.items?.map((item, i) => (
											<div key={i}>
												{item?.activities?.map((activity, j) => (
													<div key={j} className="space-y-6">
														{activity?.payload?.commits?.map((commit, k) => (
															<div key={k} className="bg-white dark:bg-black rounded-xl p-5">
																<div className="space-y-4">
																	<div className="flex items-start gap-3 font-noto">
																		<div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
																			<Image src="/images/github.png" alt='logo github' width={320} height={320} className="rounded-full" />
																		</div>
																		<div className="flex-1">
																			<div className="mb-1">
																				<span className="text-sm font-semibold">{activity.repo}</span>
																				<div className="flex items-center gap-2 text-[#4B4A4A] dark:text-white">
																					<span className="text-xs opacity-50">{format(new Date(activity?.created_at), 'dd/MM/yyyy')}</span>
																				</div>
																			</div>
																		</div>
																	</div>
																	<p className="text-sm font-reddit">{commit.message}</p>
																	{/* <p className="text-xs text-[#4B4A4A] opacity-50 font-noto dark:text-white">{item.stats}</p> */}
																</div>
															</div>
														))}
													</div>
												))}
											</div>
										))}
										{/* <div className="bg-[#E2FEFF] border border-[#3DE1E6] rounded-xl p-5 mt-4">
											<div className="flex items-center gap-1.5 mb-2"><LightIcon /><span className="font-semibold text-[#00B2B8] font-noto">Development Insight</span></div>
											<p className="text-sm text-[#373737] font-reddit">Consistent contributor activity with meaningful commits.</p>
										</div> */}
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
												<span className="ml-3 text-xs text-[#373737] dark:text-white font-reddit hidden md:block"><b>{formatNumberShort(data?.data?.summary?.total_posts)}</b> posts</span>
											</div>
											<button className="text-xs bg-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded font-reddit hidden md:block cursor-pointer hover:bg-[#F0F0F0] transition-colors duration-200">View all on Reddit</button>
										</div>
										<div className="flex items-center justify-between mb-4 md:hidden">
											<span className="ml-3 text-xs text-[#373737] font-reddit"><b>{formatNumberShort(data?.data?.summary?.total_posts)}</b> posts</span>
											<button className="text-xs bg-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded font-reddit cursor-pointer hover:bg-[#F0F0F0] transition-colors duration-200">View all on Reddit</button>
										</div>
										<div className="space-y-6">
											{data?.data?.items.map((post, i) => (
												<div key={i} className="bg-white dark:bg-black rounded-xl p-5">
													<div className="space-y-4">
														<div className="flex items-start gap-3">
															<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
																<PostAvatar username={post?.data?.subreddit_name_prefixed} src="" />
															</div>
															<div className="flex-1">
																<div className="mb-1 font-noto">
																	<span className="text-sm font-semibold">{post?.data?.subreddit_name_prefixed}</span>
																	<div className="flex items-center gap-2 text-[#4B4A4A] dark:text-white">
																		{/* <span className="text-xs opacity-50">r/bonk</span>
																	<span>•</span> */}
																		<span className="text-xs opacity-50">{formatTimestamp(post?.data?.created)}</span>
																		{/* <span>•</span>
																	<span className="text-xs"> {post.karma}</span> */}
																	</div>
																</div>
															</div>
															{/* <span className="bg-[#DDFFE4] text-[#16BC00] px-2 py-1 rounded-full text-xs font-reddit">
															Authentic
														</span> */}
														</div>
														{post?.data?.title && (
															<p className="font-space text-[#373737] font-medium">{post?.data?.title}</p>
														)}
														{post?.data?.selftext_html && (
															<p
																className="text-sm font-reddit line-clamp-6 overflow-hidden text-[#373737]"
																dangerouslySetInnerHTML={{
																	__html: he.decode(post?.data?.selftext_html || '')
																}}
															/>
														)}
														{post?.data?.thumbnail &&
															/\.(jpg|jpeg|png|gif|webp)$/i.test(post.data.thumbnail) && (
																<Image
																	src={post.data.thumbnail}
																	alt="thumbnail"
																	width={320}
																	height={320}
																	className="w-full h-[240px] rounded-lg object-contain"
																/>
															)}
														<hr className="text-[#C5C5C5]" />
														<div className="flex items-center gap-4 text-sm font-noto text-[#4B4A4A]">
															<div className="flex items-center gap-1 font-medium text-xs dark:text-white">
																<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
																	<path d="M9.38733 3.97987C9.75898 3.561 10.2108 3.22087 10.7161 2.97956C11.2214 2.73824 11.77 2.60065 12.3294 2.5749C12.8888 2.54915 13.4476 2.63577 13.973 2.82964C14.4983 3.02351 14.9795 3.3207 15.388 3.70365C15.7966 4.0866 16.1243 4.54755 16.3517 5.05926C16.5791 5.57098 16.7017 6.12308 16.7121 6.68296C16.7226 7.24283 16.6207 7.79913 16.4126 8.31898C16.2044 8.83884 15.8942 9.31171 15.5003 9.70965L9.34169 15.9274C9.29686 15.9727 9.24349 16.0086 9.18468 16.0331C9.12587 16.0577 9.06277 16.0703 8.99905 16.0703C8.93532 16.0703 8.87223 16.0577 8.81342 16.0331C8.7546 16.0086 8.70124 15.9727 8.6564 15.9274L2.49783 9.70965C1.7511 8.95532 1.31837 7.94578 1.28699 6.88482C1.25561 5.82386 1.62792 4.79051 2.32876 3.99337C3.99248 2.10144 6.93805 2.09501 8.61076 3.97987L8.99905 4.41701L9.38733 3.97987Z" fill="#FF5959" />
																</svg>
																{formatNumberShort(post?.data?.ups)}
															</div>
															<div className="flex items-center gap-1 font-medium text-xs dark:text-white">
																<ChatIcon />
																{formatNumberShort(post?.data?.num_comments)}
															</div>
															<span className="ml-auto font-reddit text-sm text-[#373737] dark:text-white"><span className="opacity-50 text-xs">Sentiment:</span> <b>Positive</b></span>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								)}
							</>
						)}

						{(activeTab === "All Activity" || activeTab === "YouTube") && (
							<>
								{isFetching && <p className="flex justify-center font-noto"><Loader className="animate-spin" /></p>}
								{!isFetching && data?.data?.items?.length === 0 && (
									<p className="text-center font-reddit text-[#373737] dark:text-white">No Videos activity found for this community.</p>
								)}
								{!isFetching && data?.data?.items?.length > 0 && (
									<div className="bg-[#F6F6F6] dark:bg-[#1A1A1A] p-4 rounded-xl">
										<div className="flex items-center justify-between mb-2 md:mb-4 space-x-2">
											<div className="flex items-center gap-2">
												<YoutubeIcon width={24} height={24} fill="#000" />
												<p className="font-semibold font-noto">YouTube Community Content</p>
												<span className="ml-3 text-xs text-[#373737] dark:text-white font-reddit hidden md:block"><b>{formatNumberShort(data?.data?.summary?.total_posts)}</b> videos</span>
											</div>
											<button className="text-xs bg-white text-[#373737] dark:text-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded font-reddit hidden md:block cursor-pointer hover:bg-[#F0F0F0] transition-colors duration-200">View Channel</button>
										</div>
										<div className="flex items-center justify-between mb-4 md:hidden">
											<span className="ml-3 text-xs text-[#373737] font-reddit"><b>{formatNumberShort(data?.data?.summary?.total_posts)}</b> videos</span>
											<button className="text-xs bg-white text-[#373737] dark:text-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded font-reddit cursor-pointer hover:bg-[#F0F0F0] transition-colors duration-200">View Channel</button>
										</div>
										{data?.data?.items?.map((video, i) => (
											<div key={i} className="space-y-6">
												{video?.recentVideos?.map((v, x) =>
													<div key={x} className="bg-white dark:bg-[#000] dark:hover:bg-[#222] rounded-xl p-5">
														<div className="">
															<div className="flex items-start gap-3">
																<div className="w-[100px] flex items-center justify-center text-white font-bold">
																	<Image src="https://cdn.pixabay.com/photo/2016/11/19/03/08/youtube-1837872_1280.png" alt="Logo" width={320} height={320} className="w-[100px]" />
																</div>
																<div className="flex-1">
																	<div className="mb-1 space-y-1">
																		<span className="font-semibold font-noto text-[#373737] dark:text-white line-clamp-2">{v.title}</span>
																		<div className="flex items-center gap-2 text-[#4B4A4A] dark:text-white font-noto hidden md:flex">
																			<span className="text-xs opacity-50">{video.title}</span>
																			<span>•</span>
																			<span className="text-xs font-medium">{formatNumberShort(v.views)} views</span>
																			<span>•</span>
																			<span className="text-xs font-medium"> {format(new Date(v?.publishedAt), 'dd/MM/yyyy')}</span>
																		</div>
																		<div className="flex items-center gap-4 text-xs font-noto text-[#4B4A4A] dark:text-white hidden md:flex">
																			<div className="flex items-center gap-1">
																				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
																					<path d="M9.38733 3.97987C9.75898 3.561 10.2108 3.22087 10.7161 2.97956C11.2214 2.73824 11.77 2.60065 12.3294 2.5749C12.8888 2.54915 13.4476 2.63577 13.973 2.82964C14.4983 3.02351 14.9795 3.3207 15.388 3.70365C15.7966 4.0866 16.1243 4.54755 16.3517 5.05926C16.5791 5.57098 16.7017 6.12308 16.7121 6.68296C16.7226 7.24283 16.6207 7.79913 16.4126 8.31898C16.2044 8.83884 15.8942 9.31171 15.5003 9.70965L9.34169 15.9274C9.29686 15.9727 9.24349 16.0086 9.18468 16.0331C9.12587 16.0577 9.06277 16.0703 8.99905 16.0703C8.93532 16.0703 8.87223 16.0577 8.81342 16.0331C8.7546 16.0086 8.70124 15.9727 8.6564 15.9274L2.49783 9.70965C1.7511 8.95532 1.31837 7.94578 1.28699 6.88482C1.25561 5.82386 1.62792 4.79051 2.32876 3.99337C3.99248 2.10144 6.93805 2.09501 8.61076 3.97987L8.99905 4.41701L9.38733 3.97987Z" fill="#FF5959" />
																				</svg>
																				{v?.likes}
																			</div>
																			{/* <div className="flex items-center gap-1">
																				<RotateIcon />
																				{video.engagement.shares}
																			</div> */}
																			<div className="flex items-center gap-1">
																				<ChatIcon />
																				{v?.comments}
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="flex items-center mt-2 md:mt-4 gap-2 text-[#4B4A4A] font-noto md:hidden">
																<span className="text-xs opacity-50">{video.title}</span>
																<span>•</span>
																<span className="text-xs font-medium">{formatNumberShort(v.views)} views</span>
																<span>•</span>
																<span className="text-xs font-medium"> {format(new Date(v?.publishedAt), 'dd/MM/yyyy')}</span>
															</div>
															<div className="flex items-center mt-2 md:mt-4 gap-4 text-xs font-noto text-[#4B4A4A] flex md:hidden">
																<div className="flex items-center gap-1">
																	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
																		<path d="M9.38733 3.97987C9.75898 3.561 10.2108 3.22087 10.7161 2.97956C11.2214 2.73824 11.77 2.60065 12.3294 2.5749C12.8888 2.54915 13.4476 2.63577 13.973 2.82964C14.4983 3.02351 14.9795 3.3207 15.388 3.70365C15.7966 4.0866 16.1243 4.54755 16.3517 5.05926C16.5791 5.57098 16.7017 6.12308 16.7121 6.68296C16.7226 7.24283 16.6207 7.79913 16.4126 8.31898C16.2044 8.83884 15.8942 9.31171 15.5003 9.70965L9.34169 15.9274C9.29686 15.9727 9.24349 16.0086 9.18468 16.0331C9.12587 16.0577 9.06277 16.0703 8.99905 16.0703C8.93532 16.0703 8.87223 16.0577 8.81342 16.0331C8.7546 16.0086 8.70124 15.9727 8.6564 15.9274L2.49783 9.70965C1.7511 8.95532 1.31837 7.94578 1.28699 6.88482C1.25561 5.82386 1.62792 4.79051 2.32876 3.99337C3.99248 2.10144 6.93805 2.09501 8.61076 3.97987L8.99905 4.41701L9.38733 3.97987Z" fill="#FF5959" />
																	</svg>
																	{v?.likes}
																</div>
																{/* <div className="flex items-center gap-1">
																	<RotateCcw className="w-4 h-4" />
																	{video.engagement.shares}
																</div> */}
																<div className="flex items-center gap-1">
																	<MessageCircle className="w-4 h-4" />
																	{v?.comments}
																</div>
															</div>
														</div>
													</div>
												)}
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