'use client'

import { useState } from 'react'
import HeartIcon from '@/icons/HeartIcon'
import { useAddToWatchlist, useRemoveFromWatchlist, useWatchlistStatus } from '@/hooks/useWatchlist'
import { useParams, usePathname } from 'next/navigation'
import HeartFullIcon from '@/icons/HeartFullIcon'
import { useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { useAddUserActivityLog } from '@/hooks/useUserActivityLog'
import { useStockOverview } from '@/hooks/useStocks'
import LoginModal from '@/components/LoginModal'
import { useProfile } from '@/hooks/auth/useProfile'

const AddToStockWatchlist = () => {
	const queryClient = useQueryClient();
	const { profile, refetch } = useProfile();
	const user = profile;
	const pathname = usePathname();
	const params = useParams();
	const assetType = pathname ? pathname.split('/')[1] : '';
	const code = params?.slug as string;
	const [isModalOpen, setIsModalOpen] = useState(false)

	const { data: inWatchlist = false, isFetching: statusLoading } = useWatchlistStatus({
		userId: user?.id,
		code,
		assetType,
		enabled: !!user?.id,
	});

	const addMutation = useAddToWatchlist();
	const removeMutation = useRemoveFromWatchlist();
	const { mutate: addLog } = useAddUserActivityLog();

	const { data: stockOverviewData } = useStockOverview(code);
	const stockOverview = stockOverviewData?.data || {};

	const loading = statusLoading || addMutation.isPending || removeMutation.isPending;

	const handleClick = () => {
		if (!user?.id) {
			setIsModalOpen(true);
			return;
		}
		if (inWatchlist) {
			removeMutation.mutate(
				{ userId: user?.id, code },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['watchlist', user?.id] });
						queryClient.invalidateQueries({
							queryKey: ['watchlist-status', user?.id, code, assetType],
						});
					},
				}
			);
		} else {
			addMutation.mutate(
				{ userId: user?.id, code, assetType },
				{
					onSuccess: () => {
						if (user?.id) {
							addLog({
								userId: user?.id,
								type: 'add_to_watchlist',
								assetType: 'stocks',
								assetSymbol: stockOverview.symbol,
								assetName: stockOverview.name,
								assetLogo: `https://s3-symbol-logo.tradingview.com/${stockOverview.logoid}.svg`,
								content: `Added ${stockOverview.name} (${stockOverview.symbol}) to watchlist`,
							});
						}
						queryClient.invalidateQueries({ queryKey: ['watchlist', user?.id] });
						queryClient.invalidateQueries({
							queryKey: ['watchlist-status', user?.id, code, assetType],
						});
					},
				}
			);
		}
	};

	return (
		<>
			<div className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] p-[1px] rounded-lg" onClick={handleClick}>
				<button
					disabled={loading}
					className="relative flex items-center gap-2 bg-[var(--background)] px-4.5 py-2.5 rounded-lg font-medium text-sm cursor-pointer text-[var(--text)] font-noto hover:bg-[var(--bg-hover)] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{inWatchlist ? (
						<>
							<HeartFullIcon className="w-4 h-4 fill-current" />
							<span className="hidden md:block">Added to Watchlist</span>
						</>
					) : (
						<>
							<HeartIcon className="w-4 h-4" />
							<span className="hidden md:block">Add to Watchlist</span>
						</>
					)}
					{loading && (
						<div className="absolute inset-0 flex items-center justify-center rounded-lg 
                  bg-black/30 dark:bg-white/20 backdrop-blur-[1.5px] pointer-events-none">
							<Loader className="w-5 h-5 text-white animate-spin" />
						</div>
					)}
				</button>
			</div>

			<LoginModal
				open={isModalOpen}
				onOpenChange={(open) => {
					setIsModalOpen(open);
					if (!open) {
						refetch();
					}
				}}
			/>
		</>
	)
}

export default AddToStockWatchlist