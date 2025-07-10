'use client'
import { ArrowDown01, Search } from "lucide-react";
import { Input } from "./ui/Input";
import NoodlesLogo from "@/icons/NoodlesLogo";
import DarkNoodlesLogo from "@/icons/DarkNoodlesLogo";
import { useRouter } from "next/navigation";
import useThemekMode from '@/lib/useThemkMode';
import ArrowDown from "@/icons/ArrowDown";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "./ui/NavigationMenu";
import Link from "next/link";
import CryptoIcon from "@/icons/CryptoIcon";
import OilIcon from "@/icons/OilIcon";
import GoldIcon from "@/icons/GoldIcon";
import StockIcon from "@/icons/StockIcon";

const marketItems = [
	{ name: 'Crypto', icon: <CryptoIcon /> },
	{ name: 'Oil', icon: <OilIcon /> },
	{ name: 'Gold', icon: <GoldIcon /> },
	{ name: 'Stocks', icon: <StockIcon /> },
];

const Header = () => {
	const router = useRouter();
	const { isDark } = useThemekMode();
	return (
		<header className="bg-white dark:bg-[#0B0B0B] shadow-md sticky top-0 z-50">
			<div className="container mx-auto px-6 py-2">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link className="cursor-pointer" href='/'>
						{isDark ? <DarkNoodlesLogo /> : <NoodlesLogo />}
					</Link>

					<div className="flex items-center">
						{/* Search Bar */}
						<div className="flex-1 max-w-[200px] mx-8 hidden md:block">
							<div className="relative">
								<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA0700] p-[1px] rounded-full">
									<div className="relative rounded-full bg-[#f9f9f9] dark:bg-[#1A1A1A] dark:text-[#FFFFFF]">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
										<Input
											placeholder="Search..."
											className="pl-10 py-2 w-full bg-transparent border-none rounded-full focus:outline-none focus:ring-0 font-reddit dark:text-[#FFFFFF]"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="text-black dark:text-white flex items-center gap-10">
							<NavigationMenu>
								<NavigationMenuList className="flex space-x-8">
									<NavigationMenuItem>
										<Link
											href="/"
											className="font-medium"
										>
											Homepage
										</Link>
									</NavigationMenuItem>
									<NavigationMenuItem>
										<NavigationMenuTrigger className="bg-transparent font-mediumflex items-center gap-1">
											<p className="text-base">Markets</p>
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<div className="w-[232px] p-2 bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg">
												{marketItems.map((item, index) => (
													<Link
														href={`/markets/${item.name.toLowerCase()}`}
														key={index}
														className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-[#F3F3F3] dark:text-white dark:hover:bg-[#222] hover:font-medium rounded-md cursor-pointer transition-colors"
													>
														<span className="text-lg">{item.icon}</span>
														<span>{item.name}</span>
													</Link>
												))}
											</div>
										</NavigationMenuContent>
									</NavigationMenuItem>
									{/* Community */}
									<NavigationMenuItem>
										<Link
											href="/community"
											className="font-medium transition-colors"
										>
											Community
										</Link>
									</NavigationMenuItem>

									{/* Prices */}
									<NavigationMenuItem>
										<a
											href="/prices"
											className="font-medium"
										>
											Prices
										</a>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>
					</div>
					{/* Launch App Button */}
					<button className="px-4.5 py-2.5 rounded-full font-medium text-sm transition-colors bg-gradient-to-r from-[#DDF346] to-[#84EA07] cursor-pointer text-[#494949] font-space">
						Launch App
					</button>
				</div>
				<div className="flex-1 mt-4 w-full block md:hidden">
					<div className="relative">
						<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA0700] p-[1px] rounded-full">
							<div className="relative rounded-full bg-[#f9f9f9]">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
								<Input
									placeholder="Search projects, tokens, or founders"
									className="pl-10 py-2 w-full bg-transparent border-none rounded-full focus:outline-none focus:ring-0 font-reddit"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;