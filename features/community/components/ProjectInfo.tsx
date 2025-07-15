import DropdownCommon from "@/components/common/DropdownCommon";
import DiscordIcon from "@/icons/DiscordIcon";
import PhantomIcon from "@/icons/PhantomIcon";
import TelegramIcon from "@/icons/TelegramIcon";
import XIcon from "@/icons/XIcon";
import Link from "next/link";

const shortenAddress = (address: string): string => {
	if (!address || address.length < 10) return address;
	return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

const ProjectInfo = ({ basicInformation }) => {
	return (
		<div>
			<h3 className="text-sm font-medium mb-2.5 font-noto dark:text-[#FFF]">Basic Information</h3>
			<div className="space-y-5 mb-6 text-[#373737] dark:text-[#FFF]">
				<div className="flex justify-between items-center gap-3">
					<p className="text-sm font-medium opacity-50 font-noto">Website</p>
					<div className="flex flex-wrap items-center justify-end gap-4 flex-1">
						{basicInformation?.website && (
							<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1.5px] rounded-full w-fit">
								<button className="flex items-center gap-2 bg-white dark:bg-[#1A1A1A] dark:text-[#FFF] px-2.5 py-1.5 rounded-full font-medium text-xs cursor-pointer text-[#494949] font-reddit">
									<Link href={basicInformation?.website || ""} target='_blank'>
										{basicInformation?.website}
									</Link>
								</button>
							</div>
						)}
						{basicInformation?.white_paper && (
							<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1.5px] rounded-full w-fit">
								<button className="flex items-center gap-2 bg-white dark:bg-[#1A1A1A] dark:text-[#FFF] px-3 py-1.5 rounded-full font-medium text-xs cursor-pointer text-[#494949] font-reddit">
									<Link href={basicInformation?.white_paper || ""} target='_blank'>
										{basicInformation?.white_paper}
									</Link>
								</button>
							</div>
						)}
					</div>
				</div>
				{basicInformation?.explorers?.length > 0 && (
					<DropdownCommon data={basicInformation?.explorers} title="Explorers" />
				)}
				{basicInformation?.contract_address && (
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium opacity-50 font-noto">Contract Address</p>
						<div className="flex items-center justify-end gap-4 flex-1">
							<p className="text-sm font-medium font-noto">{shortenAddress(basicInformation?.contract_address)}</p>
						</div>
					</div>
				)}
				{basicInformation?.contract_address && (
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium opacity-50 font-noto">Wallets</p>
						<div className="flex items-center gap-4 flex-1 justify-end">
							<div className="flex items-center gap-2 ">
								<PhantomIcon />
								<p className="text-sm font-medium font-noto">Phantom</p>
							</div>
						</div>
					</div>
				)}
				{basicInformation?.community_channels?.length > 0 && (
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium opacity-50 font-noto">Community</p>
						<div className="flex items-center justify-end gap-4 flex-1">
							<div className="flex items-center gap-4">
								<div className="bg-black dark:bg-white w-6 h-6 rounded-full flex items-center justify-center text-[#FFF] dark:text-black">
									<XIcon />
								</div>
								<span className="dark:text-[#FFF]">
									<DiscordIcon />
								</span>
								<span className="dark:text-[#FFF]">
									<TelegramIcon />
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProjectInfo;