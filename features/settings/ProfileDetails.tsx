'use client'

import { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { format, parseISO, isValid } from "date-fns";
import { toast } from 'react-toastify';

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
import { useMe } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Calendar } from "@/components/ui/Calendar";
import { useUpdateUser } from "@/hooks/useUser";
import { useCloudinaryUnsignedUpload } from "@/hooks/useCloudinaryUnsignedUpload";
import { useQueryClient } from "@tanstack/react-query";

const ProfileDetails = () => {
	const queryClient = useQueryClient();
	const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
	const { data, isFetching } = useMe();
	const user = data?.data;
	const updateUser = useUpdateUser({ userId: user?.id });
	const { upload, uploading, progress, error } = useCloudinaryUnsignedUpload(
		'noodles',
		{ folder: 'avatar', maxFileSizeMB: 5, accept: ['image/jpeg', 'image/png', 'image/webp'] }
	);

	const [isDobOpen, setIsDobOpen] = useState(false);
	const [formData, setFormData] = useState({
		displayName: "",
		username: "",
		email: "",
		birthday: "",
		bio: "",
		avatar: ""
	});

	const [characterCounts, setCharacterCounts] = useState({
		displayName: 0,
		username: 0,
		bio: 0
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const onPickAvatarClick = () => fileInputRef.current?.click();

	const onPickAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		try {
			const res = await upload(file); // { secure_url, ... }
			setPreviewAvatar(res.secure_url);                      // đổi ảnh ngay
			setFormData(s => ({ ...s, avatar: res.secure_url }));  // để Save sẽ gửi lên BE
			toast.success('Avatar uploaded');
		} catch (err: any) {
			toast.error(err?.message || 'Upload failed');
		} finally {
			e.target.value = '';
		}
	};

	const onRemoveAvatar = () => {
		setPreviewAvatar(null);
		setFormData(s => ({ ...s, avatar: '' }));
	};

	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (field in characterCounts) {
			setCharacterCounts((prev) => ({ ...prev, [field]: value.length }));
		}
	};

	const dobDate = useMemo(() => {
		if (!formData.birthday) return undefined;
		const d = parseISO(formData.birthday);
		return isValid(d) ? d : undefined;
	}, [formData.birthday]);

	const handleSelectDob = (date?: Date) => {
		if (!date) return;
		const value = format(date, 'yyyy-MM-dd');
		handleInputChange('birthday', value);
		setIsDobOpen(false);
	};

	const onSave = async () => {
		if (!formData.displayName.trim()) {
			toast.error('Display name is required');
			return;
		}
		if (!formData.username.trim()) {
			toast.error('Username is required');
			return;
		}
		try {
			await updateUser.mutateAsync({
				name: formData.displayName,
				username: formData.username,
				email: formData.email,
				birthday: formData.birthday,
				biography: formData.bio,
				avatar: formData.avatar
			});
			await queryClient.invalidateQueries({ queryKey: ['me'] });
		} catch { }
	};

	useEffect(() => {
		if (!user) {
			setPreviewAvatar(null);
			setFormData((s) => ({ ...s, avatar: "" }));
			return;
		}
		const ava = user?.avatar || "";
		setPreviewAvatar(ava || null);
		setFormData((s) => ({
			...s,
			displayName: user?.name || "",
			username: user?.username || "",
			email: user?.email || "",
			birthday: (user as any)?.birthday || "",
			bio: (user as any)?.biography || "",
			avatar: ava
		}));
	}, [user]);

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

	return (
		<div className="space-y-8">
			<div className="bg-[var(--background)] rounded-[20px] p-5 text-[var(--text)] space-y-4">
				<p className="font-medium font-space text-[var(--text)]">Profile details</p>
				<div className="space-y-4 font-noto">
					{/* Avatar */}
					<div>
						<Label className="text-xs font-normal text-[var(--text)]">Avatar</Label>
						<div className="flex items-center gap-5 mt-2">
							<div className="relative">
								<Avatar className="w-20 h-20">
									{previewAvatar ? (
										<AvatarImage src={previewAvatar} alt={user?.data?.username || "avatar"} />
									) : (
										<AvatarFallback className="bg-[#F0F0F0]">
											<UserDefaultIcon />
										</AvatarFallback>
									)}
								</Avatar>
								{uploading && (
									<div className="absolute inset-0 grid place-items-center bg-black/40 rounded-full">
										<span className="text-white text-xs">{progress}%</span>
									</div>
								)}
							</div>
							<div className="flex gap-2">
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									hidden
									onChange={onPickAvatar}
								/>
								<Button
									variant="outline"
									size="sm"
									onClick={onPickAvatarClick}
									disabled={uploading || isFetching}
									className="font-normal cursor-pointer"
								>
									<UploadIcon />
									Change photo
								</Button>
								<Button
									variant="ghost"
									size="sm"
									onClick={onRemoveAvatar}
									disabled={uploading || isFetching || !previewAvatar}
									className="font-normal cursor-pointer text-[var(--text)]"
								>
									Remove
								</Button>
							</div>
						</div>
						{error && <div className="text-xs text-red-500 mt-1">{error}</div>}
					</div>

					{/* Form Fields */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="displayName" className="font-normal text-xs text-[var(--text)]">Display name</Label>
							<div className="relative mt-1.5">
								<Input
									id="displayName"
									placeholder="Choose your own nickname"
									value={formData.displayName}
									onChange={(e) => handleInputChange("displayName", e.target.value)}
									maxLength={30}
									className="border border-[var(--border)] outline-none focus:outline-none h-12 rounded-xl p-4"
								/>
								<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
									{characterCounts.displayName}/30
								</span>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="username" className="font-normal text-xs text-[var(--text)]">Username</Label>
							<div className="relative mt-1.5">
								<Input
									id="username"
									placeholder="Set your ID so that users can search for you"
									value={formData.username}
									onChange={(e) => handleInputChange("username", e.target.value)}
									maxLength={30}
									className="border border-[var(--border)] outline-none focus:outline-none h-12 rounded-xl p-4"
								/>
								<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
									{characterCounts.username}/30
								</span>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="email" className="font-normal text-xs text-[var(--text)]">Email</Label>
							<div className="relative mt-1.5">
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={formData.email}
									onChange={(e) => handleInputChange("email", e.target.value)}
									className="border border-[var(--border)] outline-none focus:outline-none h-12 rounded-xl p-4"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="birthday" className="font-normal text-xs text-[var(--text)]">Birthday</Label>
							<div className="relative mt-1.5">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none">
									<CalendarIcon />
								</span>
								<Input
									id="birthday"
									type="text"
									placeholder="Birthday"
									value={formData.birthday}
									readOnly
									onClick={() => setIsDobOpen(true)}
									className="border border-[var(--border)] outline-none focus:outline-none h-12 rounded-xl p-4 pl-10"
								/>
							</div>
							<Dialog open={isDobOpen} onOpenChange={setIsDobOpen}>
								<DialogContent className="sm:max-w-[360px] p-0 overflow-hidden">
									<DialogHeader className="p-4 pb-0 text-[var(--text)]">
										<DialogTitle>Select your birthday</DialogTitle>
									</DialogHeader>
									<div className="p-4">
										<Calendar
											mode="single"
											selected={dobDate}
											onSelect={handleSelectDob}
											// tuỳ chọn UX:
											captionLayout="dropdown"
											className="rounded-md border w-full"
										/>
										<div className="mt-3 flex items-center justify-end gap-2">
											<button
												onClick={() => setIsDobOpen(false)}
												className="text-sm px-3 py-1.5 rounded-md hover:bg-muted"
											>
												Cancel
											</button>
											{dobDate && (
												<button
													onClick={() => setIsDobOpen(false)}
													className="text-sm px-3 py-1.5 rounded-md bg-primary text-primary-foreground"
												>
													Done
												</button>
											)}
										</div>
									</div>
								</DialogContent>
							</Dialog>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="bio" className="font-normal text-xs text-[var(--text)]">Bio</Label>
						<div className="relative mt-1.5">
							<Textarea
								id="bio"
								placeholder="A brief introduction about yourself"
								value={formData.bio}
								onChange={(e) => handleInputChange("bio", e.target.value)}
								className="border border-[var(--border)] outline-none focus:outline-none h-12 rounded-xl p-4"
								maxLength={250}
								rows={4}
							/>
							<span className="absolute right-3 bottom-3 text-xs text-muted-foreground">
								{characterCounts.bio}/250
							</span>
						</div>
					</div>

					<Button
						className="relative transition-colors bg-gradient-to-r from-[#DDF346] to-[#84EA07] cursor-pointer"
						onClick={onSave}
						disabled={updateUser.isPending || isFetching}
					>
						{updateUser.isPending && (
							<span className="absolute inset-0 grid place-items-center">
								<span className="h-4 w-4 animate-spin border-2 border-black dark:border-white border-t-transparent rounded-full" />
							</span>
						)}
						<span className={updateUser.isPending ? 'opacity-0' : ''}>Save</span>
					</Button>
				</div>
			</div>

			{/* Social Accounts */}
			<div className="bg-[var(--bg-card)] rounded-[20px] p-5 text-[var(--text)] space-y-5">
				<p className="font-medium font-space">Social Accounts</p>
				<div className="space-y-4 font-noto">
					{socialAccounts.map((account, index) => (
						<div key={index} className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-lg bg-[var(--bg-input)] flex justify-center items-center">{account.icon}</div>
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