'use client';
import { useCommodityOverview } from "@/hooks/useCommodities";
import Image from "next/image";
import { useParams } from "next/navigation";

export const CommodityHeader = () => {
	const params = useParams();
	const slug = params?.slug as string;
	const { isFetching, data } = useCommodityOverview(slug);
	const commodityOverview = data?.data || {};
	console.log("🚀 ~ CommodityHeader ~ commodityOverview:", commodityOverview)

	return (
		<div className="flex items-center gap-4">
			<div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl">
				{isFetching ? (
					<div className="w-10 h-10 bg-gray-200 dark:bg-[#333] rounded-full animate-pulse" />
				) : (
					<Image src={commodityOverview?.medium_logo_url ?? '/images/icon-section-6_2.png'} alt="Symbol" width={64} height={64} className="rounded-full" />
				)
				}
			</div>
			<div className="text-[#4B4A4A] dark:text-[#FFF] flex flex-col gap-1">
				<h1 className="text-xl font-semibold font-noto">
					{isFetching ? (
						<span className="inline-block w-36 h-5 bg-gray-200 dark:bg-[#333] rounded-md animate-pulse" />
					) : (
						<span>{commodityOverview.name}</span>
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
							<span className="opacity-50 dark:opacity-100 text-xs font-medium font-noto">${commodityOverview.price}</span>
							<span>•</span>
							<span className="opacity-50 dark:opacity-100 text-xs font-medium font-noto">{commodityOverview.unit}</span>
							<span>•</span>
							<span className="text-xs font-medium text-red-500 font-noto">{commodityOverview.percent}</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};