'use client';
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import LoginModal from "../LoginModal";
import { useAuth } from "@/hooks/useAuth";

const SocialWalletLogin = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { user, handleLogin, handleLogout } = useAuth();

	if (user) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex items-center gap-2 p-2 cursor-pointer">
						<Avatar className="h-8 w-8">
							<AvatarImage src={user?.profile_image_url} alt={user?.username} />
							<AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<span className="hidden sm:inline-block dark:text-white">{user?.name}</span>
					</div>
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
			<button
				onClick={() => setIsModalOpen(true)}
				className="px-4.5 py-2.5 rounded-full font-medium text-sm transition-colors bg-gradient-to-r from-[#DDF346] to-[#84EA07] cursor-pointer text-[#494949] font-space"
			>
				Log In
			</button>

			{/* Tách modal ra */}
			<LoginModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				handleLogin={handleLogin}
			/>
		</>
	);
};

export default SocialWalletLogin;