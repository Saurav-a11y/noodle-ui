'use client'

import { HelpCircle } from "lucide-react";
import MostViewedAssets from "./MostViewedAssets";
import { useGetUserActivityLogs } from "@/hooks/useUserActivityLog";
import { useMe } from "@/hooks/useAuth";
import { format } from "date-fns";
import { useState } from "react";

const AccountAnalytics = () => {
	const limit = 10;
	const [page, setPage] = useState(1);

	const { data: userData } = useMe()
	const { data, isLoading } = useGetUserActivityLogs({
		userId: userData?.data?.id,
		time: 1,
		page,
		limit,
	}, !!userData?.data?.id);

	const activities =
		data?.data?.map((log: any) => {
			const date = format(new Date(log.createdAt), "MMM dd, yyyy");
			const time = format(new Date(log.createdAt), "HH:mm");
			const action = log.content;
			return { date, time, action };
		}) ?? [];

	const logs = data?.data ?? [];

	const totalViewsAsset = logs.filter((log: any) => log.type === "view_asset").length;
	const totalViewsDetail = logs.filter((log: any) => log.type === "view_detail").length;
	const totalSearches = logs.filter((log: any) => log.type === "search").length;
	const totalChats = logs.filter((log: any) => log.type === "chat").length;

	const total = data?.metadata?.total ?? 0;
	const totalPages = data?.metadata?.totalPages ?? 1;
	const from = (page - 1) * limit + 1;
	const to = Math.min(page * limit, total);

	const usageInsights = [
		{
			label: "Assets Viewed (30d)",
			value: totalViewsAsset + totalViewsDetail,
			hasTooltip: true
		},
		{
			label: "Searches Performed",
			value: totalSearches + totalChats,
			hasTooltip: true
		}
	];

	return (
		<div className="space-y-5 text-[#2F2F2F]">
			<div>
				<p className="font-medium font-space mb-1 dark:text-white">Account Analytics</p>
				<p className="text-xs font-noto dark:text-white">Your platform usage insights and activity</p>
			</div>
			<div className="bg-white dark:bg-black rounded-[20px] p-5 font-noto">
				<p className="text-sm font-medium mb-2 dark:text-white">Usage Insights</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#F9F9F9] dark:bg-dark rounded-[20px] p-4">
					{usageInsights.map((insight, index) => (
						<div key={index} className="space-y-2 p-4">
							<div className="flex items-center gap-1">
								<span className="text-xs font-reddit">{insight.label}</span>
								{insight.hasTooltip && (
									<HelpCircle className="w-4 h-4" />
								)}
							</div>
							<div className="text-xl font-semibold">{insight.value}</div>
						</div>
					))}
				</div>
			</div>
			<div className="bg-white dark:bg-black rounded-[20px] p-5 font-noto">
				<p className="text-sm font-medium dark:text-white">Recent Activity (24h)</p>
				<div className="text-[#1E1B39]">
					{isLoading ? (
						<p className="text-xs opacity-50 dark:text-white">Loading...</p>
					) : (
						activities.map((activity, index) => {
							const isNewDate =
								index === 0 || activity.date !== activities[index - 1].date;
							return (
								<div key={index}>
									{isNewDate && (
										<div className="text-sm opacity-50 my-3 font-reddit dark:text-white">
											{activity.date}
										</div>
									)}
									<div className="flex items-center justify-between py-3 text-[#4B4A4A] dark:text-white">
										<div className="flex items-center gap-3">
											<span className="text-xs opacity-50 w-16">
												{activity.time}
											</span>
											<span className="text-xs">{activity.action}</span>
										</div>
										{/* <MoreHorizontal className="w-4 h-4 text-muted-foreground" /> */}
									</div>
								</div>
							);
						})
					)}
				</div>

				{/* Pagination */}
				{total > 0 && (
					<div className="mt-6">
						<div className="flex items-center justify-between gap-2 text-xs w-full text-[#939393]">
							<p>
								Show <b>{from}</b> - <b>{to}</b> of <b>{total}</b>
							</p>
							<div className="flex gap-1 ml-4">
								{Array.from({ length: totalPages }).map((_, i) => {
									const pageNumber = i + 1;
									return (
										<button
											key={pageNumber}
											onClick={() => setPage(pageNumber)}
											className={`w-6 h-6 rounded text-xs ${page === pageNumber
												? "bg-[#84EA07] text-white"
												: "hover:bg-[#F0F0F0] dark:hover:bg-[#1A1A1A]"
												}`}
										>
											{pageNumber}
										</button>
									);
								})}
							</div>
						</div>
					</div>
				)}
			</div>
			<MostViewedAssets />
		</div>
	);
};

export default AccountAnalytics;