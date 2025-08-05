'use client'
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/DropdownMenu";
import { Button } from "../ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import GoogleIcon from "@/icons/GoogleIcon";
import Github2Icon from "@/icons/Github2Icon";
import TwitterIcon from "@/icons/TwitterIcon";
import Telegram2Icon from "@/icons/Telegram2Icon";
import MetaMaskIcon from "@/icons/MetaMaskIcon";
import PhantomIcon from "@/icons/PhantomIcon";

const SocialWalletLogin = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	interface User {
		id: string;
		name: string;
		email: string;
		avatar: string;
		provider: string;
	}

	const [user, setUser] = useState<User | null>(null);

	const handleLogin = (provider: string, userData: any) => {
		const newUser: any = {
			id: Date.now().toString(),
			name: userData.name || "User",
			email: userData.email || "",
			avatar: userData.avatar || "",
			provider,
		};
		setUser(newUser);
		setIsModalOpen(false);
	};

	const handleLogout = () => {
		setUser(null);
	};

	const socialProviders = [
		{
			name: "Google",
			icon: <GoogleIcon />,
			action: () => handleLogin("google", {
				name: "Google User",
				email: "user@gmail.com",
				avatar: "https://ui-avatars.com/api/?name=Google+User&background=4285f4&color=fff"
			})
		},
		{
			name: "GitHub",
			icon: <Github2Icon />,
			action: () => handleLogin("github", {
				name: "GitHub User",
				email: "user@github.com",
				avatar: "https://ui-avatars.com/api/?name=GitHub+User&background=333&color=fff"
			})
		},
		{
			name: "X (Twitter)",
			icon: <TwitterIcon />,
			action: () => handleLogin("twitter", {
				name: "X User",
				email: "user@x.com",
				avatar: "https://ui-avatars.com/api/?name=X+User&background=1da1f2&color=fff"
			})
		},
		{
			name: "Telegram",
			icon: <Telegram2Icon />,
			action: () => handleLogin("telegram", {
				name: "Telegram User",
				email: "user@telegram.org",
				avatar: "https://ui-avatars.com/api/?name=Telegram+User&background=229ed9&color=fff"
			})
		}
	];

	const walletProviders = [
		{
			name: "Phantom",
			icon: <PhantomIcon />,
			action: () => handleLogin("phantom", {
				name: "Phantom Wallet",
				email: "phantom@wallet.com",
				avatar: "https://ui-avatars.com/api/?name=Phantom&background=ab9ff2&color=fff"
			})
		},
		{
			name: "MetaMask",
			icon: <MetaMaskIcon />,
			action: () => handleLogin("metamask", {
				name: "MetaMask Wallet",
				email: "metamask@wallet.com",
				avatar: "https://ui-avatars.com/api/?name=MetaMask&background=f6851b&color=fff"
			})
		}
	];

	if (user) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="flex items-center gap-2 p-2 cursor-pointer">
						<Avatar className="h-8 w-8">
							<AvatarImage src={user?.avatar} alt={user?.name} />
							<AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<span className="hidden sm:inline-block">{user?.name}</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="bg-white">
					<DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
						Log out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return (
		<>
			<button className="px-4.5 py-2.5 rounded-full font-medium text-sm transition-colors bg-gradient-to-r from-[#DDF346] to-[#84EA07] cursor-pointer text-[#494949] font-space" onClick={() => setIsModalOpen(true)}>
				Log In
			</button>
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="sm:max-w-lg w-full">
					<DialogHeader>
						<DialogTitle className="text-center text-xl font-semibold text-reddit text-[#494949]">
							Select your login method
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-6 px-6 pb-6 text-[#494949]">
						{/* Social Login Section */}
						<div>
							<h3 className="text-sm font-medium text-muted-foreground mb-3">
								With social account
							</h3>
							<div className="space-y-3">
								{socialProviders.map((provider) => (
									<button
										key={provider.name}
										onClick={provider.action}
										className={`w-full hover:bg-[#F8FAFD] dark:hover:bg-[#222] cursor-pointer text-sm font-semibold border border-[#CFD6E4] p-3 rounded-lg flex justify-center items-center gap-2`}
									>
										<span>{provider.icon}</span>
										<span>Continue with {provider.name}</span>
									</button>
								))}
							</div>
						</div>

						{/* Divider */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t text-[#EFF2F5]" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground font-semibold">
									Or
								</span>
							</div>
						</div>

						{/* Wallet Login Section */}
						<div>
							<h3 className="text-sm font-medium text-muted-foreground mb-3">
								With wallet
							</h3>
							<div className="space-y-3">
								{walletProviders.map((provider) => (
									<button
										key={provider.name}
										onClick={provider.action}
										className={`w-full hover:bg-[#F8FAFD] dark:hover:bg-[#222] cursor-pointer text-sm font-semibold border border-[#CFD6E4] p-3 rounded-lg flex justify-center items-center gap-2`}
									>
										<span>{provider.icon}</span>
										<span>Connect with {provider.name}</span>
									</button>
								))}
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default SocialWalletLogin;