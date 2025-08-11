'use client';
import { useMemo, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import LoginModal from "../LoginModal";
import { useLogout, useMe, useTwitterLogin } from "@/hooks/useAuth";

const SocialWalletLogin = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data: user, isLoading } = useMe();
	const { login: handleLogin } = useTwitterLogin();
	const logout = useLogout();

	const avatarUrl = useMemo(
		() => user?.avatar || user?.profile_image_url || '',
		[user]
	);

	const displayName = user?.name || user?.username || 'User';
	const initials =
		(displayName?.match(/\b\w/g) || []).join('').slice(0, 2).toUpperCase() || 'U';

	const handleLogout = () => {
		logout.mutate();
	};
	if (isLoading) {
		return (
			<div className="h-9 w-[120px] rounded-full bg-black/5 dark:bg-white/10 animate-pulse" />
		);
	}

	if (user) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex items-center gap-2 p-2 cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10">
						<Avatar className="h-8 w-8">
							<AvatarImage src={avatarUrl} alt={user?.username} />
							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>
						<span className="hidden sm:inline-block dark:text-white">{displayName}</span>
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					align="end"
					className="bg-white dark:bg-[#0B0B0B] border border-black/5 dark:border-white/10"
				>
					{/* Tuỳ chọn thêm: trang profile */}
					{/* <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">Profile</DropdownMenuItem> */}
					<DropdownMenuItem
						onClick={handleLogout}
						className="text-destructive cursor-pointer focus:text-destructive"
					>
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
				handleLogin={() => {
					handleLogin();
				}}
			/>
		</>
	);
};

export default SocialWalletLogin;