'use client';

import Github2Icon from "@/icons/Github2Icon";
import GoogleIcon from "@/icons/GoogleIcon";
import MetaMaskIcon from "@/icons/MetaMaskIcon";
import PhantomIcon from "@/icons/PhantomIcon";
import Telegram2Icon from "@/icons/Telegram2Icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog";
import TwitterIcon from "@/icons/TwitterIcon";
import { startTwitterLogin } from "@/hooks/useAuth";

type LoginModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	// handleLogin: () => void;
};

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
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
			<DialogContent className="sm:max-w-lg w-full bg-[var(--bg-card)]">
				<DialogHeader>
					<DialogTitle className="text-center text-xl font-semibold text-reddit text-[var(--text)]">
						Select your login method
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-6 px-6 pb-6 text-[var(--text)]">
					{/* Social Login */}
					<div>
						<h3 className="text-sm font-medium text-muted-foreground mb-3 text-[var(--text)]">
							With social account
						</h3>
						<div className="space-y-3">
							<button
								onClick={() => startTwitterLogin()}
								className="w-full hover:bg-[var(--bg-button)] cursor-pointer text-sm font-semibold border border-[#CFD6E4] p-3 rounded-lg flex justify-center items-center gap-2 text-[var(--text)]"
							>
								<TwitterIcon />
								<span>Continue with X (Twitter)</span>
							</button>
							{socialProviders.map((provider) => (
								<button
									key={provider.name}
									disabled
									className="w-full hover:bg-[var(--bg-button)] text-sm font-semibold border border-[#CFD6E4] p-3 rounded-lg flex justify-center items-center gap-2 text-[var(--text)] cursor-not-allowed opacity-60"
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
							<span className="bg-[var(--bg-card)] px-2 text-muted-foreground font-semibold text-[var(--text)]">
								Or
							</span>
						</div>
					</div>

					{/* Wallet Login */}
					<div>
						<h3 className="text-sm font-medium text-muted-foreground mb-3 text-[var(--text)]">
							With wallet
						</h3>
						<div className="space-y-3">
							{walletProviders.map((provider) => (
								<button
									key={provider.name}
									disabled
									className="w-full hover:bg-[var(--bg-button)] text-sm font-semibold border border-[#CFD6E4] p-3 rounded-lg flex justify-center items-center gap-2 text-[var(--text)] cursor-not-allowed opacity-60"
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