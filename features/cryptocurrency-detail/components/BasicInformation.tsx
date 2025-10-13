'use client';

import DropdownCommon, { DropdownCategories } from "@/components/common/DropdownCommon";
import DiscordIcon from "@/icons/DiscordIcon";
import TelegramIcon from "@/icons/TelegramIcon";
import XIcon from "@/icons/XIcon";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCommunityOverview } from "../hooks/useCommunityOverview";
import { CopyIcon, ExternalLinkIcon, Globe, MoreHorizontal, Newspaper } from "lucide-react";
import toast from 'react-hot-toast';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/NavigationMenu";
import MediumIcon from "@/icons/MediumIcon";
import SimpleRedditIcon from "@/icons/SimpleRedditIcon";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Skeleton = ({ className = "" }) => (
	<div className={`bg-gray-200 dark:bg-[#333] animate-pulse rounded ${className}`} />
)

const shortenAddress = (address: string): string => {
	if (!address || address.length < 10) return address;
	return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

const communityIcons: Record<
	string,
	{ icon: React.ReactNode; label: string }
> = {
	Twitter: { icon: <XIcon width={24} height={24} />, label: "Twitter" },
	Reddit: { icon: <SimpleRedditIcon />, label: "Reddit" },
	Telegram: { icon: <TelegramIcon />, label: "Telegram" },
	Medium: { icon: <MediumIcon />, label: "Medium" },
	Blog: { icon: <Globe />, label: "Blog" },
	Discord: { icon: <DiscordIcon />, label: "Discord" },
};

const BasicInformation = () => {
	const params = useParams();
	const popupRef = useRef<HTMLDivElement | null>(null);
	const [showAll, setShowAll] = useState(false);
	const communityId = params?.slug as string;
	const { data, isFetching } = useCommunityOverview(communityId);
	const basicInformation = data?.data

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
				setShowAll(false);
			}
		};

		if (showAll) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showAll]);

	if (isFetching) {
		return (
			<div>
				<h3 className="text-sm font-medium mb-2.5 font-noto dark:text-[#FFF]">Basic Information</h3>
				<div className="space-y-5 mb-6 text-[#373737] dark:text-[#FFF]">
					{/* Website */}
					<div className="flex justify-between items-center gap-3">
						<p className="text-xs font-medium opacity-50 font-noto">Website</p>
						<Skeleton className="h-[31px] w-40 rounded-full w-[150px]" />
					</div>
					{/* Explorers */}
					<div className="flex justify-between items-center gap-3">
						<p className="text-xs font-medium opacity-50 font-noto">Explorers</p>
						<Skeleton className="w-33 h-8 rounded-full" />
					</div>
					{/* Contract Address */}
					<div className="flex items-center justify-between">
						<p className="text-xs font-medium opacity-50 font-noto">Contract Address</p>
						<div className="flex items-center justify-end gap-4 flex-1">
							<Skeleton className="h-5 w-32" />
						</div>
					</div>
					{/* Wallets */}
					<div className="flex items-center justify-between">
						<p className="text-xs font-medium opacity-50 font-noto">Wallets</p>
						<div className="flex items-center gap-4 flex-1 justify-end">
							<Skeleton className="h-5 w-24" />
						</div>
					</div>
					{/* Community */}
					<div className="flex items-center justify-between">
						<p className="text-xs font-medium opacity-50 font-noto">Community</p>
						<div className="flex items-center justify-end gap-4 flex-1">
							<Skeleton className="h-5 w-36" />
						</div>
					</div>
				</div>
			</div>
		)
	}
	return (
		<div>
			<h3 className="text-sm font-medium mb-2.5 font-noto dark:text-[#FFF]">Basic Information</h3>
			<div className="space-y-5 mb-6 text-[#373737] dark:text-[#FFF]">
				{/* Website */}
				<div className="flex justify-between items-center gap-3">
					<p className="text-xs font-medium opacity-50 font-noto">Website</p>
					<div className="flex flex-wrap items-center justify-end gap-4 flex-1">
						{basicInformation?.website && (
							<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1.5px] rounded-full w-fit max-w-[200px]">
								<button className="flex items-center gap-2 bg-white dark:bg-[#1A1A1A] dark:text-[#FFF] px-2.5 py-1.5 rounded-full font-medium text-xs cursor-pointer text-[#494949] font-reddit w-full">
									<Link href={basicInformation?.website || ""} target='_blank' className="flex items-center gap-1.5">
										<Globe className="w-4 h-4 text-inherit" />
										<span>Website</span>
									</Link>
								</button>
							</div>
						)}
						{basicInformation?.whitepaper && (
							<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1.5px] rounded-full w-fit max-w-[200px]">
								<button className="flex items-center gap-2 bg-white dark:bg-[#1A1A1A] dark:text-[#FFF] px-3 py-1.5 rounded-full w-full font-medium text-xs cursor-pointer text-[#494949] font-reddit">
									<Link href={basicInformation?.whitepaper || ""} target='_blank' className="flex items-center gap-1.5">
										<Newspaper className="w-4 h-4 text-inherit" />
										<span>
											Whitepaper
										</span>
									</Link>
								</button>
							</div>
						)}
					</div>
				</div>
				{/* Explorers */}
				{basicInformation?.explorer?.length > 0 && (
					<DropdownCommon data={basicInformation?.explorer} title="Explorers" />
				)}
				{/* Contract Address */}
				{basicInformation?.contracts?.length > 0 && (
					<div className="relative group flex justify-between">
						<div className="flex items-center justify-between">
							<p className="text-xs font-medium opacity-50 font-noto">Contract</p>
						</div>

						<div className="flex items-center justify-end gap-2 mt-1">
							{/* Chỉ hiện contract đầu tiên */}
							<Image src={`https://s3-symbol-logo.tradingview.com/blockchain/${basicInformation?.contracts[0]?.['blockchain-id']}.svg`} alt={basicInformation?.contracts[0]?.['blockchain-name']} width={18} height={18} className="rounded-full" />
							<a
								href={basicInformation?.contracts[0]?.link}
								target="_blank"
								rel="noopener noreferrer"
								className="text-xs font-medium font-noto hover:underline"
							>
								{shortenAddress(basicInformation?.contracts[0]?.['blockchain-name'])} {shortenAddress(basicInformation?.contracts[0]?.contract)}
							</a>
							<span
								className="cursor-pointer"
								onClick={() => {
									navigator.clipboard.writeText(basicInformation?.contracts[0]?.address);
									toast.success('Address copied!');
								}}
							>
								<CopyIcon className="w-4 h-4" />
							</span>

							{/* Toggle hover để xem thêm */}
							<div className="relative">
								<span className="cursor-pointer" onClick={() => setShowAll(!showAll)}>
									<MoreHorizontal className="w-4 h-4" />
								</span>

								{showAll && (
									<div className="absolute right-0 z-50 mt-2 w-[300px] max-h-[300px] overflow-auto bg-white dark:bg-zinc-900 rounded-lg shadow-lg" ref={popupRef}>
										{basicInformation?.contracts.map((c, index) => (
											<div key={index} className="flex items-center justify-between gap-2 text-xs font-noto hover:bg-gray-100 px-3 py-2 cursor-pointer dark:hover:bg-[#222]">
												<Link href={c.link} target="_blank" rel="noopener noreferrer" onClick={() => setShowAll(false)}>
													<div className="flex items-center gap-2 justify-between w-full">
														<div className="flex items-center gap-2">
															<Image src={`https://s3-symbol-logo.tradingview.com/blockchain/${c?.['blockchain-id']}.svg`} alt={c?.['blockchain-name']} width={18} height={18} className="rounded-full" />
															<span>{shortenAddress(c?.['blockchain-name'])}</span>
														</div>
														<span>{shortenAddress(c?.contract)}</span>
													</div>
												</Link>
												<div className="flex items-center gap-2">
													<Link href={c?.link} target="_blank" rel="noopener noreferrer" onClick={() => setShowAll(false)}>
														<ExternalLinkIcon className="w-4 h-4" />
													</Link>
													<span
														className="cursor-pointer"
														onClick={() => {
															navigator.clipboard.writeText(c?.contract);
															toast.success('Address copied!');
															setShowAll(false)
														}}
													>
														<CopyIcon className="w-4 h-4" />
													</span>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				)}
				{/* Wallets */}
				{basicInformation?.wallets?.length > 0 && (
					<div className="flex items-center justify-between">
						<p className="text-xs font-medium opacity-50 font-noto">Wallets</p>
						<NavigationMenu className='z-10'>
							<NavigationMenuList className="flex space-x-8">
								<NavigationMenuItem>
									<NavigationMenuTrigger className="bg-transparent font-mediumflex items-center gap-1.5 px-0 py-0">
										{basicInformation?.wallets.slice(0, 4).map((item, index) => {
											const isValidUrl = item.logo?.startsWith('http');
											const imageSrc = isValidUrl
												? item.logo
												: 'https://pintu-academy.pintukripto.com/wp-content/uploads/2024/02/Web3-Wallet.png';

											return (
												<Link
													href={item.url}
													target="_blank"
													key={index}
													className="w-6 h-6 flex items-center text-xs hover:bg-[#F3F3F3] dark:text-white dark:hover:bg-[#222] hover:font-medium rounded-md cursor-pointer transition-colors"
												>
													<img
														src={imageSrc}
														width='100%'
														height='100%'
														className="rounded-full"
														alt="Wallet Logo"
													/>
												</Link>
											);
										})}
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="w-[232px] p-2 bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg z-80">
											{basicInformation?.wallets.map((item, index) => {
												const isValidUrl = item.logo?.startsWith('http');
												const imageSrc = isValidUrl
													? item.logo
													: 'https://pintu-academy.pintukripto.com/wp-content/uploads/2024/02/Web3-Wallet.png';

												return (
													<Link
														href={item.url}
														target="_blank"
														key={index}
														className="flex items-center gap-3 px-3 py-2 text-xs hover:bg-[#F3F3F3] dark:text-white dark:hover:bg-[#222] hover:font-medium rounded-md cursor-pointer transition-colors"
													>
														<img
															src={imageSrc}
															width={24}
															height={24}
															className="rounded-full"
															alt="Wallet Logo"
														/>
														<span>{item.name}</span>
													</Link>
												);
											})}
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				)}
				{basicInformation?.categories?.length > 0 && (
					<DropdownCategories data={basicInformation?.categories} title="Categories" />
				)}
				{basicInformation?.chains?.length > 0 && (
					<DropdownCategories data={basicInformation?.chains} title="Chains" />
				)}
				{/* Community */}
				{basicInformation?.community?.length > 0 && (
					<div className="flex items-center justify-between">
						<p className="text-xs font-medium opacity-50 font-noto">Community</p>
						<div className="flex items-center justify-end gap-4 flex-1">
							<div className="flex items-center gap-2">
								{basicInformation.community.map((channel, index) => {
									const IconComponent = communityIcons[channel.type];
									if (!IconComponent) return null;
									return (
										<Link
											key={index}
											href={channel.url}
											target="_blank"
											rel="noopener noreferrer"
											className="w-6 h-6 flex items-center justify-center items-center rounded-full hover:opacity-80 transition"
											title={IconComponent.label}
										>
											{IconComponent.icon}
										</Link>
									);
								})}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default BasicInformation;