import { useState } from "react";
import { Star, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { useGetWatchlist, useRemoveFromWatchlist } from "@/hooks/useWatchlist";
import Image from "next/image";
import _get from 'lodash/get';
import { formatNumberWithCommas } from "@/lib/format";
import { useQueryClient } from "@tanstack/react-query";
import AddAssetModal from "./AddAssetModal";
import { usePathname } from "next/navigation";
import { useMe } from "@/hooks/useAuth";

const Portfolio = () => {
	const { data: user } = useMe();
	const pathname = usePathname();
	const assetType = pathname ? pathname.split('/')[1] : '';
	const queryClient = useQueryClient();
	const { data, isLoading } = useGetWatchlist(user?.id || "");
	const removeFromWatchlist = useRemoveFromWatchlist();

	const [busyById, setBusyById] = useState<Record<string, boolean>>({});
	const [isModalOpen, setIsModalOpen] = useState(false);

	const items = data?.data?.items ?? [];

	const handleAddAsset = () => {
		setIsModalOpen(true);
	};

	const handleRemove = async (asset: any) => {
		const assetId = asset.assetId ?? asset.id;
		if (!assetId || !user?.id) return;

		setBusyById(s => ({ ...s, [assetId]: true }));

		const qk = ['watchlist', user?.id];
		const prev = queryClient.getQueryData(qk);

		// Optimistic update
		queryClient.setQueryData(qk, (old: any) => {
			if (!old?.data?.items) return old;
			return {
				...old,
				data: {
					...old.data,
					items: old.data.items.filter((x: any) => (x.assetId ?? x.id) !== assetId),
				},
			};
		});

		try {
			await removeFromWatchlist.mutateAsync({ userId: user?.id, code: String(assetId) });
		} catch (e) {
			// rollback nếu lỗi
			queryClient.setQueryData(qk, prev);
		} finally {
			queryClient.invalidateQueries({ queryKey: qk });
			// Delay spinner ít nhất 500ms để người dùng thấy loading
			setTimeout(() => {
				setBusyById(s => ({ ...s, [assetId]: false }));
			}, 500);
		}
	};

	return (
		<div className="container mx-auto px-6 mt-10 md:mt-20 relative bg-transparent mb-10">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<div className="flex items-center gap-2 flex-1">
					<h3 className="text-3xl font-medium font-space">My Watchlist</h3>
				</div>
				<div
					className="bg-gradient-to-r from-[#DDF346] to-[#84EA07] px-4 py-1.5 text-sm cursor-pointer rounded flex items-center gap-2 text-[#494949]"
					onClick={handleAddAsset}
				>
					<Plus className="w-4 h-4" />
					<p>New Asset</p>
				</div>
			</div>

			{/* Stats */}
			<div className="text-right mb-4">
				<span className="text-sm text-muted-foreground">
					{items.length} coins in total
				</span>
			</div>

			{/* Table */}
			<div className="p-5 bg-white dark:bg-black rounded-xl shadow-xl">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader className="dark:bg-[#1A1A1A]">
							<TableRow className="border-b">
								<TableHead className="w-12 text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto dark:rounded-tl-lg"></TableHead>
								<TableHead className="text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto dark:rounded-tl-lg">#</TableHead>
								<TableHead className="text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto dark:rounded-tl-lg">Name</TableHead>
								<TableHead className="text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto dark:rounded-tl-lg">Price</TableHead>
								<TableHead className="text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto dark:rounded-tl-lg">Market Cap</TableHead>
								<TableHead className="text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto dark:rounded-tl-lg">Volume(24h)</TableHead>
								<TableHead className="text-[#4B4A4A] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto dark:rounded-tl-lg">Circulating Supply</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading
								? Array.from({ length: 5 }).map((_, i) => (
									<TableRow key={i} className="animate-pulse">
										{Array.from({ length: 7 }).map((_, j) => (
											<TableCell key={j} className="py-4 h-[73px] border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
												<div className="h-6 bg-gray-200 dark:bg-[#333] rounded animate-pulse w-full" />
											</TableCell>
										))}
									</TableRow>
								))
								: items.map((asset) => {
									const assetId = asset.assetId;
									const busy = !!busyById[assetId];
									return (
										<TableRow key={asset.assetId} className="hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] cursor-pointer transition-colors">
											<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
												<button
													onClick={() => handleRemove(asset)}
													disabled={busy}
													className="relative grid place-items-center h-6 w-6 rounded disabled:opacity-60 disabled:cursor-not-allowed"
												>
													{busy ? (
														<span className="h-4 w-4 animate-spin border-2 border-yellow-500 border-t-transparent rounded-full" />
													) : (
														<Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
													)}
												</button>
											</TableCell>
											<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
												{asset?.overview?.valuation?.crypto_total_rank}
											</TableCell>
											<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
												<div className="flex items-center gap-3">
													<div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
														<Image src={`https://s3-symbol-logo.tradingview.com/${asset?.overview?.info.base_currency_logoid}.svg`} alt="Symbol" width={64} height={64} className="rounded-full" />
													</div>
													<div className="flex-1">
														<div className="font-medium">{asset?.overview?.info?.base_currency_desc}</div>
														<div className="text-sm text-muted-foreground">{asset?.overview?.info?.base_currency}</div>
													</div>
												</div>
											</TableCell>
											<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
												${formatNumberWithCommas(asset?.overview?.market?.close)}
											</TableCell>
											<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
												${formatNumberWithCommas(asset?.overview?.valuation?.market_cap_calc)}
											</TableCell>
											<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
												<div>${formatNumberWithCommas(asset?.overview?.market?.['24h_vol_cmc'])}</div>
											</TableCell>
											<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
												{formatNumberWithCommas(asset?.overview?.info?.circulating_supply)}
											</TableCell>
										</TableRow>
									)
								})}
						</TableBody>
					</Table>
				</div>
			</div>
			<AddAssetModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				onSave={() => { }}
				userId={user?.id || ""}
				assetType={assetType}
			/>
		</div>
	);
};

export default Portfolio;