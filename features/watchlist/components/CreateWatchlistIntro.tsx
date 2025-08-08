'use client';

import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/hooks/useAuth";
import IconSection1_1 from "@/icons/IconSection1_1";
import { useState } from "react";

const CreateWatchlistIntro = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { handleLogin } = useAuth();
	return (
		<>
			<div className="container mx-auto px-6 mt-10 md:mt-20 relative bg-transparent mb-10 flex items-center gap-10">
				<div className="space-y-5">
					<p className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#DDF346] to-[#84EA07]">Sign up today and get</p>
					<p className="text-5xl font-semibold dark:text-white">your own crypto Watchlist</p>
					<p className="text-[#58667e] dark:text-white">Track your profits and losses. View your portfolio valuation. Do it all with our easy-to-use platform.</p>
					<div className="flex items-center gap-4">
						<button
							className="px-4.5 py-2.5 rounded font-medium text-sm transition-colors bg-gradient-to-r from-[#DDF346] to-[#84EA07] cursor-pointer text-[#494949] font-space"
							onClick={() => setIsModalOpen(true)}
						>
							Create my own Watchlist
						</button>
						<button className="cursor-pointer" onClick={() => setIsModalOpen(true)}>Log In</button>
					</div>
				</div>
				<div>
					<IconSection1_1 width={711} height={425} />
				</div>
			</div>
			<LoginModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				handleLogin={handleLogin}
			/>
		</>
	)
}

export default CreateWatchlistIntro;