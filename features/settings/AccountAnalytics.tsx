'use client'

import { HelpCircle, MoreHorizontal } from "lucide-react";
import MostViewedAssets from "./MostViewedAssets";

const AccountAnalytics = () => {
	const usageInsights = [
		{
			label: "Assets Viewed (30d)",
			value: "47",
			hasTooltip: true
		},
		{
			label: "Searches Performed",
			value: "156",
			hasTooltip: true
		}
	];

	const recentActivities = [
		{
			time: "8:43 PM",
			action: "Searched for \"Bitcoin community analysis\"",
			date: "Today, Tuesday, August 14 2025"
		},
		{
			time: "9:43 PM",
			action: "Viewed Tesla community insights",
			date: "Today, Tuesday, August 14 2025"
		},
		{
			time: "10:43 PM",
			action: "Added Crude Oil to watchlist",
			date: "Today, Tuesday, August 14 2025"
		},
		{
			time: "11:43 PM",
			action: "AI Chat: Asked about community health scores",
			date: "Today, Tuesday, August 14 2025"
		},
		{
			time: "8:43 PM",
			action: "Searched for \"Bitcoin community analysis\"",
			date: "Monday, August 13 2025"
		},
		{
			time: "9:43 PM",
			action: "Viewed Tesla community insights",
			date: "Monday, August 13 2025"
		},
		{
			time: "9:43 PM",
			action: "Viewed Tesla community insights",
			date: "Monday, August 13 2025"
		},
		{
			time: "9:43 PM",
			action: "Viewed Tesla community insights",
			date: "Monday, August 13 2025"
		},
		{
			time: "9:43 PM",
			action: "Viewed Tesla community insights",
			date: "Monday, August 13 2025"
		},
		{
			time: "9:43 PM",
			action: "Viewed Tesla community insights",
			date: "Monday, August 13 2025"
		}
	];

	return (
		<div className="space-y-5 text-[#2F2F2F]">
			<div>
				<p className="font-medium font-space mb-1">Account Analytics</p>
				<p className="text-xs font-noto">Your platform usage insights and activity</p>
			</div>
			<div className="bg-white dark:bg-black rounded-[20px] p-5 font-noto">
				<p className="text-sm font-medium mb-2">Usage Insights</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#F9F9F9] rounded-[20px] p-4">
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
				<p className="text-sm font-medium">Recent Activity (24h)</p>
				<div className="text-[#1E1B39]">
					{recentActivities.map((activity, index) => {
						const isNewDate = index === 0 || activity.date !== recentActivities[index - 1].date;

						return (
							<div key={index}>
								{isNewDate && (
									<div className="text-sm opacity-50 my-3 font-reddit">
										{activity.date}
									</div>
								)}
								<div className="flex items-center justify-between py-3 text-[#4B4A4A]">
									<div className="flex items-center gap-3">
										<span className="text-xs opacity-50 w-16">
											{activity.time}
										</span>
										<span className="text-xs">{activity.action}</span>
									</div>
									<MoreHorizontal className="w-4 h-4 text-muted-foreground" />
								</div>
							</div>
						);
					})}
				</div>

				<div className="mt-6">
					<div className="flex items-center justify-between gap-2 text-xs w-full text-[#939393]">
						<p>Show <b>1 - 10</b> of <b>400</b></p>
						<div className="flex gap-1 ml-4">
							<button className="w-6 h-6 rounded text-xs">1</button>
							<button className="w-6 h-6 rounded text-xs">2</button>
							<button className="w-6 h-6 rounded text-xs">3</button>
							<button className="w-6 h-6 rounded text-xs">4</button>
						</div>
					</div>
				</div>
			</div>
			<MostViewedAssets />
		</div>
	);
};

export default AccountAnalytics;