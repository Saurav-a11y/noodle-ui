'use client'

import { useYields } from '@/hooks/useYield';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/Select';
import { SelectPortal, SelectViewport } from '@radix-ui/react-select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import Image from 'next/image';
import TooltipCommon from './TooltipCommon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';

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
                   border border-[var(--border)] bg-[var(--bg-block)]"
				aria-label="Rows per page"
			>
				<span>{value}/page</span>
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
								{n}/page
							</SelectItem>
						))}
					</SelectViewport>
				</SelectContent>
			</SelectPortal>
		</Select>
	);
}

export default function YieldsList({
	initialMinTvlUsd = 0,
	initialLimit = 5,
}: {
	initialMinTvlUsd?: number;
	initialLimit?: number;
}) {
	const params = useParams();
	const communityId = params?.slug as string;
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(initialLimit);
	const [minTvlUsd, setMinTvlUsd] = useState<number>(initialMinTvlUsd);
	const [minTvlUsdInput, setMinTvlUsdInput] = useState<string>(
		initialMinTvlUsd.toLocaleString("en-US")
	);

	const { data, isLoading, isError, isFetching } = useYields(communityId, {
		page,
		limit,
		minTvlUsd,
	});

	const total = data?.total ?? 0;
	const items = data?.items ?? [];
	const totalPages = Math.max(1, Math.ceil(total / limit));

	const canPrev = page > 1;
	const canNext = page < totalPages;

	const parseNumber = (s: string) => Number((s || "").replace(/,/g, "")) || 0;
	const formatWithComma = (s: string) =>
		(s || "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	const handleMinTvlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// bỏ dấu phẩy cũ để kiểm tra
		const raw = e.target.value.replace(/,/g, "");
		// chỉ cho nhập số
		if (!/^\d*$/.test(raw)) return;
		// format lại
		const formatted = formatWithComma(raw);
		setMinTvlUsdInput(formatted);
	};

	const handleApplyFilter = () => {
		// khi Apply mới commit về dạng number để gọi API
		setMinTvlUsd(parseNumber(minTvlUsdInput));
		setPage(1);
	};

	return (
		<div className="rounded-2xl bg-[var(--bg-block)] p-4 md:p-6 space-y-4">
			{/* Header */}
			<div className="flex items-center justify-between gap-3">
				<div className='flex-1'>
					<p className="text-lg font-semibold mb-0.5 font-noto text-[var(--text)]">
						Best yields for <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#DDF346] to-[#84EA07]">{communityId && communityId.toUpperCase()}</span>
					</p>
					<p className="text-[11px] text-neutral-500">Data from DefiLlama Pools API</p>
				</div>

				{/* Controls */}
				<div className="flex items-center gap-2">
					<div className='relative'>
						<p className="text-[11px] font-noto text-[var(--text)] flex-1 absolute -top-2 left-2.5 z-30 bg-[var(--bg-block)]">
							Min TVL (USD)
						</p>
						<Input
							type="text"
							inputMode="numeric"
							className="relative w-36 rounded-md border border-[var(--border)] bg-[var(--bg-block)] px-2 text-sm outline-none text-[var(--text)]"
							value={minTvlUsdInput}
							onChange={handleMinTvlChange}
							placeholder="e.g. 2,000,000"
						/>
					</div>
					<Button
						onClick={handleApplyFilter}
						className="cursor-pointer rounded-md bg-[var(--bg-apply)] text-[var(--bg-card)] text-xs px-3"
					>
						Apply
					</Button>

					<LimitSelect
						value={limit}
						onChange={(n) => {
							setLimit(n);
							setPage(1);
						}}
						options={[5, 10, 20, 50]}
					/>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				<Table className="w-full text-sm">
					<TableHeader className="text-left bg-[var(--bg-input-chat)]">
						<TableRow className="border-b-[var(--border)] text-[var(--text-table)]">
							<TableHead className="py-2 px-3 font-medium border-b-[var(--border)] rounded-tl-lg">#</TableHead>
							<TableHead className="py-2 px-3 font-medium border-b-[var(--border)]">Project</TableHead>
							<TableHead className="py-2 px-3 font-medium border-b-[var(--border)]">Chain</TableHead>
							<TableHead className="py-2 px-3 font-medium border-b-[var(--border)]">APY</TableHead>
							<TableHead className="py-2 px-3 font-medium border-b-[var(--border)] rounded-tr-lg">TVL (USD)</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{isLoading ? (
							// Skeleton rows
							Array.from({ length: limit }).map((_, i) => (
								<TableRow key={i} className="border-b border-b-[var(--border)]">
									{Array.from({ length: 5 }).map((__, j) => (
										<TableCell key={j} className="py-3 px-3">
											<div className="h-4 w-full max-w-[160px] animate-pulse rounded bg-[var(--loading)]" />
										</TableCell>
									))}
								</TableRow>
							))
						) : isError ? (
							<TableRow>
								<TableCell colSpan={6} className="py-6 px-3 text-center text-red-500">
									Failed to load yields. Please try again.
								</TableCell>
							</TableRow>
						) : items.length === 0 ? (
							<TableRow>
								<TableCell colSpan={6} className="py-6 px-3 text-center text-neutral-500">
									No pools matched your filters.
								</TableCell>
							</TableRow>
						) : (
							items.map((row, idx) => (
								<TableRow
									key={row.pool ?? `${row.project}-${row.chain}-${idx}`}
									className="border-b border-b-[var(--border)] hover:bg-[var(--bg-hover-2)]"
								>
									<TableCell className="py-3 px-3 text-[var(--text)]">{(page - 1) * limit + idx + 1}</TableCell>
									<TableCell className="py-3 px-3">
										<div className="flex items-center gap-2">
											<Image src={row?.project ? `https://icons.llamao.fi/icons/protocols/${row?.project}?w=48&h=48` : '/images/icon-section-6_2.png'} alt="Logo Project" width={48} height={48} className='w-6 h-6 rounded-full' />
											<span className="text-xs font-medium capitalize text-[var(--text)]">{row.project ?? '-'}</span>
										</div>
									</TableCell>
									<TableCell className="py-3 px-3">
										<TooltipCommon classNameTypo="!p-1" content={row?.chain || ''} trigger={<Image src={`https://icons.llamao.fi/icons/chains/rsz_${row.chain}?w=48&h=48`} alt="Logo Project" width={48} height={48} className='w-6 h-6 rounded-full' />} />
									</TableCell>
									<TableCell className="py-3 px-3">
										<span className="inline-block text-xs rounded-md bg-[var(--bg-input-chat)] text-[var(--text)] px-2 py-0.5">
											{Number(row.apy ?? 0).toFixed(2)}%
										</span>
									</TableCell>
									<TableCell className="py-3 px-3 text-[var(--text)] text-xs">${formatWithComma(String(row.tvlUsd))}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Footer / Pagination */}
			<div className="flex items-center justify-between">
				<div className="text-xs text-[var(--text)]">
					{isFetching ? 'Refreshing…' : `Showing ${items.length} of ${total} pools`}
				</div>
				<div className="flex items-center gap-2">
					<button
						className="text-[var(--text)] cursor-pointer h-8 px-3 rounded-md border border-neutral-200 dark:border-neutral-700 disabled:opacity-50"
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={!canPrev}
					>
						Prev
					</button>
					<span className="text-xs text-[var(--text)]">
						Page <b>{page}</b> / {totalPages}
					</span>
					<button
						className="text-[var(--text)] cursor-pointer h-8 px-3 rounded-md border border-neutral-200 dark:border-neutral-700 disabled:opacity-50"
						onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
						disabled={!canNext}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}