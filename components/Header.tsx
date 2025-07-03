import { Search } from "lucide-react";
import { Input } from "./ui/Input";
import NoodlesLogo from "@/icons/NoodlesLogo";

const Header = () => {
	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<div className="container mx-auto px-6 py-2">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<NoodlesLogo />

					{/* Search Bar */}
					<div className="flex-1 max-w-md mx-8">
						<div className="relative">
							<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1px] rounded-full">
								<div className="relative rounded-full bg-[#f9f9f9]">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
									<Input
										placeholder="Search projects, tokens, or founders"
										className="pl-10 py-2 w-full bg-transparent border-none rounded-full focus:outline-none focus:ring-0"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Launch App Button */}
					<button className="px-4.5 py-2.5 rounded-full font-medium text-sm transition-colors bg-gradient-to-r from-[#DDF346] to-[#84EA07] cursor-pointer text-[#494949]">
						Launch App
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;