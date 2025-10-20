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
		<div className="space-y-5 text-[var(--text)]">
			<div>
				<p className="font-medium font-space mb-1 text-[var(--text)]">Account Analytics</p>
				<p className="text-xs font-noto text-[var(--text)]">Your platform usage insights and activity</p>
			</div>
			<div className="bg-[var(--bg-card)] rounded-[20px] p-5 font-noto">
				<p className="text-sm font-medium mb-2 text-[var(--text)]">Usage Insights</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[var(--background)] rounded-[20px] p-4">
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
			<div className="bg-[var(--bg-card)] rounded-[20px] p-5 font-noto">
				<p className="text-sm font-medium text-[var(--text)]">Recent Activity (24h)</p>
				<div className="text-[var(--text)]">
					{isLoading ? (
						<p className="text-xs opacity-50 text-[var(--text)]">Loading...</p>
					) : (
						activities.map((activity, index) => {
							const isNewDate =
								index === 0 || activity.date !== activities[index - 1].date;
							return (
								<div key={index}>
									{isNewDate && (
										<div className="text-sm opacity-50 my-3 font-reddit text-[var(--text)]">
											{activity.date}
										</div>
									)}
									<div className="flex items-center justify-between py-3 text-[var(--text)]">
										<div className="flex items-center gap-3">
											<span className="text-xs opacity-50 w-16">
												{activity.time}
											</span>
											<span className="text-xs">{activity.action}</span>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>

				{/* Pagination */}
				{total > 0 && (
					<div className="mt-6">
						<div className="flex items-center justify-between gap-2 text-xs w-full text-[var(--text)]">
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
												: "hover:bg-[var(--bg-hover)]"
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