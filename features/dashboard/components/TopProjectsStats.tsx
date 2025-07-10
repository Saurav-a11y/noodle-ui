'use client'
import { useRouter } from "next/navigation";
import _get from 'lodash/get';
import _map from 'lodash/map';
import Image from "next/image";
import TooltipCommon from "@/components/common/TooltipCommon";
import { useTopGainingProject } from "../hooks/useTopGainingProject";
import { useMostTalkedProject } from "../hooks/useMostTalkedProject";
import { useOverviewStats } from "../hooks/useOverviewStats";
import { formatNumberShort } from "@/lib/format";

const StatCard = ({ title, tooltip, value, change, isLoading }: any) => {
	const isUp = change?.direction === 'up';
	const icon = isUp ? '▲' : '▼';
	const color = isUp ? 'text-[#00B552]' : 'text-[#FF0000]';

	return (
		<div className="p-4 bg-white dark:bg-[#1A1A1A] rounded-xl shadow-xl dark:text-white flex-1">
			<div className="flex items-center gap-2 mb-2">
				<h3 className="font-reddit">{title}</h3>
				<TooltipCommon content={tooltip} />
			</div>
			{isLoading ? (
				<div className="space-y-2">
					<div className="h-10 w-24 bg-gray-200 dark:bg-[#333] rounded-md animate-pulse" />
					<div className="h-4 w-32 bg-gray-200 dark:bg-[#333] rounded-md animate-pulse" />
				</div>
			) : (
				<>
					<div className="text-4xl font-bold font-noto">{formatNumberShort(value)}</div>
					<div className={`text-sm ${color} font-medium mt-1 font-noto flex items-center`}>
						{icon} {isUp ? '+' : '-'}{change?.absolute} ({isUp ? '+' : '-'}{change?.percentage}%)
					</div>
				</>
			)}
		</div>
	);
};

const ProjectList = ({ title, tooltip, data, valueKey, valueSuffix, isLoading }: any) => {
	const router = useRouter();

	return (
		<div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-xl">
			<div className="flex items-center gap-2 dark:text-white px-5 pt-5 pb-3">
				<h3 className="font-reddit">{title}</h3>
				<TooltipCommon content={tooltip} />
			</div>
			<div className="text-[#4B4A4A] dark:text-white pb-3">
				{isLoading ? (
					<div className="px-5">
						{[...Array(5)].map((_, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between py-2 animate-pulse"
							>
								<div className="flex items-center gap-3">
									<div className="h-4 w-4 bg-gray-200 rounded" />
									<div className="w-8 h-8 bg-gray-200 rounded-full" />
									<div className="h-4 w-30 bg-gray-200 rounded" />
								</div>
								<div className="h-4 w-14 bg-gray-200 rounded" />
							</div>
						))}
					</div>
				) : (
					_map(data, (project) => (
						<div
							key={project?.rank}
							className="flex items-center justify-between cursor-pointer px-5 py-2 hover:bg-[#F9F9F9] dark:hover:bg-[#313131] rounded-lg transition"
							onClick={() => router.push(`/community-detail/${project.symbol}`)}
						>
							<div className="flex items-center gap-3 font-noto">
								<span className="text-xs font-medium w-4">{project?.rank}</span>
								<div className="w-8 h-8 flex items-center justify-center text-sm">
									<Image src={project?.medium_logo_url} alt="Symbol" width={64} height={64} className="rounded-full" />
								</div>
								<span className="text-sm font-medium">{project?.name}</span>
							</div>
							<span className="text-sm font-medium text-[#00B552]">
								{project?.[valueKey]}{valueSuffix}
							</span>
						</div>
					))
				)}
			</div>
		</div>
	);
};

const TopProjectsStats = () => {
	const { data: topGainingProjectData, isLoading: isGettingTopGainingProject, } = useTopGainingProject();
	const { data: mostTalkedProjectData, isLoading: isGettingMostTalkedProject } = useMostTalkedProject();
	const { data: overviewStatsData, isLoading: isGettingOverviewStats } = useOverviewStats();

	const topGainingProjects7d = _get(topGainingProjectData, 'data.top_gaining_projects_7d', [])
	const mostTalkedProjects7d = _get(mostTalkedProjectData, 'data.most_talked_projects_7d', [])
	const trackedProjects = _get(overviewStatsData, 'data.tracked_projects', {})
	const totalActiveUsers7d = _get(overviewStatsData, 'data.total_active_users_7d', {})

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[#1E1B39]">
			{/* Top Gaining Projects */}
			<ProjectList
				title="Top Gaining Project (Growth Rate - 7d)"
				tooltip="Displays the top 5 projects with the highest growth in community activity over the past 7 days. These projects are gaining traction in terms of mentions, engagement, and visibility."
				data={topGainingProjects7d}
				valueKey="growth_rate_percent"
				valueSuffix="%"
				isLoading={isGettingTopGainingProject}
			/>


			{/* Most Talked About Projects */}
			<ProjectList
				title="Most Talked About Project (7D)"
				tooltip="Highlights the most mentioned projects across major platforms during the last 7 days. High mention volume often indicates rising interest and trending discussions."
				data={mostTalkedProjects7d}
				valueKey="mentions"
				valueSuffix=" mentions"
				isLoading={isGettingMostTalkedProject}
			/>

			{/* Summary Stats */}
			<div className="flex gap-4 flex-col">
				<StatCard
					title="Number of Tracked Projects"
					tooltip="The total number of crypto projects being monitored for community signals and on-chain metrics. Only projects with enough consistent data are included."
					value={trackedProjects.value}
					change={trackedProjects.change}
					isLoading={isGettingOverviewStats}
				/>
				<StatCard
					title="Total Active Users (7D)"
					tooltip="Total number of unique users who engaged with tracked projects in the past 7 days. Includes social interactions, token activity, and contributions."
					value={totalActiveUsers7d.value}
					change={totalActiveUsers7d.change}
					isLoading={isGettingOverviewStats}
				/>
			</div>
		</div>
	);
};

export default TopProjectsStats;