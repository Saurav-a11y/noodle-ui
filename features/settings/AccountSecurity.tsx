'use client'

import { Button } from "@/components/ui/Button";
import EmailIcon from "@/icons/EmailIcon";
import GgAuthIcon from "@/icons/GgAuthIcon";
import LockIcon from "@/icons/LockIcon";
import SwitchIcon from "@/icons/SwitchIcon";
import UnLockIcon from "@/icons/UnLockIcon";

const AccountSecurity = () => {
	const securityFeatures = [
		{
			icon: <EmailIcon />,
			title: "Two-factor-authentication",
			description: "Enable two-factor authentication to add an extra layer of security to your account. When you log in, we'll send a 6-digit code to your email that you'll have to enter to verify it's you.",
			action: "Enable",
			variant: "outline" as const,
			textAct: 'Enable',
			iconAct: <SwitchIcon />
		},
		{
			icon: <GgAuthIcon />,
			title: "Google Authenticator (2FA)",
			description: "Use the Authenticator to get verification codes for better security.",
			action: "Enable",
			variant: "outline" as const,
			textAct: 'Enable',
			iconAct: <SwitchIcon />
		},
		{
			icon: <UnLockIcon />,
			title: "Password",
			description: "Set a unique password for better protection",
			action: "Set Password",
			variant: "outline" as const,
			textAct: 'Set Password',
			iconAct: <LockIcon />
		}
	];

	return (
		<div className="bg-white dark:bg-black rounded-[20px] p-5 text-[#2F2F2F] space-y-5">
			<div className="flex items-center gap-2">
				<p className="font-medium font-space">Account Security</p>
				<p className="bg-[#EBEBEB] px-2 py-0.5 rounded-full text-[#494949] opacity-50 text-[10px] font-medium">Coming soon</p>
			</div>
			<div className="space-y-4 font-noto">
				{securityFeatures.map((account, index) => (
					<div key={index} className="flex items-center justify-between opacity-50">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-lg bg-[#F8F8F8] flex justify-center items-center">{account.icon}</div>
							<div>
								<p className="font-medium text-sm">{account.title}</p>
								<div className="text-xs opacity-50">{account.description}</div>
							</div>
						</div>
						<Button variant="outline" size="sm" className="rounded-lg px-3 py-2 font-xs font-normal cursor-pointer">
							{account.iconAct}
							{account.textAct}
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export default AccountSecurity;