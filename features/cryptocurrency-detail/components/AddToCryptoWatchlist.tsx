'use client'

import { useState } from 'react'
import { useMe } from '@/hooks/useAuth'
import HeartIcon from '@/icons/HeartIcon'
import { useAddToWatchlist, useRemoveFromWatchlist, useWatchlistStatus } from '@/hooks/useWatchlist'
import { useParams, usePathname } from 'next/navigation'
import HeartFullIcon from '@/icons/HeartFullIcon'
import { useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { useAddUserActivityLog } from '@/hooks/useUserActivityLog'
import { useCommunityOverview } from '@/features/cryptocurrency-detail/hooks/useCommunityOverview'
import LoginModal from '@/components/LoginModal'

const AddToCryptoWatchlist = () => {
	const queryClient = useQueryClient();
	const { data } = useMe()
	const pathname = usePathname();
	const params = useParams();
	const assetType = pathname ? pathname.split('/')[1] : '';
	const code = params?.slug as string;
	const { data: cryptoOverviewData } = useCommunityOverview(code);
	const cryptoOverview = cryptoOverviewData?.data || {};
	const [isModalOpen, setIsModalOpen] = useState(false)

	const { data: inWatchlist = false, isFetching: statusLoading } = useWatchlistStatus({
		userId: data?.data?.id,
		code: cryptoOverview?.symbol,
		assetType,
		enabled: !!data?.data?.id,
	});

	const addMutation = useAddToWatchlist();
	const removeMutation = useRemoveFromWatchlist();
	const { mutate: addLog } = useAddUserActivityLog();

	const loading = statusLoading || addMutation.isPending || removeMutation.isPending;

	const handleClick = () => {
		if (!data?.data?.id) {
			setIsModalOpen(true);
			return;
		}
		if (inWatchlist) {
			removeMutation.mutate(
				{ userId: data?.data?.id, code: cryptoOverview?.symbol },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['watchlist', data?.data?.id] });
						queryClient.invalidateQueries({
							queryKey: ['watchlist-status', data?.data?.id, cryptoOverview?.symbol, assetType],
						});
					},
				}
			);
		} else {
			addMutation.mutate(
				{ userId: data?.data?.id, code: cryptoOverview?.symbol, assetType },
				{
					onSuccess: () => {
						if (data?.data?.id) {
							addLog({
								userId: data?.data?.id,
								type: 'add_to_watchlist',
								assetType: 'cryptocurrencies',
								assetSymbol: cryptoOverview.name,
								assetName: cryptoOverview.fullname,
								assetLogo: cryptoOverview.logo,
								content: `Added ${cryptoOverview.fullname} (${cryptoOverview.name}) to watchlist`,
							});
						}
						queryClient.invalidateQueries({ queryKey: ['watchlist', data?.data?.id] });
						queryClient.invalidateQueries({
							queryKey: ['watchlist-status', data?.data?.id, cryptoOverview?.symbol, assetType],
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

			<LoginModal open={isModalOpen} onOpenChange={setIsModalOpen} />
		</>
	)
}

export default AddToCryptoWatchlist