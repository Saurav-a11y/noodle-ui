'use client';
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import LoginModal from "../LoginModal";
import { useAuth } from "@/hooks/useAuth";
import LogoutIcon from "@/icons/LogoutIcon";
import ShieldIcon from "@/icons/ShieldIcon";
import NotificationIcon from "@/icons/NotificationIcon";
import FavouriteIcon from "@/icons/FavouriteIcon";
import AnalystIcon from "@/icons/AnalystIcon";
import Link from "next/link";
import ProfileIcon from "@/icons/ProfileIcon";

const SocialWalletLogin = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { user, handleLogin, handleLogout } = useAuth();

	if (user) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="p-[2px] rounded-full bg-gradient-to-br from-[#DDF346] to-[#84EA07]">
						<Avatar className="h-10 w-10 cursor-pointer">
							<AvatarImage src={user?.avatar} alt={user?.username} />
							<AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
						</Avatar>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="center" className="bg-white w-[240px] rounded-xl p-4">
					<div className="flex items-center gap-2">
						<div className="p-[2px] rounded-full bg-gradient-to-br from-[#DDF346] to-[#84EA07]">
							<Avatar className="h-10 w-10 bg-white">
								<AvatarImage src={user?.profile_image_url} alt={user?.username} />
								<AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
							</Avatar>
						</div>
						<div className="space-y-1">
							<p className="text-[#111] fonr-space text-xs font-medium">{user?.name}</p>
							<p className="text-[10px] font-medium text-[#494949] bg-[#EBEBEB] rounded-full py-[2px] px-2 w-fit">Free Plan</p>
						</div>
					</div>
					<hr className="my-3 text-[#EEEEEE]" />
					<Link href='/settings/profile'>
						<DropdownMenuItem className="cursor-pointer space-x-2 hover:bg-[#F8F8F8] rounded-lg p-2">
							<ProfileIcon />
							<span>My Profile</span>
						</DropdownMenuItem>
					</Link>
					<Link href='/settings/security'>
						<DropdownMenuItem className="cursor-pointer space-x-2 hover:bg-[#F8F8F8] rounded-lg p-2">
							<ShieldIcon />
							<span>Account Security</span>
						</DropdownMenuItem>
					</Link>
					<Link href='/settings/notifications'>
						<DropdownMenuItem className="cursor-pointer space-x-2 hover:bg-[#F8F8F8] rounded-lg p-2">
							<NotificationIcon />
							<span>Notification Settings</span>
						</DropdownMenuItem>
					</Link>
					<Link href='/settings/watchlist'>
						<DropdownMenuItem className="cursor-pointer space-x-2 hover:bg-[#F8F8F8] rounded-lg p-2">
							<FavouriteIcon />
							<span>Watchlist & Portfolio</span>
						</DropdownMenuItem>
					</Link>
					<Link href='/settings/analytics'>
						<DropdownMenuItem className="cursor-pointer space-x-2 hover:bg-[#F8F8F8] rounded-lg p-2">
							<AnalystIcon />
							<span>Account Analytics</span>
						</DropdownMenuItem>
					</Link>
					<DropdownMenuItem onClick={handleLogout} className="cursor-pointer space-x-2 hover:bg-[#F8F8F8] rounded-lg p-2">
						<LogoutIcon />
						<span>Log Out</span>
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