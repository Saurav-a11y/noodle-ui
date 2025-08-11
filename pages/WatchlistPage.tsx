'use client';


import Header from '@/components/Header';
import CreateWatchlistIntro from '@/features/watchlist/components/CreateWatchlistIntro';
import Portfolio from '@/features/watchlist/components/Portfolio';
import { useMe } from '@/hooks/useAuth';
import BackgroundPage from '@/icons/BackgroundPage';
import ReactQueryProvider from '@/lib/react-query-provider';

const ContentWatchList = () => {
	const { data: user, isLoading } = useMe();
	return (
		<>
			{!isLoading && !user && (
				<CreateWatchlistIntro />
			)}
			{!isLoading && user && (
				<Portfolio />
			)}
		</>
	)
}
const WatchListPage = () => {
	return (
		<ReactQueryProvider>
			<div className="h-screen relative bg-[#F9F9F9] dark:bg-[#0B0B0B] overflow-auto font-space">
				<Header />
				<div className="absolute top-27 md:top-3 w-full flex justify-center">
					<div className='container w-full'>
						<BackgroundPage />
					</div>
				</div>
				<ContentWatchList />
			</div>
		</ReactQueryProvider>
	)
}

export default WatchListPage;