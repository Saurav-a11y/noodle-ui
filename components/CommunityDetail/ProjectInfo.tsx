import DiscordIcon from "@/icons/DiscordIcon";
import PhantomIcon from "@/icons/PhantomIcon";
import TelegramIcon from "@/icons/TelegramIcon";
import XIcon from "@/icons/XIcon";

const shortenAddress = (address: string): string => {
	if (!address || address.length < 10) return address;
	return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

const ProjectInfo = () => {

	return (
		<div>
			<h3 className="text-sm font-medium mb-2.5">Basic Information</h3>

			<div className="space-y-5 mb-6 text-[#373737]">
				<div className="flex items-center justify-between">
					<p className="text-sm font-medium opacity-50">Website</p>
					<div className="flex items-center justify-end gap-4 flex-1">
						<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1.5px] rounded-full w-fit">
							<button className="flex items-center gap-2 bg-white px-4.5 py-2.5 rounded-full font-medium text-sm cursor-pointer text-[#494949]">
								bonkcoin.com
							</button>
						</div>
						<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1.5px] rounded-full w-fit">
							<button className="flex items-center gap-2 bg-white px-4.5 py-2.5 rounded-full font-medium text-sm cursor-pointer text-[#494949]">
								White paper
							</button>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-sm font-medium opacity-50">Explorers</p>
					<div className="flex items-center justify-end gap-4 flex-1">
						<button className="flex items-center gap-2 bg-[#DDF346] px-4.5 py-2.5 rounded-full font-medium text-sm cursor-pointer">
							solscan.io
						</button>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-sm font-medium opacity-50">Contract Address</p>
					<div className="flex items-center justify-end gap-4 flex-1">
						<p className="text-sm font-medium">{shortenAddress('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh')}</p>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-sm font-medium opacity-50">Wallets</p>
					<div className="flex items-center gap-4 flex-1 justify-end">
						<div className="flex items-center gap-2 ">
							<PhantomIcon />
							<p className="text-sm font-medium">Phantom</p>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-sm font-medium opacity-50">Community</p>
					<div className="flex items-center justify-end gap-4 flex-1">
						<div className="flex items-center gap-4">
							<div className="bg-black w-6 h-6 rounded-full flex items-center justify-center">
								<XIcon fill="#fff" />
							</div>
							<DiscordIcon />
							<TelegramIcon />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectInfo;