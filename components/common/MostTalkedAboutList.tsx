'use client';

import _map from 'lodash/map';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import TooltipCommon from '@/components/common/TooltipCommon';
import { useMe } from '@/hooks/useAuth';
import { useAddUserActivityLog } from '@/hooks/useUserActivityLog';
import { formatNumberWithCommas } from '@/lib/format';

// 🧠 Các hooks riêng cho từng loại asset
import { useGetMostTalkedAboutStableCoins } from '@/hooks/stablecoins/useGetMostTalkedAboutStableCoins';
import { useGetMostTalkedAboutCommodities } from '@/hooks/commodities/useGetMostTalkedAboutStableCoins';
import { useGetMostTalkedAboutStocks } from '@/hooks/stocks/useGetMostTalkedAboutStocks';

interface MostTalkedAboutListProps {
	assetType: 'cryptocurrencies' | 'stocks' | 'commodities';
}

const MostTalkedAboutList = ({ assetType }: MostTalkedAboutListProps) => {
	const router = useRouter();
	const { data: userData } = useMe();
	const { mutate: addLog } = useAddUserActivityLog();

	// 🪙 Chọn hook theo assetType
	let rawData: any[] = [];
	let isLoading = false;

	switch (assetType) {
		case 'stocks': {
			const { data, isLoading: loading } = useGetMostTalkedAboutStocks();
			rawData = data ?? [];
			isLoading = loading;
			break;
		}
		case 'commodities': {
			const { data, isLoading: loading } = useGetMostTalkedAboutCommodities();
			rawData = data ?? [];
			isLoading = loading;
			break;
		}
		default: {
			const { data, isLoading: loading } = useGetMostTalkedAboutStableCoins();
			rawData = data ?? [];
			isLoading = loading;
			break;
		}
	}

	// 🎨 Chuẩn hóa dữ liệu
	const formattedData = rawData.map((item: any, index: number) => {
		if (assetType === 'stocks') {
			return {
				rank: item.rank ?? index + 1,
				name: item.name,
				description: item.description ?? item.name,
				symbol: item.symbol,
				logo: item.logo,
				mentions: item.mentions ?? 0,
			};
		}

		if (assetType === 'commodities') {
			return {
				rank: item.rank ?? index + 1,
				name: item.name,
				description: item.name,
				symbol: item.symbol,
				slug: item.nameSlug,
				logo: item.mediumLogoUrl ?? '/images/icon-section-6_2.png',
				mentions: item.mentions ?? 0,
			};
		}

		// default: stablecoins
		return {
			rank: index + 1,
			name: item.name,
			description: item.description,
			symbol: item.symbol,
			logo: item.logo,
			mentions: item.mentions ?? 0,
		};
	});

	// 🧩 title và tooltip dynamic
	const titleMap = {
		cryptocurrencies: 'Most Talked About Stablecoins (7D)',
		stocks: 'Most Talked About Stocks (7D)',
		commodities: 'Most Talked About Commodities (7D)',
	};

	const tooltipMap = {
		cryptocurrencies:
			'The list of stablecoins with the highest number of mentions over the past 7 days.',
		stocks:
			'The list of stocks most mentioned by investors over the past 7 days.',
		commodities:
			'The list of commodities most discussed across markets over the past 7 days.',
	};

	return (
		<div className="bg-[var(--bg-card)] rounded-xl shadow-xl">
			<div className="flex items-center gap-2 text-[var(--text)] px-5 pt-5 pb-3">
				<h3 className="font-reddit">{titleMap[assetType]}</h3>
				<TooltipCommon content={tooltipMap[assetType]} />
			</div>

			<div className="text-[var(--text)] pb-3">
				{isLoading ? (
					<div className="px-5">
						{[...Array(5)].map((_, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between py-2 animate-pulse"
							>
								<div className="flex items-center gap-3">
									<div className="h-4 w-4 bg-[var(--loading)] rounded" />
									<div className="w-8 h-8 bg-[var(--loading)] rounded-full" />
									<div className="h-4 w-28 bg-[var(--loading)] rounded" />
								</div>
								<div className="h-4 w-14 bg-[var(--loading)] rounded" />
							</div>
						))}
					</div>
				) : (
					_map(formattedData, (item, index) => (
						<div
							key={index}
							className="flex items-center justify-between cursor-pointer px-5 py-2 hover:bg-[var(--bg-hover)] rounded-lg transition"
							onClick={() => {
								router.push(`/${assetType}/${assetType === 'stocks' ? item.symbol : assetType === 'commodities' ? item.slug : item.name}`);
								if (userData?.data?.id) {
									addLog({
										userId: userData.data.id,
										type: 'view_detail',
										assetType,
										assetSymbol: item.symbol ?? item.name,
										assetName: item.description,
										assetLogo: item.logo,
										content: `See details: '${item.description} (${item.name}) Community'`,
									});
								}
							}}
						>
							<div className="flex items-center gap-3 font-noto">
								<span className="text-xs font-medium w-4">{item.rank}</span>
								<div className="w-8 h-8 flex items-center justify-center text-sm">
									<Image
										src={item.logo ?? '/images/icon-section-6_2.png'}
										alt={item.name}
										width={64}
										height={64}
										className="rounded-full"
									/>
								</div>
								<span className="text-sm font-medium truncate">
									{item.description}
								</span>
							</div>
							<p className="flex items-center gap-1 text-[#00B552]">
								<span className="font-medium">
									{formatNumberWithCommas(item.mentions)}
								</span>
								<span className="text-xs opacity-80">mentions</span>
							</p>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default MostTalkedAboutList;