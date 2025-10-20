'use client'

import CommunityHealthRankings from "@/features/cryptocurrencies/components/CommunityHealthRankings";
import TopProjectsStats from "@/features/cryptocurrencies/components/TopProjectsStats";
import Header from "@/components/Header";
import ReactQueryProvider from "@/lib/react-query-provider";
import BackgroundPage from "@/icons/BackgroundPage";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/lib/useThemkMode";

const CryptocurrenciesPage = () => {
	return (
		<ReactQueryProvider>
			<ThemeProvider>
				<ToastContainer />
				<div className="h-screen relative bg-[#F9F9F9] dark:bg-[#0B0B0B] overflow-auto">
					<Header />
					<div className="absolute top-27 md:top-3 w-full flex justify-center">
						<div className='container w-full'>
							<BackgroundPage />
						</div>
					</div>
					<div className="container mx-auto px-6 mt-10 md:mt-20 relative bg-transparent space-y-14 mb-10">
						<TopProjectsStats />
						<CommunityHealthRankings />
					</div>
				</div>
			</ThemeProvider>
		</ReactQueryProvider>
	);
}

export default CryptocurrenciesPage;