'use client'
import { Search } from "lucide-react";
import { Input } from "./ui/Input";
import NoodlesLogo from "@/icons/NoodlesLogo";
import DarkNoodlesLogo from "@/icons/DarkNoodlesLogo";
import useThemekMode from '@/lib/useThemkMode';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/NavigationMenu";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import SocialWalletLogin from "./common/SocialWalletLogin";

const Header = () => {
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
						<SearchInput />
						<div className="text-black dark:text-white flex items-center gap-10">
							<NavigationMenu>
								<NavigationMenuList className="flex space-x-8">
									{/* Homepage */}
									<NavigationMenuItem>
										<Link
											href="/"
											className="font-medium"
										>
											Homepage
										</Link>
									</NavigationMenuItem>

									{/* Cryptocurrencies */}
									<NavigationMenuItem>
										<Link
											href="/cryptocurrencies"
											className="font-medium"
										>
											Cryptocurrencies
										</Link>
									</NavigationMenuItem>

									{/* Stocks */}
									<NavigationMenuItem>
										<Link
											href="/stocks"
											className="font-medium transition-colors"
										>
											Stocks
										</Link>
									</NavigationMenuItem>

									{/* Commodities */}
									<NavigationMenuItem>
										<a
											href="/commodities"
											className="font-medium"
										>
											Commodities
										</a>
									</NavigationMenuItem>
									<NavigationMenuItem>
										<a
											href="/watchlist"
											className="font-medium"
										>
											Watchlist
										</a>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>
					</div>
					{/* Launch App Button */}
					<SocialWalletLogin />
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