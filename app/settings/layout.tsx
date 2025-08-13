// app/settings/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; // hoặc dùng clsx; nếu chưa có, thay cn(...) thành template className
import ReactQueryProvider from '@/lib/react-query-provider';
import Header from '@/components/Header';
// import BackgroundPage from '@/icons/BackgroundPage';
import ProfileIcon from '@/icons/ProfileIcon';
import ShieldIcon from '@/icons/ShieldIcon';
import AnalystIcon from '@/icons/AnalystIcon';
import NotificationIcon from '@/icons/NotificationIcon';
import FavouriteIcon from '@/icons/FavouriteIcon';
import SubscriptionIcon from '@/icons/SubscriptionIcon';

const SECTIONS = [
	{ key: 'profile', label: 'Profile setting', icon: <ProfileIcon height={24} width={24} /> },
	{ key: 'security', label: 'Account Security', icon: <ShieldIcon height={24} width={24} /> },
	{ key: 'analytics', label: 'Account Analytics', icon: <AnalystIcon height={24} width={24} /> },
	{ key: 'notifications', label: 'Notification', icon: <NotificationIcon height={24} width={24} /> },
	{ key: 'watchlist', label: 'Watchlist & Portfolio', icon: <FavouriteIcon height={24} width={24} /> },
	{ key: 'subscription', label: 'Subscription', icon: <SubscriptionIcon height={24} width={24} />, badge: 'Free Plan' },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const activeKey = pathname ? pathname.split('/')[2] || 'profile' : 'profile';

	return (
		<ReactQueryProvider>
			<div className="h-screen relative bg-[#F9F9F9] dark:bg-[#0B0B0B] overflow-auto">
				<Header />
				{/* <div className="absolute top-27 md:top-3 w-full flex justify-center">
					<div className='container w-full'>
						<BackgroundPage />
					</div>
				</div> */}
				<div className="container mx-auto px-6 mt-10 md:mt-20 relative bg-transparent space-y-14 mb-10">
					<div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
						{/* Sidebar */}
						<aside>
							<nav className="flex flex-col gap-1.5">
								{SECTIONS.map(s => {
									const active = activeKey === s.key;
									return (
										<Link
											key={s.key}
											href={`/settings/${s.key}`}
											className={cn(
												'flex items-center justify-between rounded-lg px-3 py-3 text-sm transition',
												active
													? 'bg-[#DDF346] text-black font-medium'
													: 'hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-[#222] dark:text-white'
											)}
										>
											<span className={`flex items-center gap-3 ${active ? 'text-[#2F2F2F] font-semibold' : ''}`}>
												<span className={`grid place-items-center h-8 w-8 rounded-md ${active ? 'bg-white' : ''}`}>
													{s.icon}
												</span>
												{s.label}
											</span>
											{s.badge && (
												<span className="text-xs rounded-md bg-black/[0.06] dark:bg-white/[0.08] px-2 py-0.5">
													{s.badge}
												</span>
											)}
										</Link>
									);
								})}
							</nav>
						</aside>

						{/* Content */}
						<main>
							{children}
						</main>
					</div>
				</div>
			</div>
		</ReactQueryProvider>
	);
}