'use client'
import { Search } from "lucide-react";
import { Input } from "./ui/Input";
import NoodlesLogo from "@/icons/NoodlesLogo";
import DarkNoodlesLogo from "@/icons/DarkNoodlesLogo";
import useThemeMode from '@/lib/useThemkMode';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/NavigationMenu";
import Link from "next/link";
import SearchCryptoInput from "./SearchCryptoInput";
import SocialWalletLogin from "./common/SocialWalletLogin";
import { useTypeFromPath } from "@/lib/useTypeFromPath";
import SearchStockInput from "./SearchStockInput";
import SearchCommodityInput from "./SearchCommodityInput";

const Header = () => {
	const { isDark, toggleTheme } = useThemeMode();
	const type = useTypeFromPath();
	return (
		<header className={`bg-[var(--bg-header)] shadow-md sticky top-0 z-50`}>
			<div className="container mx-auto px-6 py-2">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="flex items-center gap-10">
						<Link className="cursor-pointer" href='/'>
							{isDark ? <DarkNoodlesLogo /> : <NoodlesLogo />}
						</Link>
						<div className={`text-[var(--text)] flex items-center gap-10`}>
							<NavigationMenu>
								<NavigationMenuList className="flex space-x-8">
									<NavigationMenuItem>
										<Link
											href="/stablecoins"
											className="font-medium transition-colors"
										>
											Stablecoins
										</Link>
									</NavigationMenuItem>
									<NavigationMenuItem>
										<Link
											href="/about"
											className={`font-medium text-[var(--text)] transition-colors`}
										>
											About
										</Link>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>
					</div>
					<div className="flex items-center gap-5">
						{/* Search Bar */}
						{type === 'cryptocurrencies' && (
							<SearchCryptoInput />
						)}
						{type === 'stocks' && (
							<SearchStockInput />
						)}
						{type === 'commodities' && (
							<SearchCommodityInput />
						)}
						<button
							onClick={toggleTheme}
							className={`relative flex items-center w-12 h-6 rounded-full p-1 transition-all duration-500 
		${isDark ? "bg-gradient-to-r from-gray-800 to-gray-700 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
									: "bg-gradient-to-r from-yellow-200 to-yellow-400 shadow-inner"}`
							}
						>
							{/* Nút trượt */}
							<span
								className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md flex items-center justify-center transform transition-all duration-500 
			${isDark ? "translate-x-6" : "translate-x-0"}`}
							>
								{isDark ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-3.5 h-3.5 text-yellow-300"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M21.752 15.002A9.718 9.718 0 0 1 12 22a9.75 9.75 0 0 1 0-19.5 9.718 9.718 0 0 1 9.752 12.502z" />
									</svg>
								) : (
									/* ☀️ Icon sun */
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-3.5 h-3.5 text-yellow-500"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12Zm0 3a1 1 0 0 1-1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1Zm10 10a1 1 0 0 1-1 1h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1Zm13.657 6.657a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414Zm-9.9-9.9a1 1 0 0 1-1.414 0l-.707-.707A1 1 0 0 1 6.05 5.636l.707.707a1 1 0 0 1 0 1.414Zm0 9.9l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 1 1 1.414 1.414Zm9.9-9.9l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 1 1-1.414-1.414Z" />
									</svg>
								)}
							</span>
						</button>
						{/* Launch App Button */}
						<SocialWalletLogin />
					</div>
				</div>
				<div className="flex-1 mt-4 w-full block md:hidden">
					<div className="relative">
						<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA0700] p-[1px] rounded-full">
							<div className="relative rounded-full bg-[var(--background)]">
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
		</header >
	);
};

export default Header;