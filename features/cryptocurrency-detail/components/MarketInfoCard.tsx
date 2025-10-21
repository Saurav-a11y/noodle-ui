"use client";

import { useState } from "react";
import { useMarketInfo } from "@/hooks/useGetMarketInfo";
import { ExternalLink, RefreshCw } from "lucide-react";
import { useParams } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import Image from "next/image";
import { formatCurrency, formatNumberWithCommas, formatPercent } from "@/lib/format";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/Select";
import { SelectPortal, SelectViewport } from "@radix-ui/react-select";

// const MARKET_GROUPS = ["All", "CEX", "DEX"];
// const MARKET_TYPES = ["Spot", "Perpetuals", "Futures"];

function LimitSelect({
	value,
	onChange,
	options = [5, 10, 20, 50],
}: {
	value: number;
	onChange: (v: number) => void;
	options?: number[];
}) {
	return (
		<Select value={String(value)} onValueChange={(v) => onChange(Number(v))}>
			<SelectTrigger
				className="hover:cursor inline-flex min-w-[100px] items-center justify-between rounded-md px-3 text-sm focus:outline-none
                   border border-[var(--border)] bg-[var(--bg-block)] w-fit"
				aria-label="Rows per page"
			>
				<span>{value}</span>
			</SelectTrigger>

			<SelectPortal>
				<SelectContent
					className="overflow-hidden rounded-md border-none bg-[var(--bg-card)] shadow-lg"
					position="popper"
					sideOffset={6}
				>
					<SelectViewport className="p-1">
						{options.map((n) => (
							<SelectItem key={n} value={String(n)} className='cursor-pointer text-[var(--text)] hover:bg-[var(--bg-hover)] text-sm rounded'>
								{n}
							</SelectItem>
						))}
					</SelectViewport>
				</SelectContent>
			</SelectPortal>
		</Select>
	);
}


export default function MarketTable() {
	const params = useParams();
	const communityId = params?.slug as string;
	const [page, setPage] = useState(1);
	// const [group, setGroup] = useState<"All" | "CEX" | "DEX">("All");
	// const [type, setType] = useState<"Spot" | "Perpetuals" | "Futures">("Spot");
	const initialLimit = 10;
	const [limit, setLimit] = useState(initialLimit);

	const { data, isLoading, isFetching, isError, refetch } = useMarketInfo(communityId, page, limit,);

	if (isLoading) {
		return (
			<div className="p-6 bg-[var(--bg-hover)] text-[var(--text)] h-[556px] rounded-lg text-center animate-pulse flex justify-center items-center flex-col">
				<RefreshCw className="animate-spin mx-auto mb-2" />
				<p>
					Loading market data for <span className="font-semibold">{communityId}</span>...
				</p>
			</div>
		);
	}

	if (isError || !data) {
		return (
			<div className="p-6 bg-red-50 dark:bg-[#2A0000] text-red-500 rounded-lg text-center">
				Failed to load market data for {communityId}.
				<button onClick={() => refetch()} className="ml-2 underline hover:text-red-700">
					Retry
				</button>
			</div>
		);
	}

	const markets = data?.markets || [];
	const totalPages = data.totalPages || 1;

	return (
		<div className="rounded-2xl bg-[var(--bg-block)] p-4 md:p-6 space-y-4">
			<h2 className="text-lg font-semibold font-noto mb-3 text-[var(--text)]">
				<span className="text-transparent bg-clip-text bg-gradient-to-b from-[#DDF346] to-[#84EA07]">{communityId}</span> Markets
			</h2>

			{/* <div className="flex items-center gap-4 mb-5 flex-wrap">
				<div className="flex items-center bg-[var(--bg-list-btn)] p-1.5 rounded">
					{MARKET_GROUPS.map((g) => (
						<button
							key={g}
							onClick={() => {
								setGroup(g as any);
								setPage(1);
							}}
							className={`px-2.5 py-1 rounded cursor-pointer text-xs font-reddit font-medium transition-colors ${group === g ? 'bg-[#DDF346] rounded-md text-[#222]' : 'hover:bg-[var(--bg-hover-2)]'
								}`}
						>
							{g}
						</button>
					))}
				</div>

				<div className="flex items-center bg-[var(--bg-list-btn)] p-1.5 rounded">
					{MARKET_TYPES.map((t) => (
						<button
							key={t}
							onClick={() => {
								setType(t as any);
								setPage(1);
							}}
							className={`px-2.5 py-1 rounded cursor-pointer text-xs font-reddit font-medium transition-colors ${type === t ? 'bg-[#DDF346] rounded-md text-[#222]' : 'hover:bg-[var(--bg-hover-2)]'
								}`}
						>
							{t}
						</button>
					))}
				</div>
			</div> */}

			<div className="overflow-x-auto rounded-tl-xl rounded-tr-xl bg-[var(--bg-hover)]">
				<Table className="min-w-full text-sm">
					<TableHeader className="bg-[var(--bg-input-chat)]">
						<TableRow className="border-b-[var(--border)] text-[var(--text-table)]">
							{["#", "Exchange", "Pair", "Price", "Spread", "+2% Depth", "-2% Depth", "24h Volume", "Volume %", "Trust Score",].map((h) => (
								<TableHead key={h} className="py-2 px-3 font-medium text-left border-b-[var(--border)]">
									{h}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{markets.map((m) => (
							<TableRow key={m.rank} className="hover:bg-[var(--bg-hover-2)] transition">
								<TableCell className="py-3 px-3 font-medium border-b border-[var(--border)] text-xs">{m.rank}</TableCell>
								<TableCell className="py-3 px-3 font-medium border-b border-[var(--border)] text-xs">
									<div className="flex items-center gap-2">
										<Image src={m.exchange_logo} alt="Logo Project" width={48} height={48} className='w-6 h-6 rounded-full' />
										<span className="text-xs font-medium capitalize text-[var(--text)]">{m.exchange ?? '-'}</span>
									</div>
								</TableCell>
								<TableCell className="py-3 px-3 font-medium border-b border-[var(--border)] font-mono truncate max-w-[220px] text-xs">
									<div className="flex items-center gap-2">
										<span className="text-xs font-medium capitalize text-[var(--text)] truncate max-w-[140px]" title={m.exchange ?? '-'}>
											{m.pair}
										</span>
										<Link
											href={m.trade_url}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center justify-center hover:underline"
										>
											<ExternalLink className="w-4 h-4" />
										</Link>
									</div>
								</TableCell>
								<TableCell className="py-3 px-3 font-medium border-b border-[var(--border)] text-xs">{formatCurrency(m.price)}</TableCell>
								<TableCell className="py-3 px-3 font-medium border-b border-[var(--border)] text-xs">{formatPercent(m.spread)}</TableCell>
								<TableCell className="py-3 px-3 font-medium border-b border-[var(--border)] text-xs">
									${formatNumberWithCommas(m.depth_plus_2_percent)}
								</TableCell>
								<TableCell className="py-3 px-3 font-medium border-b border-[var(--border)] text-xs">
									${formatNumberWithCommas(m.depth_minus_2_percent)}
								</TableCell>
								<TableCell className="py-3 px-3 font-medium border-b border-[var(--border)] text-xs">
									${formatNumberWithCommas(m.volume_24h_usd)}
								</TableCell>
								<TableCell className="py-3 px-3 font-medium border-b border-[var(--border)] text-xs">
									{m.volume_percent}%
								</TableCell>
								<TableCell className="py-3 px-3 font-medium border-b border-[var(--border)] text-xs">
									<p
										className={`w-5 h-5 rounded-full text-xs ${m.trust_score === "green"
											? "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200"
											: "bg-gray-200 dark:bg-gray-700"
											}`}
									>
									</p>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				{markets.length === 0 && (
					<div className="text-center py-6 text-muted-foreground">No market data available.</div>
				)}
			</div>

			<div className="flex items-center justify-between mt-4">
				<div className="flex items-center gap-2">
					<p className="text-sm text-[var(--text)]">Rows</p>
					<LimitSelect
						value={limit}
						onChange={(n) => {
							setLimit(n);
							setPage(1);
						}}
						options={[10, 50, 100]}
					/>
				</div>
				{/* Pagination */}
				<div className="flex justify-end gap-2 items-center text-[var(--text)]">
					<button
						disabled={page <= 1}
						onClick={() => setPage((p) => p - 1)}
						className="text-[var(--text)] cursor-pointer h-8 px-3 rounded-md border border-neutral-200 dark:border-neutral-700 disabled:opacity-50"
					>
						Prev
					</button>
					<span className="text-xs text-[var(--text)]">
						Page {page} / {totalPages}
					</span>
					<button
						disabled={page >= totalPages}
						onClick={() => setPage((p) => p + 1)}
						className="text-[var(--text)] cursor-pointer h-8 px-3 rounded-md border border-neutral-200 dark:border-neutral-700 disabled:opacity-50"
					>
						Next
					</button>
				</div>
			</div>

			{isFetching && (
				<div className="text-xs text-muted-foreground text-right mt-2 italic">Updating...</div>
			)}
		</div>
	);
}