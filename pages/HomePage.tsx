'use client';
import { motion, easeOut, useScroll, useTransform } from 'framer-motion';
import Header from "@/components/Header";
import Image from "next/image";
import bgDetailPage from "@/images/bg-detail-page.png";
import bgSection1 from "@/images/bg-section-1.png";
import bgSection2 from "@/images/bg-section-2.png";
import bgSection3 from "@/images/bg-section-3.png";
import icSection32 from "@/images/icon-section-3.png";
import icSection61 from "@/images/icon-section-6_1.png";
import icSection62 from "@/images/icon-section-6_2.png";
import PlayIcon from "@/icons/PlayIcon";
import IconSection2_1 from "@/icons/IconSection2_1";
import IconSection2_2 from "@/icons/IconSection2_2";
import IconSection2_3 from "@/icons/IconSection2_3";
import IconSection2_4 from "@/icons/IconSection2_4";
import IconSection2_5 from "@/icons/IconSection2_5";
import IconSection3_1 from "@/icons/IconSection3_1";
import IconSection3_2 from "@/icons/IconSection3_2";
import IconSection3_3 from "@/icons/IconSection3_3";
import IconSection3_4 from "@/icons/IconSection3_4";
import IconSection3_5 from "@/icons/IconSection3_5";
import IconSection3_6 from "@/icons/IconSection3_6";
import IconSection4_1 from "@/icons/IconSection4_1";
import IconSection4_2 from "@/icons/IconSection4_2";
import IconSection4_3 from "@/icons/IconSection4_3";
import IconSection4_4 from "@/icons/IconSection4_4";
import PlayBlackIcon from "@/icons/PlayBlackIcon";
import IconSection1_1 from "@/icons/IconSection1_1";

interface FeatureCardProps {
	title: string;
	description: string;
	image: any;
}

const section2 = [
	{ title: 'Fake Engagement ≠ Real Value', content: 'Thousands of bots inflate activity, making weak projects look popular. Don’t fall for artificial hype.', icon: <IconSection2_3 /> },
	{ title: 'Founder Signals Are Investment Signals', content: 'Founders who disappear, ghost updates, or act inconsistently create risk. You need to see what they actually do.', icon: <IconSection2_4 /> },
	{ title: 'You Deserve More Than Just Price Charts', content: 'Surface data hides what really matters. True insight comes from community behavior patterns.', icon: <IconSection2_5 /> },
]
const section3 = [
	{
		title: "Track The People Who Build The Projects",
		description: "Monitor founder behavior across Twitter, GitHub, Reddit, and YouTube.",
		image: <IconSection3_1 />
	},
	{
		title: "Know What The Crowd Truly Feels",
		description: "Get a trust-based Community Health Score that reflects sentiment, traction, and long-term sustainability.",
		image: <IconSection3_2 />
	},
	{
		title: "See The Bigger Picture Across Platforms",
		description: "Compare cross-platform activity and spot manipulation or genuine momentum.",
		image: <IconSection3_3 />
	},
	{
		title: "Learn From The Past To Make Smarter Decisions",
		description: "Analyze historical growth trends and community shifts over time.",
		image: <IconSection3_4 />
	},
	{
		title: "Ask Your AI Agent To Understand Communities Like A Pro",
		description: "Let Noodles explain engagement changes, project risks, and community dynamics using simple chat.",
		image: <IconSection3_5 />
	}
];

const section4 = [
	{ icon: <IconSection4_1 />, title1: 'Always-On Market', title2: 'Monitoring', subTitle: 'We track 1,000+ projects, 24/7, across major platforms.' },
	{ icon: <IconSection4_2 />, title1: 'AI That Thinks Like An', title2: 'Investment Analyst', subTitle: 'Our AI analyzes engagement patterns, founder consistency, and community health' },
	{
		icon: <IconSection4_3 />, title1: 'Timely Signals.', title2: 'Smarter Actions.', subTitle: 'Get community insights, alerts, and red flag notifications before others notice.'
	}
]

const section5 = [
	{ content: '1,000+', title: 'Projects Tracked', },
	{ content: '10M+', title: 'Social Posts Analyzed', },
	{ content: '4', title: 'Platforms Monitored', },
	{ content: 'Daily', title: 'Data Updates', },
]

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, image }) => {
	return (
		<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA0700] p-[1px] rounded-xl h-full hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
			<div className="bg-white dark:bg-[#1A1A1A] rounded-xl p-8 shadow-xl cursor-pointer h-full">
				{/* Icon container */}
				<div className="relative mb-6">
					<div className="rounded-xl flex items-center justify-end">
						{image}
					</div>
				</div>

				{/* Content */}
				<div className="relative z-10">
					<h3 className="text-2xl font-bold mb-3 leading-tight">
						{title}
					</h3>
					<p className="leading-relaxed">
						{description}
					</p>
				</div>
				<Image src={bgSection3} alt="Background section 2" width={240} height={240} className="w-full absolute bottom-0 right-0" />
			</div>
		</div>
	);
};

const zoomVariant = {
	hidden: { opacity: 0, scale: 0.95 },
	show: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.6, ease: easeOut },
	},
};

const skewFadeVariant = {
	hidden: { opacity: 0, y: 60, skewY: 6 },
	show: {
		opacity: 1,
		y: 0,
		skewY: 0,
		transition: { duration: 0.8, ease: easeOut },
	},
};

const HomePage = () => {
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
	return (
		<div className="h-screen relative bg-[#F9F9F9] dark:bg-[#0B0B0B] overflow-auto font-space">
			<Header />
			<div className="absolute top-27 md:top-3 w-full flex justify-center">
				<Image src={bgDetailPage} alt="Background detail page" width={1080} height={1080} />
			</div>
			<div className={`mt-0 md:mt-14 relative text-black dark:text-white`}>
				{/* Section 1 */}
				<motion.div
					variants={zoomVariant}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.3 }}
				>
					<div className="relative">
						<div className="space-y-6 px-6 md:px-0 py-20 container mx-auto">
							<motion.div
								variants={skewFadeVariant}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true, amount: 0.3 }}
							>
								<div className="text-3xl md:text-6xl font-semibold space-y-1 md:space-y-3">
									<p className="text-center">Your Investment Career</p>
									<p className="text-center">Starts Here</p>
								</div>
							</motion.div>
							<div className="md:text-xl">
								<p className="text-center mb-6 md:mb-10">Because Wealth Begins with Wisdom and Insights</p>
								<p className="text-center">Noodles gives you real-time intelligence for Crypto, DeFi, and Traditional Financial Instruments translating this
									into founder credibility, crowd sentiment, and behaviour patterns across Twitter, GitHub, Reddit, and YouTube.</p>
							</div>
							<p className="text-center font-medium md:text-xl">Turn community noise into investment insights.</p>
							<div className="flex flex-col md:flex-row items-center gap-6 justify-center">
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.97 }}
									transition={{ type: 'spring', stiffness: 300 }}
									className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1px] rounded cursor-pointer"
								>
									<div className="relative bg-[#f9f9f9] dark:bg-[#1A1A1A] dark:text-[#FFFFFF] rounded px-8 py-4 font-medium flex items-center gap-2">
										<p>Start Free Demo</p>
										<PlayIcon />
									</div>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.97 }}
									transition={{ type: 'spring', stiffness: 300 }}
									className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] px-8 py-4 cursor-pointer rounded font-medium flex items-center gap-2 text-black"
								>
									<p>Begin Your Journey</p>
									<PlayBlackIcon />
								</motion.div>
							</div>
							<div className="flex justify-center">
								<IconSection1_1 />
							</div>
						</div>
						<Image src={bgSection1} alt="Background Section 1" width={1930} height={1219} className="absolute bottom-0" />
					</div>
				</motion.div>
				{/* Section 2 */}
				<motion.div
					variants={zoomVariant}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.3 }}
				>
					<div className="space-y-6 px-6 md:px-0 py-20 container mx-auto">
						<motion.div
							variants={skewFadeVariant}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, amount: 0.3 }}
						>
							<div className="text-3xl md:text-6xl font-semibold space-y-3 relative">
								<p className="text-center">The Community Blind Spot</p>
								<p className="text-center">Most Investors Ignore</p>
								<div className="absolute top-0">
									<IconSection2_1 />
								</div>
							</div>
						</motion.div>
						<div className="md:text-xl relative">
							<p className="text-center">Most platforms focus on price and volume.</p>
							<p className="text-center">But what truly signals a project’s long-term health?</p>
							<p className="text-center font-medium text-xl">Community trust, founder behavior, and cross-platform presence.</p>
							<div className="absolute bottom-0 right-0">
								<IconSection2_2 />
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
							{section2.map((item, index) => (
								<div key={index} className="grid grid-cols-1 bg-gradient-to-r from-[#DDF346] to-[#84EA0700] p-[1px] rounded-xl shadow-xl cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 group overflow-hidden">
									<div className="p-7.5 bg-white rounded-xl h-full relative dark:bg-[#1A1A1A]">
										<div className="flex justify-end mb-6 text-white dark:text-black">
											{item.icon}
										</div>
										<p className="text-2xl font-semibold mb-2">{item.title}</p>
										<p>{item.content}</p>
										<Image src={bgSection2} alt="Background section 2" width={240} height={240} className="absolute bottom-0 right-0" />
									</div>
								</div>
							))}
						</div>
					</div>
				</motion.div>

				{/* Section 3 */}
				<motion.div
					variants={zoomVariant}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.3 }}
				>
					<div className="bg-[#F5F5F5] dark:bg-[#1A1A1A] relative">
						<Image src={icSection32} alt="Background section 3_1" width={818} height={827} className="absolute top-45 right-0" />
						<div className="space-y-6 px-6 md:px-0 py-20 container mx-auto">
							<motion.div
								variants={skewFadeVariant}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true, amount: 0.3 }}
							>
								<div className="text-3xl md:text-6xl font-semibold space-y-3">
									<p className="text-center">Turn Crowd Noise Into Smart</p>
									<p className="text-center">Investment Signals</p>
								</div>
							</motion.div>
							<div className="md:text-xl">
								<p className="text-center">Noodles transforms messy social data into clear, trustworthy insights.</p>
								<p className="text-center">Understand founder behavior. Gauge sentiment across platforms. Spot patterns early.</p>
								<p className="text-center font-medium text-xl">Invest like a pro backed by AI and wisdom.</p>
							</div>
							{/* Features Grid */}
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 relative">
								{/* Top row - 3 cards */}
								{section3.slice(0, 3).map((feature, index) => (
									<div key={index} className="animate-fade-in relative z-20" style={{ animationDelay: `${index * 0.2}s` }}>
										<FeatureCard
											title={feature.title}
											description={feature.description}
											image={feature.image}
										/>
									</div>
								))}
								<div className="absolute bottom-0 -left-27">
									<IconSection3_6 />
								</div>
							</div>
							{/* Bottom row - 2 cards centered */}
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
								{section3.slice(3, 5).map((feature, index) => (
									<div key={index + 3} className="animate-fade-in" style={{ animationDelay: `${(index + 3) * 0.2}s` }}>
										<FeatureCard
											title={feature.title}
											description={feature.description}
											image={feature.image}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</motion.div>
				{/* Section 4 */}
				<motion.div
					variants={zoomVariant}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.3 }}
				>
					<div className="space-y-6 px-6 md:px-0 py-20 container mx-auto">
						<div className="flex items-center gap-6 justify-center mb-6">
							<IconSection4_4 />
							<motion.div
								variants={skewFadeVariant}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true, amount: 0.3 }}
							>
								<div className="text-3xl md:text-6xl font-semibold">
									<p>Noodles Transforms Data</p>
									<p>Into Investment Wisdom</p>
								</div>
							</motion.div>
						</div>
						<p className="text-center md:text-xl mb-16">From 24/7 data collection to daily insights in just 3 steps:</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
							{section4.map((section, index) => (
								<div className="flex flex-col items-center" key={index}>
									{section.icon}
									<p className="mt-7.5 text-2xl font-semibold text-center">{section.title1}</p>
									<p className="mb-2 text-2xl font-semibold text-center">{section.title2}</p>
									<p className="text-center">{section.subTitle}</p>
								</div>
							))}
						</div>
					</div>
				</motion.div>
				{/* Section 5 */}
				<motion.div
					variants={zoomVariant}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.3 }}
				>
					<div className="bg-[#F5F5F5] dark:bg-[#1A1A1A] relative">
						<div className="py-20 px-6 md:px-0 container mx-auto">
							<motion.div
								variants={skewFadeVariant}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true, amount: 0.3 }}
							>
								<p className="text-3xl md:text-6xl text-center font-semibold mb-6">Trusted by Experienced Analysts</p>
							</motion.div>
							<p className="md:text-xl text-center">Thousands of researchers, analysts, and career investors use Noodles to stay ahead.</p>
							<div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-10">
								{section5.map((item, index) => (
									<div key={index}>
										<p className="text-7xl mb-6 text-center font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#DDF346] to-[#84EA07]">{item.content}</p>
										<p className="font-medium text-center">{item.title}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</motion.div>
				{/* Section 6 */}
				<motion.div
					variants={zoomVariant}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.3 }}
				>
					<div className="relative">
						<div className="opacity-30 bg-gradient-to-r from-[#DDF346] to-[#84EA07] w-full absolute h-full z-10">
						</div>
						<Image src={icSection61} alt="Icon Section 61" width={290} height={266} className="absolute bottom-0 right-0 z-20 w-30 md:w-[290px] md:h-[266px]" />
						<Image src={icSection62} alt="Icon Section 62" width={312} height={252} className="absolute w-50 md:w-[312px] md:h-[252px]" />
						<div className="space-y-6 px-6 md:px-0 py-20 container mx-auto relative z-20">
							<motion.div
								variants={skewFadeVariant}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true, amount: 0.3 }}
							>
								<p className="text-3xl md:text-6xl font-semibold text-center mb-6">Ready to Invest Smarter?</p>
							</motion.div>
							<div>
								<p className="md:text-xl text-center">Start analyzing communities with clarity, depth, and wisdom.</p>
								<p className="md:text-xl text-center">Free access to the top <strong>20 projects</strong> no credit card needed.</p>
							</div>
							<div className="flex justify-center">
								<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] px-8 py-4 rounded w-fit font-medium cursor-pointer flex items-center gap-2">
									<p className="text-black">Start Now – It’s Free</p>
									<PlayBlackIcon />
								</div>
							</div>
						</div>
					</div>
				</motion.div>
				{/* Section 7 */}
				<motion.div
					variants={zoomVariant}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.3 }}
				>
					<div className="py-10 container mx-auto opacity-50">
						<p className="text-sm text-center">Noodles © 2025 — Built for Investment Career Seekers</p>
						<p className="text-sm text-center">Your edge starts with real insight.</p>
					</div>
				</motion.div>
			</div>
		</div>
	)
}

export default HomePage;