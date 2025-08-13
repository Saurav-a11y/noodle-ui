'use client'

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import UploadIcon from "@/icons/UploadIcon";
import UserDefaultIcon from "@/icons/UserDefaultIcon";
import CalendarIcon from "@/icons/CalendarIcon";
import XIcon from "@/icons/XIcon";
import LinkIcon from "@/icons/LinkIcon";
import TelegramIcon from "@/icons/TelegramIcon";
import DiscordIcon from "@/icons/DiscordIcon";
import { useAuth } from "@/hooks/useAuth";

const ProfileDetails = () => {
	const { user } = useAuth();
	console.log("🚀 ~ ProfileDetails ~ user:", user)
	const [formData, setFormData] = useState({
		displayName: "",
		username: "",
		email: "",
		birthday: "",
		bio: ""
	});

	const [characterCounts, setCharacterCounts] = useState({
		displayName: 0,
		username: 0,
		bio: 0
	});

	const handleInputChange = (field: string, value: string) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}));

		if (field in characterCounts) {
			setCharacterCounts(prev => ({
				...prev,
				[field]: value.length
			}));
		}
	};

	const socialAccounts = [
		{
			name: "X (Twitter)",
			description: "Connect to your Twitter account",
			icon: <XIcon width={28} height={28} />,
			connected: false
		},
		{
			name: "Telegram",
			description: "Connect to your Telegram account",
			icon: <TelegramIcon width={28} height={28} />,
			connected: false
		},
		{
			name: "Discord",
			description: "Connect to your Discord account",
			icon: <DiscordIcon width={28} height={28} />,
			connected: false
		}
	];

	useEffect(() => {
		if (user) {
			setFormData({
				displayName: user?.name || "",
				username: user?.username || "",
				email: user?.email || "",
				birthday: user?.birthday || "",
				bio: user?.bio || user?.biography || "" // tuỳ BE trả về
			});

			setCharacterCounts({
				displayName: user?.name?.length || 0,
				username: user?.username?.length || 0,
				bio: (user.biography || "").length
			});
		}
	}, [user]);

	return (
		<div className="space-y-8">
			<div className="bg-white dark:bg-black rounded-[20px] p-5 text-[#2F2F2F] space-y-4">
				<p className="font-medium font-space">Profile details</p>
				<div className="space-y-4 font-noto">
					{/* Avatar */}
					<div>
						<Label className="text-xs font-normal">Avatar</Label>
						<div className="flex items-center gap-5 mt-2">
							<Avatar className="w-20 h-20">
								{user?.avatar ? (
									<AvatarImage src={user.avatar} alt={user.username || "avatar"} />
								) : (
									<AvatarFallback className="bg-[#F0F0F0]">
										<UserDefaultIcon />
									</AvatarFallback>
								)}
							</Avatar>
							<div className="flex gap-2">
								<Button variant="outline" size="sm" className="font-normal cursor-pointer">
									<UploadIcon />
									Change photo
								</Button>
								<Button variant="ghost" size="sm" className="text-muted-foreground font-normal cursor-pointer">
									Remove
								</Button>
							</div>
						</div>
					</div>

					{/* Form Fields */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="displayName" className="font-normal text-xs">Display name</Label>
							<div className="relative mt-1.5">
								<Input
									id="displayName"
									placeholder="Choose your own nickname"
									value={formData.displayName}
									onChange={(e) => handleInputChange("displayName", e.target.value)}
									maxLength={30}
									className="border-[#F0F0F0] outline-none focus:outline-none h-12 rounded-xl p-4"
								/>
								<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
									{characterCounts.displayName}/30
								</span>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="username" className="font-normal text-xs">Username</Label>
							<div className="relative mt-1.5">
								<Input
									id="username"
									placeholder="Set your ID so that users can search for you"
									value={formData.username}
									onChange={(e) => handleInputChange("username", e.target.value)}
									maxLength={30}
									className="border-[#F0F0F0] outline-none focus:outline-none h-12 rounded-xl p-4"
								/>
								<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
									{characterCounts.username}/30
								</span>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="email" className="font-normal text-xs">Email</Label>
							<div className="relative mt-1.5">
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={formData.email}
									onChange={(e) => handleInputChange("email", e.target.value)}
									className="border-[#F0F0F0] outline-none focus:outline-none h-12 rounded-xl p-4"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="birthday" className="font-normal text-xs">Birthday</Label>
							<div className="relative mt-1.5">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none">
									<CalendarIcon />
								</span>
								<Input
									id="birthday"
									type="text"
									placeholder="Birthday"
									value={formData.birthday}
									onChange={(e) => handleInputChange("birthday", e.target.value)}
									className="border-[#F0F0F0] outline-none focus:outline-none h-12 rounded-xl p-4 pl-10"
								/>
							</div>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="bio" className="font-normal text-xs">Bio</Label>
						<div className="relative mt-1.5">
							<Textarea
								id="bio"
								placeholder="A brief introduction about yourself"
								value={formData.bio}
								onChange={(e) => handleInputChange("bio", e.target.value)}
								className="border-[#F0F0F0] outline-none focus:outline-none h-12 rounded-xl p-4"
								maxLength={250}
								rows={4}
							/>
							<span className="absolute right-3 bottom-3 text-xs text-muted-foreground">
								{characterCounts.bio}/250
							</span>
						</div>
					</div>

					<Button className="transition-colors bg-gradient-to-r from-[#DDF346] to-[#84EA07] cursor-pointer">
						Save
					</Button>
				</div>
			</div>

			{/* Social Accounts */}
			<div className="bg-white dark:bg-black rounded-[20px] p-5 text-[#2F2F2F] space-y-5">
				<p className="font-medium font-space">Social Accounts</p>
				<div className="space-y-4 font-noto">
					{socialAccounts.map((account, index) => (
						<div key={index} className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-lg bg-[#F8F8F8] flex justify-center items-center">{account.icon}</div>
								<div>
									<p className="font-medium text-sm">{account.name}</p>
									<div className="text-xs opacity-50">{account.description}</div>
								</div>
							</div>
							<Button variant="outline" size="sm" className="rounded-lg px-3 py-2 font-xs font-normal cursor-pointer">
								<LinkIcon />
								Connect
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProfileDetails;