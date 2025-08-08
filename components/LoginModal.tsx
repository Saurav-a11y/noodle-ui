'use client';

import Github2Icon from "@/icons/Github2Icon";
import GoogleIcon from "@/icons/GoogleIcon";
import MetaMaskIcon from "@/icons/MetaMaskIcon";
import PhantomIcon from "@/icons/PhantomIcon";
import Telegram2Icon from "@/icons/Telegram2Icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog";
import TwitterIcon from "@/icons/TwitterIcon";

type LoginModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	handleLogin: () => void;
};

export default function LoginModal({ open, onOpenChange, handleLogin }: LoginModalProps) {
	const socialProviders = [
		{ name: 'Google', icon: <GoogleIcon /> },
		{ name: 'GitHub', icon: <Github2Icon /> },
		{ name: 'Telegram', icon: <Telegram2Icon /> }
	];

	const walletProviders = [
		{ name: 'Phantom', icon: <PhantomIcon /> },
		{ name: 'MetaMask', icon: <MetaMaskIcon /> }
	];

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg w-full">
				<DialogHeader>
					<DialogTitle className="text-center text-xl font-semibold text-reddit text-[#494949] dark:text-white">
						Select your login method
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-6 px-6 pb-6 text-[#494949]">
					{/* Social Login */}
					<div>
						<h3 className="text-sm font-medium text-muted-foreground mb-3 dark:text-white">
							With social account
						</h3>
						<div className="space-y-3">
							<button
								onClick={handleLogin}
								className="w-full hover:bg-[#F8FAFD] dark:hover:bg-[#222] cursor-pointer text-sm font-semibold border border-[#CFD6E4] p-3 rounded-lg flex justify-center items-center gap-2 dark:text-white"
							>
								<TwitterIcon />
								<span>Continue with X (Twitter)</span>
							</button>
							{socialProviders.map((provider) => (
								<button
									key={provider.name}
									disabled
									className="w-full text-sm font-semibold border border-[#CFD6E4] p-3 rounded-lg flex justify-center items-center gap-2 dark:text-white cursor-not-allowed opacity-60"
								>
									<span>{provider.icon}</span>
									<span>Continue with {provider.name} (Coming Soon)</span>
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
							<span className="bg-background dark:bg-[#1a1a1a] px-2 text-muted-foreground font-semibold dark:text-white">
								Or
							</span>
						</div>
					</div>

					{/* Wallet Login */}
					<div>
						<h3 className="text-sm font-medium text-muted-foreground mb-3 dark:text-white">
							With wallet
						</h3>
						<div className="space-y-3">
							{walletProviders.map((provider) => (
								<button
									key={provider.name}
									disabled
									className="w-full text-sm font-semibold border border-[#CFD6E4] p-3 rounded-lg flex justify-center items-center gap-2 dark:text-white cursor-not-allowed opacity-60"
								>
									<span>{provider.icon}</span>
									<span>Connect with {provider.name} (Coming Soon)</span>
								</button>
							))}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}