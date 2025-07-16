'use client';
import { useParams } from "next/navigation";
import { useCommunityOverview } from "../hooks/useCommunityOverview";
import Image from "next/image";
import { formatCurrency, formatPercent } from "@/lib/format";

const ProjectHeader = () => {
	const params = useParams();
	const communityId = params?.slug as string;
	const { data, isFetching } = useCommunityOverview(communityId);
	const communityOverview = {
		projectName: data?.data?.project?.name,
		logo: data?.data?.project?.medium_logo_url,
		base_currency: data?.data?.project?.base_currency,
		price_usd: data?.data?.project?.price_usd,
		price_change_percent: data?.data?.project?.price_change_percent,
		symbol: data?.data?.project?.symbol,
	}
	return (
		<div className="flex items-center gap-4">
			{/* Logo loading */}
			<div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl">
				{isFetching ? (
					<div className="w-10 h-10 bg-gray-200 dark:bg-[#333] rounded-full animate-pulse" />
				) : (
					communityOverview?.logo && (
						<Image
							src={communityOverview.logo}
							alt="Avatar"
							width={40}
							height={40}
							className="rounded-full"
						/>
					)
				)}
			</div>
			<div className="text-[#4B4A4A] dark:text-[#FFF] flex flex-col gap-1">
				{/* Name loading */}
				<h1 className="text-xl font-semibold font-noto">
					{isFetching ? (
						<span className="inline-block w-36 h-5 bg-gray-200 dark:bg-[#333] rounded-md animate-pulse" />
					) : (
						<span>{communityOverview?.projectName} Community</span>
					)}
				</h1>
				{/* Info loading */}
				<div className="flex items-center gap-2 text-sm">
					{isFetching ? (
						<>
							<span className="w-12 h-4 bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
							<span>•</span>
							<span className="w-16 h-4 bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
							<span>•</span>
							<span className="w-12 h-4 bg-gray-200 dark:bg-[#333] rounded animate-pulse" />
						</>
					) : (
						<>
							<span className="opacity-50 dark:opacity-100 text-xs font-medium font-noto">${communityOverview?.base_currency}</span>
							<span>•</span>
							<span className="opacity-50 dark:opacity-100 text-xs font-medium font-noto">{formatCurrency(communityOverview?.price_usd)}</span>
							<span>•</span>
							<span className="text-xs font-medium text-red-500 font-noto">
								{formatPercent(communityOverview?.price_change_percent)}
							</span>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProjectHeader;