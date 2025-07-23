'use client'
import _get from 'lodash/get';
import _map from 'lodash/map';
import TooltipCommon from "@/components/common/TooltipCommon";
import { useTopGainingProject } from "../hooks/useTopGainingProject";
import { useMostTalkedProject } from "../hooks/useMostTalkedProject";
import { useOverviewStats } from "../hooks/useOverviewStats";
import StatCard from "@/components/common/StatCard";
import ProjectList from '@/components/common/ProjectList';

const TopProjectsStats = () => {
	const { data: topGainingProjectData, isLoading: isGettingTopGainingProject, } = useTopGainingProject();
	const { data: mostTalkedProjectData, isLoading: isGettingMostTalkedProject } = useMostTalkedProject();
	const { data: overviewStatsData, isLoading: isGettingOverviewStats } = useOverviewStats();

	const topGainingProjects7d = _get(topGainingProjectData, 'data.top_gaining_projects_7d', [])
	const mostTalkedProjects7d = _get(mostTalkedProjectData, 'data.most_talked_projects_7d', [])
	const trackedProjects = _get(overviewStatsData, 'data.tracked_projects', {})
	const totalActiveUsers7d = _get(overviewStatsData, 'data.total_active_users_7d', {})

	return (
		<div>
			<div className="flex items-center gap-2 dark:text-[#FFFFFF] mb-6">
				<h3 className="text-3xl font-medium font-space">Overview</h3>
				<TooltipCommon content="A live leaderboard that ranks crypto projects based on their overall community health score. It helps you quickly identify which projects have strong, active, and authentic communities." />
			</div>
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
		</div>
	);
};

export default TopProjectsStats;