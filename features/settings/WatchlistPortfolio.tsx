'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/Table";
import { useMe } from "@/hooks/useAuth";
import { useGetWatchlist, useRemoveFromWatchlist, useUpsertHoldings } from "@/hooks/useWatchlist";
import { useQueryClient } from "@tanstack/react-query";
import { formatNumberWithCommas } from "@/lib/format";
import Image from "next/image";
import { PlusCircle, Trash2Icon } from "lucide-react";
import AddAssetModal from "../watchlist/components/AddAssetModal";

type HoldingEditState = {
	editing: boolean;
};

const EditableHoldingsCell = ({
	value,
	usdValue = 0,
	editing = false,
	onChangeValue,
	onCommit,      // gọi khi cần commit (blur / Enter)
}: {
	value: string;                     // <-- controlled
	usdValue?: number;
	editing?: boolean;
	onChangeValue: (v: string) => void;
	onCommit: () => void;
}) => {
	const [local, setLocal] = useState<HoldingEditState>({
		editing,
	});

	// sync khi parent đổi editing
	useEffect(() => {
		setLocal((s) => ({ ...s, editing }));
	}, [editing]);

	const onChangeNumber = (raw: string) => {
		if (raw === '') return onChangeValue('');
		const cleaned = raw
			.replace(/[^\d.]/g, '')
			.replace(/^0+(\d)/, '$1')
			.replace(/(\..*)\./g, '$1');
		onChangeValue(cleaned);
	};

	const commit = () => {
		onChangeValue(value === '' ? '0' : value);
		onCommit();
	};

	return (
		<div className="font-noto font-medium">
			{local.editing ? (
				<input
					autoFocus
					type="text"
					inputMode="decimal"
					className="text-xs w-[120px] border rounded px-2 py-1 outline-none"
					value={value}
					onChange={(e) => onChangeNumber(e.target.value)}
					onBlur={commit}
					onKeyDown={(e) => { if (e.key === 'Enter') commit(); }}
				/>
			) : (
				<p className="text-xs truncate max-w-[120px]">{formatNumberWithCommas(parseFloat(value || '0'))}</p>
			)}
			<p className="text-[10px] opacity-50">
				${formatNumberWithCommas(usdValue * (parseFloat(value || '0') || 0))}
			</p>
		</div>
	);
};

const WatchlistPortfolio = () => {
	const queryClient = useQueryClient();
	const { data: userData } = useMe()
	const { data, isLoading } = useGetWatchlist(userData?.data?.id || "");
	const removeFromWatchlist = useRemoveFromWatchlist();
	const upsertHoldings = useUpsertHoldings(userData?.data?.id);
	const [busyById, setBusyById] = useState<Record<string, boolean>>({});
	const [activeTab, setActiveTab] = useState("All Assets");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [holdingsDraft, setHoldingsDraft] = useState<Record<string, string>>({});

	const startEdit = (assetId: string, initial: string) => {
		setHoldingsDraft((s) => ({ ...s, [assetId]: initial ?? '0' }));
		setEditingId(assetId);
	};

	const commitEdit = (assetId: string) => {
		const raw = holdingsDraft[assetId] ?? '0';
		const val = Number(raw || 0);
		if (!Number.isFinite(val)) return;
		if (!userData?.data?.id) return;

		upsertHoldings.mutate({
			userId: userData.data.id,
			assetId,
			holdings: val,
		});
		setEditingId(null);
	};

	const items = data?.data?.items ?? [];
	const totalItems = data?.data?.totals?.tokens || 0
	const totalPrices = items.reduce((sum, asset) => {
		const holdings = Number(asset?.holdings ?? 0);
		const price = Number(asset?.overview?.market?.close ?? 0);
		return sum + holdings * price;
	}, 0);
	const tabs = [
		"All Assets",
		// "Crypto", 
		// "Stocks", 
		// "Commodities"
	];

	const handleAddAsset = () => {
		setIsModalOpen(true);
	};

	const handleRemove = async (asset: any) => {
		const assetId = asset.assetId ?? asset.id;
		if (!assetId || !userData?.data?.id) return;

		setBusyById(s => ({ ...s, [assetId]: true }));

		const qk = ['watchlist', userData?.data?.id];
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
			await removeFromWatchlist.mutateAsync({ userId: userData?.data?.id, code: String(assetId) });
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
		<div className="space-y-5 text-[#2F2F2F]">
			<div>
				<p className="dark:text-white font-medium font-space mb-1">Watchlist & Portfolio</p>
				<p className="dark:text-white text-xs font-noto">Track your assets and portfolio performance</p>
			</div>

			{/* Portfolio Stats */}
			<div className="bg-white dark:bg-black rounded-[20px] p-5 font-noto flex justify-between">
				<div className="flex items-center gap-20">
					<div>
						<div className="dark:text-white text-xs opacity-50 mb-2">Total Portfolio Value:</div>
						<div className="dark:text-white text-xl font-semibold">${formatNumberWithCommas(totalPrices)}</div>
					</div>
					<div>
						<div className="dark:text-white text-xs opacity-50 mb-2">Assets in Portfolio:</div>
						<div className="dark:text-white text-xl font-semibold">{formatNumberWithCommas(totalItems)}</div>
					</div>
				</div>
				<Button
					variant="outline"
					size="sm"
					className="cursor-pointer w-fit dark:bg-white bg-[#F8F8F8] border border-[#2F2F2F] font-noto text-[#494949] font-normal text-xs"
					onClick={handleAddAsset}
				>
					+ Add Asset to Portfolio
				</Button>
			</div>

			<div className="bg-white dark:bg-black rounded-[20px] p-5 font-noto">
				{/* Portfolio Section */}
				<div className="space-y-4">
					<h3 className="dark:text-white text-sm font-medium">My Portfolio & Watchlist</h3>
					{/* Tabs */}
					<div className="flex gap-2">
						{tabs.map((tab) => (
							<Button
								key={tab}
								variant={activeTab === tab ? "default" : "ghost"}
								size="sm"
								onClick={() => setActiveTab(tab)}
								className={`rounded-lg text-xs cursor-pointer ${activeTab === tab ? "bg-[#DDF346] text-black font-medium" : "bg-[#F8F8F8] font-normal"}`}
							>
								{tab}
							</Button>
						))}
					</div>

					{/* Assets Table */}
					<Table>
						<TableHeader className="dark:bg-[#1A1A1A]">
							<TableRow className="border-b">
								<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto dark:rounded-tl-lg font-normal">#</TableHead>
								<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal">Asset</TableHead>
								<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal">Price</TableHead>
								<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal">Market Cap</TableHead>
								<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal">Volume(24h)</TableHead>
								<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal">Circulating Supply</TableHead>
								<TableHead className="text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto font-normal">Holdings</TableHead>
								<TableHead className="w-12 text-[#686868] dark:text-[#FFF] border-b border-b-[#C9C9C9] dark:border-b-[#4A4A4A] font-noto dark:rounded-tr-lg font-normal">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading
								? Array.from({ length: 5 }).map((_, i) => (
									<TableRow key={i} className="animate-pulse">
										{Array.from({ length: 8 }).map((_, j) => (
											<TableCell key={j} className="py-4 h-[73px] border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
												<div className="h-6 bg-gray-200 dark:bg-[#333] rounded animate-pulse w-full" />
											</TableCell>
										))}
									</TableRow>
								))
								: items.map((asset) => {
									const assetId = asset.assetId;
									const busy = !!busyById[assetId];
									const price = asset?.overview?.market?.close || 0;
									const isEditing = editingId === assetId;
									const draftValue = holdingsDraft[assetId] ?? String(asset?.holdings ?? '0');

									return (
										<TableRow key={asset.assetId} className="hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] cursor-pointer transition-colors">
											<TableCell className="dark:text-white border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
												{asset?.overview?.valuation?.crypto_total_rank}
											</TableCell>
											<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
												<div className="flex items-center gap-3">
													<div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
														<Image src={`https://s3-symbol-logo.tradingview.com/${asset?.overview?.info.base_currency_logoid}.svg`} alt="Symbol" width={64} height={64} className="rounded-full" />
													</div>
													<div className="flex-1 dark:text-white">
														<div className="font-medium">{asset?.overview?.info?.base_currency_desc}</div>
														<div className="text-sm text-muted-foreground">{asset?.overview?.info?.base_currency}</div>
													</div>
												</div>
											</TableCell>
											<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] dark:text-white">
												${formatNumberWithCommas(asset?.overview?.market?.close)}
											</TableCell>
											<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] dark:text-white">
												${formatNumberWithCommas(asset?.overview?.valuation?.market_cap_calc)}
											</TableCell>
											<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] dark:text-white">
												<div>${formatNumberWithCommas(asset?.overview?.market?.['24h_vol_cmc'])}</div>
											</TableCell>
											<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] dark:text-white">
												{formatNumberWithCommas(asset?.overview?.info?.circulating_supply)}
											</TableCell>
											<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424] dark:text-white">
												<EditableHoldingsCell
													value={draftValue}
													usdValue={price}
													editing={isEditing}
													onChangeValue={(v) =>
														setHoldingsDraft((s) => ({ ...s, [assetId]: v }))
													}
													onCommit={() => commitEdit(assetId)}
												/>
											</TableCell>
											<TableCell className="border-b border-b-[#F3F3F3] dark:border-b-[#242424]">
												<div className="flex items-center gap-2">
													<button
														onMouseDown={(e) => e.preventDefault()}
														onClick={() => {
															if (!isEditing) {
																startEdit(assetId, String(asset?.holdings ?? '0'));
															} else {
																commitEdit(assetId);
															}
														}}
														className="cursor-pointer relative grid place-items-center h-6 w-6 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors dark:text-white"
														title={isEditing ? 'Save holdings' : 'Edit holdings'}
													>
														<PlusCircle className="w-4 h-4" />
													</button>
													<button
														onMouseDown={(e) => e.preventDefault()}
														onClick={() => handleRemove(asset)}
														disabled={busy}
														className="cursor-pointer relative grid place-items-center h-6 w-6 rounded-full disabled:opacity-60 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors dark:text-white"
													>
														{busy ? (
															<span className="h-4 w-4 animate-spin border-2 border-yellow-500 border-t-transparent rounded-full" />
														) : (
															<Trash2Icon className="w-4 h-4" />
														)}
													</button>
												</div>
											</TableCell>
										</TableRow>
									)
								})}
						</TableBody>
					</Table>
					{/* Pagination */}
					{/* <div className="mt-6">
						<div className="flex items-center justify-between gap-2 text-xs w-full text-[#939393]">
							<p>Show <b>1 - 10</b> of <b>{totalItems}</b></p>
							<div className="flex gap-1 ml-4">
								<button className="w-6 h-6 rounded text-xs">1</button>
								<button className="w-6 h-6 rounded text-xs">2</button>
								<button className="w-6 h-6 rounded text-xs">3</button>
								<button className="w-6 h-6 rounded text-xs">4</button>
							</div>
						</div>
					</div> */}
				</div>
			</div>
			<AddAssetModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				onSave={() => { }}
				userId={userData?.data?.id || ""}
				assetType={''}
			/>
		</div>
	);
};

export default WatchlistPortfolio;