import { Loader, MessageCircle, Bookmark, Eye } from "lucide-react";
import XIcon from "@/icons/XIcon";
import he from 'he'
import { formatDistanceToNow } from 'date-fns';
import GithubIcon from "@/icons/GithubIcon";
import RedditIcon from "@/icons/RedditIcon";
// import LightIcon from "@/icons/LightIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import { useState, useEffect, useRef } from "react";
import RotateIcon from "@/icons/RotateIcon";
import ChatIcon from "@/icons/ChatIcon";
import TooltipCommon from "../../../components/common/TooltipCommon";
import { useParams } from "next/navigation";
import { calculateEngagementRate, formatNumberShort, formatTimestamp } from "@/lib/format";
import PostAvatar from "@/components/common/PostAvatar";
import Image from "next/image";
import Link from "next/link";
import _map from 'lodash/map';
import { fetchCommunityDataSources } from "@/apis";
import AuthenticIcon from "@/icons/AuthenticIcon";
import UpVoteIcon from "@/icons/UpVoteIcon";
import DownVoteIcon from "@/icons/DownVoteIcon";
import RewardIcon from "@/icons/RewardIcon";
import TwitterCommunityLoading from "@/components/common/loading/TwiiterCommunityLoading";
import { YoutubeCommunityLoading } from "@/components/common/loading/YoutubeCommunityLoading";
import RedditCommunityLoading from "@/components/common/loading/RedditCommunityLoading";
import GithubCommunityLoading from "@/components/common/loading/GithubCommunityLoading";

export const formatTweetText = (text: string): string => {
	if (!text) return '';

	// Escape HTML
	let formatted = text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

	// Replace URLs with anchor
	formatted = formatted.replace(
		/(https?:\/\/[^\s]+)/g,
		(url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
	);

	// Replace @mentions
	formatted = formatted.replace(
		/@(\w+)/g,
		(mention) => `<a href="https://twitter.com/${mention.slice(1)}" target="_blank" rel="noopener noreferrer">${mention}</a>`
	);

	// Replace #hashtags
	formatted = formatted.replace(
		/#(\w+)/g,
		(hashtag) => `<a href="https://twitter.com/hashtag/${hashtag.slice(1)}" target="_blank" rel="noopener noreferrer">#${hashtag.slice(1)}</a>`
	);

	// Replace \n with <br>
	formatted = formatted.replace(/\n/g, '<br>');

	return formatted;
};

const LiveActivity = () => {
	const params = useParams();
	const communityId = params?.slug as string;
	const tokenSymbol = typeof communityId === 'string' ? communityId.replace('USD', '') : '';
	// "All Activity", 
	const tabs = ["Twitter", "Reddit", "GitHub", "YouTube"];
	const [activeTab, setActiveTab] = useState("Twitter");
	const [page, setPage] = useState(1);
	const [data, setData] = useState<any[]>([]);
	console.log("🚀 ~ LiveActivity ~ data:", data)
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [totalItems, setTotalitems] = useState<number>(0);
	const scrollRef = useRef<HTMLDivElement>(null);

	const fetchData = async (pageToFetch: number, replace = false) => {
		const response = await fetchCommunityDataSources({
			symbol: tokenSymbol,
			platform: activeTab,
			page: pageToFetch.toString(),
		});

		const items = response?.data?.items || [];
		const total = response?.data?.summary?.total_posts || response?.data?.summary?.total_videos || response?.data?.summary?.total_commits || 0;

		if (replace) {
			setData(items);
		} else {
			setData((prev) => [...prev, ...items]);
		}
		setTotalitems(total);
	};

	const handleScroll = () => {
		if (!scrollRef.current || isLoadingMore || data.length >= totalItems) return;

		const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
		if (scrollTop + clientHeight >= scrollHeight - 200) {
			setIsLoadingMore(true);
			const nextPage = page + 1;
			fetchData(nextPage).then(() => {
				setPage(nextPage);
				setIsLoadingMore(false);
			});
		}
	};

	// Fetch data khi đổi tab hoặc symbol
	useEffect(() => {
		if (!tokenSymbol) return;
		setIsLoading(true);
		setPage(1);
		fetchData(1, true).finally(() => setIsLoading(false));
	}, [tokenSymbol, activeTab]);


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

			<div
				ref={scrollRef}
				onScroll={handleScroll}
				className={`grid ${activeTab === "All Activity" ? "grid-cols-2" : "grid-cols-1"} gap-6 h-[800px] overflow-auto`}>
				{["All Activity", "Twitter", "GitHub"].includes(activeTab) && (
					<div className={`${activeTab === "All Activity" ? "col-span-full md:col-span-1" : "col-span-full"} space-y-5`}>
						{(activeTab === "All Activity" || activeTab === "Twitter") && (
							<>
								{isLoading && (
									<div className="space-y-6">
										{[...Array(3)].map((_, i) => (
											<TwitterCommunityLoading key={i} />
										))}
									</div>
								)}
								{!isLoading && data.length === 0 && (
									<div className="py-20 animate-fade-in">
										<div className="flex flex-col items-center">
											<Image
												src="/images/twitter-notfound.png"
												alt="Twitter activity not available"
												width={180}
												height={180}
												className="mb-5"
											/>
											<h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
												Twitter activity isn’t available yet.
											</h3>
											<p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm text-center">
												We couldn't display Twitter videos for this community at the moment.
											</p>
										</div>
									</div>
								)}
								{!isLoading && data?.length > 0 && (
									<div className="bg-[#F6F6F6] dark:bg-[#1A1A1A] p-4 rounded-xl">
										<div className="flex items-center justify-between mb-2 md:mb-4 space-x-2">
											<div className="flex items-center text-black dark:text-white gap-2">
												<XIcon width={24} height={24} />
												<p className="font-semibold font-noto">Latest Twitter Activity</p>
												<div className="border-l h-4 border-[#000] opacity-50 mx-2" />
												<span className="text-xs text-[#373737] dark:text-white font-reddit hidden md:block"><b>{formatNumberShort(totalItems)}</b> mentions</span>
											</div>
										</div>
										<div className="flex items-center block md:hidden justify-between mb-4">
											<span className="text-xs text-[#373737] font-reddi"><b>{formatNumberShort(totalItems)}</b> mentions</span>
										</div>
										<div className="space-y-5">
											{_map(data, (tweet, index) => {
												const isReTweet = tweet?.dataType === "retweet";
												return (
													<div key={index} className="bg-white dark:bg-[#000] rounded-xl p-5 space-y-4 text-[#373737] dark:text-[#fff]">
														<div>
															{isReTweet && (
																<p className="ml-6 flex items-center gap-1.5 text-xs font-medium font-noto mb-1.5">
																	<RotateIcon />
																	<span>{tweet?.name} reposted</span>
																</p>
															)}
															<div className="flex items-start gap-3">
																<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
																	<PostAvatar username={isReTweet ? tweet?.info_retweet?.username : tweet?.username} src={isReTweet ? tweet?.info_retweet?.profile_image_url : tweet?.profile_image_url} />
																</div>
																<div className="flex-1">
																	<div className="font-noto">
																		<div className="flex gap-1.5 items-center">
																			<span className="text-sm font-semibold">{isReTweet ? tweet?.info_retweet?.name : tweet?.name}</span>
																			{(isReTweet ? tweet?.info_retweet?.verified : tweet?.verified) && (
																				<span className="w-5 h-5 flex text-blue-500"><AuthenticIcon /></span>
																			)}
																			<span className="text-xs">@{isReTweet ? tweet?.info_retweet?.username : tweet?.username}</span>
																		</div>
																		<div className="flex items-center gap-2 text-[#4B4A4A] dark:text-white">
																			<span className="text-xs opacity-50">
																				{(isReTweet ? tweet?.info_retweet?.created_at : tweet?.created_at)
																					? formatDistanceToNow(new Date(isReTweet ? tweet?.info_retweet?.created_at : tweet?.created_at), { addSuffix: true, })
																					: 'Unknown'}
																			</span>
																			<span>•</span>
																			<span className="text-xs font-medium">{formatNumberShort(isReTweet ? tweet?.info_retweet?.followers_count : tweet?.followers_count ?? 0)} followers</span>
																		</div>
																	</div>
																</div>
																<Link href={`https://x.com/${tweet?.username}/status/${tweet?.id}`} target="_blank" className="border border-[#E8E8E8] text-xs bg-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded cursor-pointer font-reddit hidden md:block hover:bg-[#F0F0F0] transition-colors duration-200">View on Twitter</Link>
															</div>
														</div>
														<p
															className="text-sm font-reddit [&>a]:text-blue-500 leading-[1.7]"
															dangerouslySetInnerHTML={{
																__html: formatTweetText(isReTweet ? tweet?.info_retweet?.text : tweet?.text),
															}}
														/>
														<hr className="text-[#C5C5C5]" />
														<div className="flex items-center gap-4 text-xs font-medium font-noto">
															<div className="flex items-center gap-1">
																<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
																	<path d="M9.38733 3.97987C9.75898 3.561 10.2108 3.22087 10.7161 2.97956C11.2214 2.73824 11.77 2.60065 12.3294 2.5749C12.8888 2.54915 13.4476 2.63577 13.973 2.82964C14.4983 3.02351 14.9795 3.3207 15.388 3.70365C15.7966 4.0866 16.1243 4.54755 16.3517 5.05926C16.5791 5.57098 16.7017 6.12308 16.7121 6.68296C16.7226 7.24283 16.6207 7.79913 16.4126 8.31898C16.2044 8.83884 15.8942 9.31171 15.5003 9.70965L9.34169 15.9274C9.29686 15.9727 9.24349 16.0086 9.18468 16.0331C9.12587 16.0577 9.06277 16.0703 8.99905 16.0703C8.93532 16.0703 8.87223 16.0577 8.81342 16.0331C8.7546 16.0086 8.70124 15.9727 8.6564 15.9274L2.49783 9.70965C1.7511 8.95532 1.31837 7.94578 1.28699 6.88482C1.25561 5.82386 1.62792 4.79051 2.32876 3.99337C3.99248 2.10144 6.93805 2.09501 8.61076 3.97987L8.99905 4.41701L9.38733 3.97987Z" fill="#FF5959" />
																</svg>
																{isReTweet ? tweet?.info_retweet?.public_metrics?.like_count : tweet?.public_metrics?.like_count}
															</div>
															<div className="flex items-center gap-1"><RotateIcon />{isReTweet ? tweet?.info_retweet?.public_metrics?.retweet_count : tweet?.public_metrics?.retweet_count}</div>
															<div className="flex items-center gap-1"><ChatIcon className="w-4 h-4" />{isReTweet ? tweet?.info_retweet?.public_metrics?.reply_count : tweet?.public_metrics?.reply_count}</div>
															<div className="flex items-center gap-1"><Eye className="w-4 h-4" />{isReTweet ? tweet?.info_retweet?.public_metrics?.reply_count : tweet?.public_metrics?.impression_count}</div>
															<div className="flex items-center gap-1"><Bookmark className="w-4 h-4" />{isReTweet ? tweet?.info_retweet?.public_metrics?.bookmark_count : tweet?.public_metrics?.bookmark_count}</div>
															<span className="text-xs ml-auto font-reddit text-[#373737] dark:text-white"><span className="opacity-50">Engagement:</span> <b>{calculateEngagementRate(
																isReTweet ? tweet?.info_retweet?.public_metrics?.like_count : tweet?.public_metrics?.like_count,
																isReTweet ? tweet?.info_retweet?.public_metrics?.retweet_count : tweet?.public_metrics?.retweet_count,
																isReTweet ? tweet?.info_retweet?.public_metrics?.reply_count : tweet?.public_metrics?.reply_count,
																isReTweet ? tweet?.info_retweet?.public_metrics?.impression_count : tweet?.public_metrics?.impression_count,
																isReTweet ? tweet?.info_retweet?.public_metrics?.bookmark_count : tweet?.public_metrics?.bookmark_count,
																isReTweet ? tweet?.info_retweet?.followers_count : tweet?.followers_count)}%</b>
															</span>
														</div>
													</div>
												)
											})}
											{!isLoadingMore && (
												<div className="space-y-4">
													{[...Array(5)].map((_, i) => (
														<TwitterCommunityLoading key={i} />
													))}
												</div>
											)}
										</div>
									</div>
								)}
							</>
						)}

						{(activeTab === "All Activity" || activeTab === "GitHub") && (
							<>
								{isLoading && <div className="space-y-6">
									{[...Array(5)].map((_, i) => (
										<GithubCommunityLoading key={i} />
									))}
								</div>}
								{!isLoading && data?.length === 0 && (
									<div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in py-20">
										<Image
											src="/images/github-notfound.png"
											alt="GitHub activity not available"
											width={220}
											height={220}
										/>
										<p className="text-base text-[#4B4A4A] dark:text-gray-300 font-medium font-reddit">
											GitHub activity isn’t available yet.
										</p>
										<p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
											We couldn't display GitHub contributions for this community at the moment.
										</p>
									</div>
								)}
								{!isLoading && data?.length > 0 && (
									<div className="bg-[#F6F6F6] dark:bg-[#1A1A1A] p-4 rounded-xl">
										<div className="flex items-center justify-between mb-2 md:mb-4 space-x-2">
											<div className="flex items-center gap-2">
												<GithubIcon width={24} height={24} />
												<p className="font-semibold font-noto">GitHub Development Activity</p>
												<div className="border-l h-4 border-[#000] opacity-50 mx-2" />
												<span className="text-xs text-[#373737] dark:text-[#FFF] font-reddit hidden md:block"><b>{formatNumberShort(totalItems)}</b> commits</span>
											</div>
										</div>
										<div className="space-y-6">
											{_map(data, (item, i) => (
												<div key={i} className="bg-white dark:bg-black rounded-xl p-5">
													<div className="space-y-4">
														<div className="flex items-start gap-3 font-noto">
															<div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
																<Image src="/images/github.png" alt='logo github' width={320} height={320} className="rounded-full" />
															</div>
															<div className="flex-1">
																<div>
																	<p className="text-sm font-semibold mb-1">{item.repo}</p>
																	<div className="flex items-center gap-2 text-[#4B4A4A] dark:text-white">
																		<span className="text-xs opacity-50">
																			{item?.created_at
																				? formatDistanceToNow(new Date(item.created_at), { addSuffix: true, })
																				: 'Unknown'}
																		</span>
																	</div>
																</div>
															</div>
															<div className="flex items-center gap-3">
																{item?.type === 'PushEvent' && <p className={`text-xs text-white bg-[#1b7f37] w-fit px-2 py-1 rounded-full`}>Committed</p>}
																{item?.type === 'PullRequestEvent' && (<p className={`text-xs text-white ${item?.payload?.pull_request?.merged ? 'bg-[#8250df]' : 'bg-[#1b7f37]'} px-2 py-1 rounded-full flex items-center`}>{item?.payload?.pull_request?.merged ? 'Merged' : 'Merge'}</p>)}
																{item?.type === 'IssuesEvent' && (<p className="text-xs bg-gray-200 px-2.5 py-1 rounded-full flex items-center">Issue</p>)}
																<Link
																	href={`https://github.com/${item.repo}/${item?.type === 'IssuesEvent' && 'issues' || item?.type === 'PullRequestEvent' && 'pull' || item?.type === 'PushEvent' && 'commit'}/${item?.payload?.issue?.number || item?.payload?.pull_request?.number || item?.payload?.head}`}
																	target="_blank"
																	className="border border-[#E8E8E8] text-xs bg-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded cursor-pointer font-reddit hidden md:block hover:bg-[#F0F0F0] transition-colors duration-200">
																	View Repository
																</Link>
															</div>
														</div>
														<div className="font-reddit text-[#373737]">
															{item?.type === 'IssuesEvent' && (
																<div className="flex gap-2 items-start">
																	<p className="mt-1">
																		{item?.payload?.action === 'opened' && (
																			<svg color="open.fg" aria-hidden="true" focusable="false" aria-label="" className="octicon octicon-issue-opened Octicon-sc-9kayk9-0 cRyBKI" viewBox="0 0 16 16" width="16" height="16" fill="#1b7f37" display="inline-block" overflow="visible" style={{ verticalAlign: 'text-bottom' }}><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path></svg>
																		)}
																		{item?.payload?.action === 'closed' && (
																			<svg color="done.fg" aria-hidden="true" focusable="false" aria-label="" className="octicon octicon-issue-closed Octicon-sc-9kayk9-0 hjIZXg" viewBox="0 0 16 16" width="16" height="16" fill="#8250df" display="inline-block" overflow="visible" style={{ verticalAlign: 'text-bottom' }}><path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z"></path><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z"></path></svg>
																		)}
																	</p>
																	<div>
																		<p className="font-medium mb-1">{item?.payload?.issue?.title}</p>

																		<div className="flex items-center text-xs opacity-70 space-x-1">
																			<p>#{item?.payload?.issue?.number}</p>
																			<p>·</p>
																			<p><strong>{item?.actor}</strong> {item?.payload?.action} {item?.created_at
																				? formatDistanceToNow(new Date(item?.created_at), { addSuffix: true, })
																				: 'Unknown'}</p>
																			<p>·</p>
																			<Link target="_blank" href={`https://github.com/${item.repo}/milestone/${item?.payload?.issue?.milestone?.number}`} className="flex items-center gap-1 hover:text-[#0969da]">
																				<svg aria-hidden="true" focusable="false" className="octicon octicon-milestone Octicon-sc-9kayk9-0" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" display="inline-block" overflow="visible" style={{ verticalAlign: 'text-bottom' }}><path d="M7.75 0a.75.75 0 0 1 .75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 0 1 0 2.672l-2.07 1.75a1.75 1.75 0 0 1-1.13.414H8.5v5.25a.75.75 0 0 1-1.5 0V10H2.75A1.75 1.75 0 0 1 1 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 0 1 7.75 0Zm4.384 8.5a.25.25 0 0 0 .161-.06l2.07-1.75a.248.248 0 0 0 0-.38l-2.07-1.75a.25.25 0 0 0-.161-.06H2.75a.25.25 0 0 0-.25.25v3.5c0 .138.112.25.25.25h9.384Z"></path></svg>
																				{item?.payload?.issue?.milestone?.title}
																			</Link>
																		</div>
																	</div>
																</div>
															)}
															{item?.type === 'PullRequestEvent' && (
																<div>
																	<p className="font-medium mb-1.5">{item?.payload?.pull_request?.title}</p>
																	<div className="flex items-center text-xs opacity-70 space-x-1">
																		<p>#{item?.payload?.pull_request?.number}</p>
																		<p>·</p>
																		<p><strong>{item?.payload?.pull_request?.merged_by?.login}</strong> {item?.payload?.pull_request?.merged ? 'merged' : 'merge'} {item?.payload?.pull_request?.commits} commits into <Link target="_blank" href={`https://github.com/${item.repo}/tree/${item?.payload?.pull_request?.base?.ref}`} className="text-[#0969da] bg-[#def4ff] px-1.5 py-0.5 rounded">{item?.payload?.pull_request?.base?.ref}</Link> from <Link target="_blank" href={`https://github.com/${item.repo}/tree/${item?.payload?.pull_request?.head?.ref}`} className="text-[#0969da] bg-[#def4ff] px-1.5 py-0.5 rounded">{item?.payload?.pull_request?.head?.ref}</Link>
																		</p>
																	</div>
																</div>
															)}
															{item?.type === 'PushEvent' && (
																<div>
																	<div>
																		{item?.payload?.commits[0]?.message.split('\n').map((line, index) => (
																			<p className="font-medium" key={index}>{line}</p>
																		))}
																	</div>
																	<div className="flex items-center text-xs opacity-80 space-x-1 mt-2">
																		<p>{item?.payload?.commits[0]?.author?.name} commited {item?.created_at
																			? formatDistanceToNow(new Date(item?.created_at), { addSuffix: true, })
																			: 'Unknown'}</p>
																	</div>
																</div>
															)}
														</div>
													</div>
												</div>
											))}
											{isLoadingMore && (
												<div className="space-y-6">
													{[...Array(5)].map((_, i) => (
														<GithubCommunityLoading key={i} />
													))}
												</div>
											)}
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
								{isLoading && <RedditCommunityLoading />}
								{!isLoading && data?.length === 0 && (
									<div className="py-20 animate-fade-in">
										<div className="flex flex-col items-center">
											<Image
												src="/images/reddit-notfound.png"
												alt="Twitter activity not available"
												width={180}
												height={180}
												className="mb-5"
											/>
											<h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
												Reddit activity isn’t available yet.
											</h3>
											<p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm text-center">
												We couldn't display Reddit videos for this community at the moment.
											</p>
										</div>
									</div>
								)}
								{!isLoading && data?.length > 0 && (
									<div className="bg-[#F6F6F6] dark:bg-[#1A1A1A] p-4 rounded-xl">
										<div className="flex items-center justify-between mb-2 md:mb-4 space-x-2">
											<div className="flex items-center gap-2">
												<RedditIcon width={24} height={24} fill="#000" />
												<p className="font-semibold font-noto">Latest Reddit Discussions</p>
												<div className="border-l h-4 border-[#000] opacity-50 mx-2" />
												<span className="text-xs text-[#373737] dark:text-white font-reddit hidden md:block"><b>{formatNumberShort(totalItems)}</b> posts</span>
											</div>
										</div>
										<div className="space-y-6">
											{_map(data, (post, i) => (
												<div key={i} className="bg-white dark:bg-black rounded-xl p-5">
													<div>
														<div className="flex items-center gap-3">
															<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
																<PostAvatar username={post?.data?.subreddit_name_prefixed} src="/images/reddit-image.png" />
															</div>
															<div className="flex-1">
																<div className="font-noto">
																	<div>
																		<p className="flex items-center space-x-2 text-[#373737]">
																			<span className="text-sm font-semibold">{post?.data?.subreddit_name_prefixed}</span>
																			<span className="opacity-50">•</span>
																			<span className="text-xs opacity-50">{formatTimestamp(post?.data?.created)}</span>
																		</p>
																		<p className="text-xs opacity-50 text-[#4B4A4A] dark:text-white">{post?.data?.author}</p>
																	</div>
																</div>
															</div>
															<Link href={`https://reddit.com/${post?.data?.permalink}`} target="_blank" className="border border-[#E8E8E8] text-xs bg-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded cursor-pointer font-reddit hidden md:block hover:bg-[#F0F0F0] transition-colors duration-200">View on Reddit</Link>
														</div>
														{post?.data?.title && (
															<p className="font-space text-[#373737] font-medium text-2xl mt-1">{post?.data?.title}</p>
														)}
														{post?.data?.selftext_html && (
															<p
																className="text-sm mt-1.5 font-reddit line-clamp-6 overflow-hidden text-[#373737]"
																dangerouslySetInnerHTML={{
																	__html: he.decode(post?.data?.selftext_html || '')
																}}
															/>
														)}
														{post?.data?.thumbnail &&
															/\.(jpg|jpeg|png|gif|webp)$/i.test(post.data.thumbnail) && (
																<div className="border border-[#E9E9E9] rounded-xl my-4 text-[#373737]">
																	<Link href={post?.data?.url} target="_blank">
																		<div className="relative h-[450px] cursor-pointer">
																			<Image
																				src={post?.data?.thumbnail}
																				alt="thumbnail"
																				width={320}
																				height={320}
																				className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover absolute top-0 left-0 z-10"
																			/>
																			<div className="bg-black z-20 absolute w-full h-full rounded-tl-lg rounded-tr-lg opacity-60"></div>
																			<Image
																				src={post?.data?.thumbnail}
																				alt="thumbnail"
																				width={320}
																				height={320}
																				className="w-full h-full object-contain absolute top-0 left-1/2 -translate-x-1/2 z-30"
																			/>
																		</div>
																	</Link>
																	<div className="p-4 flex justify-between items-center">
																		<Link href={post?.data?.url} target="_blank">
																			<p className="text-sm hover:underline cursor-pointer">
																				{new URL(post?.data?.url).hostname.replace(/^www\./, '')}
																			</p>
																		</Link>
																		<a
																			href={post?.data?.url}
																			target="_blank"
																			rel="noopener noreferrer"
																			className="text-sm font-medium px-4 py-1.5 border rounded-full border-gray-300 hover:bg-gray-100 transition"
																		>
																			Open
																		</a>
																	</div>
																</div>
															)}
														{/* <hr className="text-[#C5C5C5]" /> */}
														<div className="flex items-center gap-4 text-sm font-noto text-[#4B4A4A]">
															<div className="flex items-center gap-2 font-medium text-xs dark:text-white">
																<UpVoteIcon />
																{formatNumberShort(post?.data?.ups)}
																<DownVoteIcon />
															</div>
															<div className="flex items-center gap-1 font-medium text-xs dark:text-white">
																<ChatIcon />
																{formatNumberShort(post?.data?.num_comments)}
															</div>
															<div className="flex items-center gap-1 font-medium text-xs dark:text-white">
																<RewardIcon />
																{formatNumberShort(post?.data?.total_awards_received)}
															</div>
															<span className="ml-auto font-reddit text-sm text-[#373737] dark:text-white"><span className="opacity-50 text-xs">Sentiment:</span> <b>Positive</b></span>
														</div>
													</div>
												</div>
											))}
											{isLoadingMore && <RedditCommunityLoading />}
										</div>
									</div>
								)}
							</>
						)}

						{(activeTab === "All Activity" || activeTab === "YouTube") && (
							<>
								{isLoading && Array.from({ length: 5 }).map((_, i) => <YoutubeCommunityLoading key={i} />)}
								{!isLoading && data?.length === 0 && (
									<div className="py-20 animate-fade-in">
										<div className="flex flex-col items-center">
											<Image
												src="/images/youtube-notfound.png"
												alt="YouTube activity not available"
												width={180}
												height={180}
												className="opacity-90"
											/>
											<h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
												YouTube activity isn’t available yet.
											</h3>
											<p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm text-center">
												We couldn't display YouTube videos for this community at the moment.
											</p>
										</div>
									</div>
								)}
								{!isLoading && data?.length > 0 && (
									<div className="bg-[#F6F6F6] dark:bg-[#1A1A1A] p-4 rounded-xl">
										<div className="flex items-center justify-between mb-2 md:mb-4 space-x-2">
											<div className="flex items-center gap-2">
												<YoutubeIcon width={24} height={24} fill="#000" />
												<p className="font-semibold font-noto">YouTube Community Content</p>
												<span className="ml-3 text-xs text-[#373737] dark:text-white font-reddit hidden md:block"><b>{formatNumberShort(totalItems)}</b> videos</span>
											</div>
										</div>
										<div className="space-y-6">
											{_map(data, (video, i) => (
												<div key={i} className="bg-white dark:bg-[#000] dark:hover:bg-[#222] rounded-xl p-5">
													<div className="">
														<div className="flex items-start gap-3">
															<div className="flex items-center justify-center text-white font-bold">
																<svg height="50" width="100" version="1.1" id="Layer_1" xmlns="http:www.w3.org/2000/svg" xmlnsXlink="http:www.w3.org/1999/xlink"
																	viewBox="0 0 461.001 461.001" xmlSpace="preserve">
																	<g>
																		<path style={{ fill: "#F61C0D" }} d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
																	 	c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
																	 	C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
																	 	c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"/>
																	</g>
																</svg>
															</div>
															<div className="flex-1">
																<div className="mb-1">
																	<p className="font-semibold font-noto text-[#373737] dark:text-white line-clamp-2">{video?.title}</p>
																	<div className="flex items-center gap-2 text-[#4B4A4A] dark:text-white font-noto hidden md:flex mb-1">
																		<span className="text-xs opacity-50">{video?.channelTitle}</span>
																		<span>•</span>
																		<span className="text-xs font-medium">{formatNumberShort(video?.metrics?.views)} views</span>
																		<span>•</span>
																		<span className="text-xs font-medium">
																			{video?.publishedAt
																				? formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true, })
																				: 'Unknown'}
																		</span>
																	</div>
																	<div className="flex items-center gap-4 text-xs font-noto text-[#4B4A4A] dark:text-white hidden md:flex">
																		<div className="flex items-center gap-1">
																			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
																				<path d="M9.38733 3.97987C9.75898 3.561 10.2108 3.22087 10.7161 2.97956C11.2214 2.73824 11.77 2.60065 12.3294 2.5749C12.8888 2.54915 13.4476 2.63577 13.973 2.82964C14.4983 3.02351 14.9795 3.3207 15.388 3.70365C15.7966 4.0866 16.1243 4.54755 16.3517 5.05926C16.5791 5.57098 16.7017 6.12308 16.7121 6.68296C16.7226 7.24283 16.6207 7.79913 16.4126 8.31898C16.2044 8.83884 15.8942 9.31171 15.5003 9.70965L9.34169 15.9274C9.29686 15.9727 9.24349 16.0086 9.18468 16.0331C9.12587 16.0577 9.06277 16.0703 8.99905 16.0703C8.93532 16.0703 8.87223 16.0577 8.81342 16.0331C8.7546 16.0086 8.70124 15.9727 8.6564 15.9274L2.49783 9.70965C1.7511 8.95532 1.31837 7.94578 1.28699 6.88482C1.25561 5.82386 1.62792 4.79051 2.32876 3.99337C3.99248 2.10144 6.93805 2.09501 8.61076 3.97987L8.99905 4.41701L9.38733 3.97987Z" fill="#FF5959" />
																			</svg>
																			{video?.metrics?.likes}
																		</div>
																		<div className="flex items-center gap-1">
																			<ChatIcon />
																			{video?.metrics?.comments}
																		</div>
																	</div>
																</div>
															</div>
															<Link href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" className="border border-[#E8E8E8] text-xs bg-white dark:bg-[#000] dark:hover:bg-[#222] px-2 py-1.5 rounded cursor-pointer font-reddit hidden md:block hover:bg-[#F0F0F0] transition-colors duration-200">View Video</Link>
														</div>
														<div className="flex items-center mt-2 md:mt-4 gap-2 text-[#4B4A4A] font-noto md:hidden">
															<span className="text-xs opacity-50">{video?.channelTitle}</span>
															<span>•</span>
															<span className="text-xs font-medium">{formatNumberShort(video?.metricsviews)} views</span>
															<span>•</span>
															<span className="text-xs font-medium">
																{video?.publishedAt
																	? formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true, })
																	: 'Unknown'}
															</span>
														</div>
														<div className="flex items-center mt-2 md:mt-4 gap-4 text-xs font-noto text-[#4B4A4A] flex md:hidden">
															<div className="flex items-center gap-1">
																<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
																	<path d="M9.38733 3.97987C9.75898 3.561 10.2108 3.22087 10.7161 2.97956C11.2214 2.73824 11.77 2.60065 12.3294 2.5749C12.8888 2.54915 13.4476 2.63577 13.973 2.82964C14.4983 3.02351 14.9795 3.3207 15.388 3.70365C15.7966 4.0866 16.1243 4.54755 16.3517 5.05926C16.5791 5.57098 16.7017 6.12308 16.7121 6.68296C16.7226 7.24283 16.6207 7.79913 16.4126 8.31898C16.2044 8.83884 15.8942 9.31171 15.5003 9.70965L9.34169 15.9274C9.29686 15.9727 9.24349 16.0086 9.18468 16.0331C9.12587 16.0577 9.06277 16.0703 8.99905 16.0703C8.93532 16.0703 8.87223 16.0577 8.81342 16.0331C8.7546 16.0086 8.70124 15.9727 8.6564 15.9274L2.49783 9.70965C1.7511 8.95532 1.31837 7.94578 1.28699 6.88482C1.25561 5.82386 1.62792 4.79051 2.32876 3.99337C3.99248 2.10144 6.93805 2.09501 8.61076 3.97987L8.99905 4.41701L9.38733 3.97987Z" fill="#FF5959" />
																</svg>
																{video?.metrics?.likes}
															</div>
															<div className="flex items-center gap-1">
																<MessageCircle className="w-4 h-4" />
																{video?.metrics?.comments}
															</div>
														</div>
													</div>
												</div>
											))}
											{isLoadingMore && (
												Array.from({ length: 5 }).map((_, i) => <YoutubeCommunityLoading key={i} />)
											)}
										</div>
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