'use client';

import Link from 'next/link';
import { Globe } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '../ui/NavigationMenu';

export default function DropdownCommon({ data, title }: { data: { name: string; url: string }[], title: string }) {

	if (!data || data.length === 0) return null;

	return (
		<div className="flex items-center justify-between">
			<p className="text-xs font-medium opacity-50 font-noto">{title}</p>
			<NavigationMenu className='z-20'>
				<NavigationMenuList className="flex space-x-8">
					<NavigationMenuItem>
						<NavigationMenuTrigger className="bg-transparent font-mediumflex items-center gap-1.5 px-0 py-0">
							<Link
								href={data[0].url}
								target="_blank"
								className="flex items-center gap-2 bg-[#DDF346] dark:text-[#1A1A1A] px-3 py-1.5 rounded-full font-medium text-xs cursor-pointer font-reddit w-fit overflow-hidden whitespace-nowrap truncate"
							>
								{data[0]?.name}
							</Link>
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<div className="w-[232px] p-2 bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg z-90">
								{data.map((item, index) => {
									return (
										<Link
											href={item.url}
											target="_blank"
											key={index}
											className="flex items-center gap-3 px-3 py-2 text-xs dark:text-white hover:bg-[#F3F3F3] dark:hover:bg-[#222] hover:font-medium rounded-md cursor-pointer transition-colors"
										>
											<Globe className='w-4 h-4' />
											{item?.name}
										</Link>
									);
								})}
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}