'use client'
import Header from "@/components/Header";
import StableCoinsTable from "@/features/stablecoins/StableCoinsTable";
import BackgroundPage from "@/icons/BackgroundPage";
import ReactQueryProvider from "@/lib/react-query-provider";
import { ToastContainer } from "react-toastify";

const StablecoinsPage = () => {
	return (
		<ReactQueryProvider>
			<ToastContainer />
			<div className="h-screen relative bg-[#F9F9F9] dark:bg-[#0B0B0B] overflow-auto">
				<Header />
				<div className="absolute top-27 md:top-3 w-full flex justify-center">
					<div className='container w-full'>
						<BackgroundPage />
					</div>
				</div>
				<div className="container mx-auto px-6 mt-10 md:mt-20 relative bg-transparent space-y-6 mb-10">
					<p className="text-3xl font-medium font-space dark:text-white">Stablecoins List</p>
					<div className="bg-white dark:bg-black rounded-[20px] p-5 font-noto">
						<StableCoinsTable />
					</div>
				</div>
			</div>
		</ReactQueryProvider>
	)
}

export default StablecoinsPage;