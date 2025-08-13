// app/settings/[section]/page.tsx
'use client';

import AccountAnalytics from '@/features/settings/AccountAnalytics';
import AccountSecurity from '@/features/settings/AccountSecurity';
import ProfileDetails from '@/features/settings/ProfileDetails';
import WatchlistPortfolio from '@/features/settings/WatchlistPortfolio';
import { useParams } from 'next/navigation';

const SectionMap: Record<string, React.ReactNode> = {
	profile: <ProfileDetails />,
	security: <AccountSecurity />,
	analytics: <AccountAnalytics />,
	notifications: <div>Notification settings…</div>,
	watchlist: <WatchlistPortfolio />,
	subscription: <div>Subscription settings…</div>,
};

export default function SettingsSectionPage() {
	const params = useParams<{ section: string }>();
	const section = params?.section;
	return <>{section ? SectionMap[section] ?? <div>Not found</div> : <div>Not found</div>}</>;
}