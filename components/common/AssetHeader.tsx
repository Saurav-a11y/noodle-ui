'use client';
import { useAssetOverviewData } from "@/hooks/useAssetOverviewData";
import Image from "next/image";

export const AssetHeader = () => {
	const { isFetching, overview, formatted } = useAssetOverviewData();

	return (
		<div className="flex items-center gap-4">
			<div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl">
				{isFetching ? (
					<div className="w-10 h-10 bg-gray-200 dark:bg-[#333] rounded-full animate-pulse" />
				) : (
					overview.logo && (
						<Image
							src={overview.logo}
							alt="Logo"
							width={40}
							height={40}
							className="rounded-full"
						/>
					)
				)}
			</div>
			<div className="text-[#4B4A4A] dark:text-[#FFF] flex flex-col gap-1">
				<h1 className="text-xl font-semibold font-noto">
					{isFetching ? (
						<span className="inline-block w-36 h-5 bg-gray-200 dark:bg-[#333] rounded-md animate-pulse" />
					) : (
						<span>{overview.projectName}</span>
					)}
				</h1>
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
							<span className="opacity-50 dark:opacity-100 text-xs font-medium font-noto">{overview.base_currency}</span>
							<span>•</span>
							<span className="opacity-50 dark:opacity-100 text-xs font-medium font-noto">${formatted.priceUsd}</span>
							<span>•</span>
							<span className="text-xs font-medium text-red-500 font-noto">{formatted.priceChange}</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};