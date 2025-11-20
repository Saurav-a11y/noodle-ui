// app/settings/[section]/page.tsx
'use client';

import ComingSoon from '@/components/common/ComingSoon';
import AccountAnalytics from '@/features/settings/AccountAnalytics';
import AccountSecurity from '@/features/settings/AccountSecurity';
import ProfileDetails from '@/features/settings/ProfileDetails';
import WatchlistPortfolio from '@/features/settings/WatchlistPortfolio';
import { useParams } from 'next/navigation';

const SectionMap: Record<string, React.ReactNode> = {
	profile: <ProfileDetails />,
	security: <AccountSecurity />,
	analytics: <AccountAnalytics />,
	notifications: <ComingSoon />,
	watchlist: <WatchlistPortfolio />,
	subscription: <ComingSoon />,
};

export default function SettingsSectionPage() {
	const params = useParams<{ section: string }>();
	const section = params?.section;
	return <>{section ? SectionMap[section] ?? <div>Not found</div> : <div>Not found</div>}</>;
}