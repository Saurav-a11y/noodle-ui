'use client'

import _map from 'lodash/map';
import Image from 'next/image';
import TooltipCommon from "@/components/common/TooltipCommon";
import { useMe } from "@/hooks/useAuth";
import { useAddUserActivityLog } from "@/hooks/useUserActivityLog";
import { useRouter } from "next/navigation";
import { formatNumberWithCommas } from '@/lib/format';
import { useGetMostTalkedAboutStableCoins } from '@/hooks/stablecoins/useGetMostTalkedAboutStableCoins';

const MostTalkedAboutStablecoins = () => {
	const router = useRouter();
	const { data: userData } = useMe()
	const { mutate: addLog } = useAddUserActivityLog();
	const { data, isLoading: isGettingMostTalkedAboutStablecoins, } = useGetMostTalkedAboutStableCoins();
	const mostTalkedAboutStablecoins = data?.data ?? [];

	return (
		<div className="bg-[var(--bg-card)] rounded-xl shadow-xl">
			<div className="flex items-center gap-2 text-[var(--text)] px-5 pt-5 pb-3">
				<h3 className="font-reddit">Most Talked About Project (7D)</h3>
				<TooltipCommon content="The list of stocks with the highest price growth rate over the past 7 days, calculated based on percentage change." />
			</div>
			<div className="text-[var(--text)] pb-3">
				{isGettingMostTalkedAboutStablecoins ? (
					<div className="px-5">
						{[...Array(5)].map((_, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between py-2 animate-pulse"
							>
								<div className="flex items-center gap-3">
									<div className="h-4 w-4 bg-[var(--loading)] rounded animate-pulse rounded" />
									<div className="w-8 h-8 bg-[var(--loading)] rounded animate-pulse rounded-full" />
									<div className="h-4 w-30 bg-[var(--loading)] rounded animate-pulse rounded" />
								</div>
								<div className="h-4 w-14 bg-[var(--loading)] rounded animate-pulse rounded" />
							</div>
						))}
					</div>
				) : (
					_map(mostTalkedAboutStablecoins, (item, index) => (
						<div
							key={index}
							className="flex items-center justify-between cursor-pointer px-5 py-2 hover:bg-[var(--bg-hover)] rounded-lg transition"
							onClick={() => {
								router.push(`/cryptocurrencies/${item.name}`)
								if (userData?.data?.id) {
									addLog({
										userId: userData?.data?.id,
										type: 'view_detail',
										assetType: 'cryptocurrencies',
										assetSymbol: item.name,
										assetName: item.description,
										assetLogo: item.logo,
										content: `See details: '${item.description} (${item.name}) Community'`,
									});
								}
							}}
						>
							<div className="flex items-center gap-3 font-noto">
								<span className="text-xs font-medium w-4">{index + 1}</span>
								<div className="w-8 h-8 flex items-center justify-center text-sm">
									<Image src={item?.logo ?? '/images/icon-section-6_2.png'} alt="Symbol" width={64} height={64} className="rounded-full" />
								</div>
								<span className="text-sm font-medium">{item?.description}</span>
							</div>
							<p className='flex items-center gap-1 text-[#00B552]'>
								<span className='font-medium'>{formatNumberWithCommas(item?.mentions)}</span>
								<span>mentions</span>
							</p>
						</div>
					))
				)}
			</div>
		</div>
	)
}

export default MostTalkedAboutStablecoins;