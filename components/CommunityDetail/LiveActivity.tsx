import { Heart, MessageCircle, RotateCcw, ExternalLink, AlertTriangle } from "lucide-react";
import QuestionIcon from "@/icons/QuestionIcon";
import XIcon from "@/icons/XIcon";
import RecentActivityDropIcon from "@/icons/RecentActivityDropIcon";
import GithubIcon from "@/icons/GithubIcon";
import RedditIcon from "@/icons/RedditIcon";
import LightIcon from "@/icons/LightIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";

const LiveActivity = () => {
	const tabs = [
		{ name: "All Activity", active: true },
		{ name: "Twitter", active: false },
		{ name: "Reddit", active: false },
		{ name: "GitHub", active: false },
		{ name: "Youtube", active: false },
	];

	const twitterActivity = [
		{
			user: "@kathryn_bonk",
			followers: "2.5K followers",
			time: "2 hours ago",
			content: '"This is me when $BONK surpasses Bitcoin. 😍❤️ #BONK #SOLEcosystem"',
			engagement: { likes: 131, retweets: 81, replies: 315, rate: "7.6%" },
			authentic: true,
			verified: true
		},
		{
			user: "@bonk_official",
			followers: "89K followers",
			time: "5 hours ago",
			content: '"Community update: New partnerships announced! 🎯 Check out our latest blog post for details. Thanks for the continued support, BONK army! 💪"',
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
			title: "Analysis: BONK's recent partnerships and their impact on ecosystem growth",
			content: '"I\'ve been diving deep into BONK\'s recent announcements and here\'s what I found interesting about their DeFi integrations..."',
			engagement: { upvotes: 89, comments: 34 },
			sentiment: "Positive"
		},
		{
			user: "u/doge_whale_tracker",
			karma: "890 karma",
			time: "6 hours ago",
			title: "🐋 Large BONK wallet movements detected - Analysis thread",
			content: '"Hey Solana fam, noticed some interesting on-chain activity with DOGE. Top 10 holder moved 2% of supply..."',
			engagement: { upvotes: 234, comments: 78 },
			sentiment: "Concerned"
		}
	];

	const youtubeActivity = [
		{
			title: '"BONK Analysis: Why This Dip Might Be Opportunity"',
			channel: "CryptoAnalyst47",
			views: "12K views",
			time: "1 day ago",
			engagement: { likes: 131, comments: 81, shares: 315 }
		},
		{
			title: '"BONK Community AMA Highlights - March 2024"',
			channel: "BONK Official",
			views: "5.2K views",
			time: "3 days ago",
			engagement: { likes: 131, comments: 81, shares: 315 }
		}
	];

	const githubActivity = [
		{
			repo: "bonk-community-dev",
			time: "2 days ago",
			commit: "feat: Add new staking mechanism integration",
			stats: "+247 lines -12 lines • contracts/staking.rs"
		},
		{
			repo: "bonk-docs-team",
			time: "5 days ago",
			commit: "docs: Update README with partnership info",
			stats: "+45 lines -8 lines • README.md"
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
						key={tab.name}
						className={`px-4 py-2 text-sm text-[#373737] font-medium border-b-2 transition-colors ${tab.active
							? "border-[#7FCE00] font-semibold"
							: "border-transparent"
							}`}
					>
						{tab.name}
					</button>
				))}
			</div>

			<div className="space-y-6">
				<div className="grid grid-cols-2 gap-8">
					<div className="col-span-1 space-y-5">
						{/* Twitter Section */}
						<div className="bg-[#F6F6F6] p-4 rounded-xl">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									<XIcon width={24} height={24} fill="#000" />
									<p className="font-semibold">Latest Twitter Activity</p>
									<span className="ml-3 text-sm text-[#373737]"><b>2.3K</b> mentions today</span>
								</div>
								<button className="text-xs bg-white px-2 py-1.5 rounded cursor-pointer">View all on Twitter</button>
							</div>

							<div className="space-y-4">
								{twitterActivity.map((tweet, index) => (
									<div key={index} className="bg-white rounded-xl p-5">
										<div className="space-y-4">
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
															<span className="text-xs"> {tweet.time}</span>
														</div>
													</div>
												</div>
												{tweet.authentic && (
													<span className="bg-[#DDFFE4] text-[#16BC00] px-2 py-1 rounded-full text-xs">
														Authentic
													</span>
												)}
											</div>
											<p className="text-sm">{tweet.content}</p>
											<hr className="text-[#C5C5C5]" />
											<div className="flex items-center gap-4 text-sm">
												<div className="flex items-center gap-1">
													<Heart className="w-4 h-4" />
													{tweet.engagement.likes}
												</div>
												<div className="flex items-center gap-1">
													<RotateCcw className="w-4 h-4" />
													{tweet.engagement.retweets}
												</div>
												<div className="flex items-center gap-1">
													<MessageCircle className="w-4 h-4" />
													{tweet.engagement.replies}
												</div>
												<span className="ml-auto"><span className="text-[#373737] opacity-50">Engagement:</span> <b>{tweet.engagement.rate}</b></span>
											</div>
										</div>
									</div>
								))}
								{/* Suspicious Activity Alert */}
								<div className="bg-[#FFF7E2] border border-[#FFDA78] rounded-xl p-5">
									<div className="flex items-center gap-1.5 mb-2">
										<RecentActivityDropIcon />
										<span className="font-semibold text-[#DD7519]">Suspicious Activity Detected</span>
									</div>
									<p className="text-[#373737] text-sm">
										47 similar comments posted within 30 minutes by new accounts. Possible bot engagement.{" "}
										<button className="text-[#DD7519] underline cursor-pointer">View Details</button>
									</p>
								</div>
							</div>
						</div>
						{/* Github Section */}
						<div className="bg-[#F6F6F6] p-4 rounded-xl">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									<GithubIcon width={24} height={24} />
									<p className="font-semibold">GitHub Development Activity</p>
									<span className="ml-3 text-sm text-[#373737]"><b>12</b> commits this month</span>
								</div>
								<button className="text-xs bg-white px-2 py-1.5 rounded cursor-pointer">View Repository</button>
							</div>

							<div className="space-y-4">
								{githubActivity.map((github, index) => (
									<div key={index} className="bg-white rounded-xl p-5">
										<div className="space-y-4">
											<div className="flex items-start gap-3">
												<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
													{/* {github.user[1].toUpperCase()} */}
												</div>
												<div className="flex-1">
													<div className="mb-1">
														<span className="text-sm font-semibold">{github.repo}</span>
														<div className="flex items-center gap-2 text-[#4B4A4A]">
															<span className="text-xs opacity-50">{github.time}</span>
														</div>
													</div>
												</div>
											</div>
											<p className="text-sm">{github.commit}</p>
											<p className="text-sm text-gray-500">{github.stats}</p>
										</div>
									</div>
								))}
								{/* Development Insight */}
								<div className="bg-[#E2FEFF] border border-[#3DE1E6] rounded-xl p-5">
									<div className="flex items-center gap-1.5 mb-2">
										<LightIcon />
										<span className="font-semibold text-[#00B2B8]">Development Insight</span>
									</div>
									<p className="text-[#373737] text-sm">
										Consistent contributor activity with meaningful commits. No wash commits detected.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-1 space-y-5">
						{/* Reddit Section */}
						<div className="bg-[#F6F6F6] p-4 rounded-xl">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									<RedditIcon width={24} height={24} fill="#000" />
									<p className="font-semibold">Latest Reddit Discussions</p>
									<span className="ml-3 text-sm text-[#373737]"><b>156</b> posts today</span>
								</div>
								<button className="text-xs bg-white px-2 py-1.5 rounded cursor-pointer">View all on Twitter</button>
							</div>

							<div className="space-y-4">
								{redditActivity.map((reddit, index) => (
									<div key={index} className="bg-white rounded-xl p-5">
										<div className="space-y-4">
											<div className="flex items-start gap-3">
												<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
													{reddit.user[1].toUpperCase()}
												</div>
												<div className="flex-1">
													<div className="mb-1">
														<span className="text-sm font-semibold">{reddit.user}</span>
														<div className="flex items-center gap-2 text-[#4B4A4A]">
															<span className="text-xs opacity-50">r/bonk</span>
															<span>•</span>
															<span className="text-xs opacity-50">{reddit.time}</span>
															<span>•</span>
															<span className="text-xs"> {reddit.karma}</span>
														</div>
													</div>
												</div>
												<span className="bg-[#DDFFE4] text-[#16BC00] px-2 py-1 rounded-full text-xs">
													Authentic
												</span>
											</div>
											<p className="text-sm">{reddit.content}</p>
											<hr className="text-[#C5C5C5]" />
											<div className="flex items-center gap-4 text-sm">
												<div className="flex items-center gap-1">
													<RotateCcw className="w-4 h-4" />
													{reddit.engagement.upvotes}
												</div>
												<div className="flex items-center gap-1">
													<MessageCircle className="w-4 h-4" />
													{reddit.engagement.comments}
												</div>
												<span className="ml-auto"><span className="text-[#373737] opacity-50">Sentiment:</span> <b>{reddit.sentiment}</b></span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						{/* Youtube Section */}
						<div className="bg-[#F6F6F6] p-4 rounded-xl">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									<YoutubeIcon width={24} height={24} fill="#000" />
									<p className="font-semibold">YouTube Community Content</p>
									<span className="ml-3 text-sm text-[#373737]"><b>18</b> videos this week</span>
								</div>
								<button className="text-xs bg-white px-2 py-1.5 rounded cursor-pointer">View Channel</button>
							</div>

							<div className="space-y-4">
								{youtubeActivity.map((youtube, index) => (
									<div key={index} className="bg-white rounded-xl p-5">
										<div className="space-y-4">
											<div className="flex items-start gap-3">
												<div className="w-[100px] h-[50px] bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
													{/* {youtube.user[1].toUpperCase()} */}
												</div>
												<div className="flex-1">
													<div className="mb-1 space-y-1">
														<span className="font-semibold">{youtube.title}</span>
														<div className="flex items-center gap-2 text-[#4B4A4A]">
															<span className="text-xs opacity-50">{youtube.channel}</span>
															<span>•</span>
															<span className="text-xs opacity-50">{youtube.views}</span>
															<span>•</span>
															<span className="text-xs"> {youtube.time}</span>
														</div>
														<div className="flex items-center gap-4 text-sm">
															<div className="flex items-center gap-1">
																<Heart className="w-4 h-4" />
																{youtube.engagement.likes}
															</div>
															<div className="flex items-center gap-1">
																<RotateCcw className="w-4 h-4" />
																{youtube.engagement.shares}
															</div>
															<div className="flex items-center gap-1">
																<MessageCircle className="w-4 h-4" />
																{youtube.engagement.comments}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LiveActivity;