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
				className="inline-flex min-w-[100px] items-center justify-between rounded-md border border-neutral-200 bg-white px-3 text-sm
                   hover:bg-neutral-50 focus:outline-none
                   dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-white"
				aria-label="Rows per page"
			>
				<span>{value}/page</span>
			</SelectTrigger>

			<SelectPortal>
				<SelectContent
					className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg
                     dark:border-neutral-700 dark:bg-neutral-900"
					position="popper"
					sideOffset={6}
				>
					<SelectViewport className="p-1">
						{options.map((n) => (
							<SelectItem key={n} value={String(n)} className='cursor-pointer text-neutral-800 hover:bg-neutral-50 focus:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 text-sm rounded'>
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
		<div className="rounded-2xl bg-white dark:bg-black p-4 md:p-6 space-y-4">
			{/* Header */}
			<div className="flex items-center justify-between gap-3">
				<div className='flex-1'>
					<p className="text-lg font-semibold mb-0.5 font-noto dark:text-white">
						Best yields for <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#DDF346] to-[#84EA07]">{communityId && communityId.toUpperCase()}</span>
					</p>
					<p className="text-[11px] text-neutral-500">Data from DefiLlama Pools API</p>
				</div>

				{/* Controls */}
				<div className="flex items-center gap-2">
					<div className='relative'>
						<p className="text-[11px] font-noto text-neutral-600 dark:text-neutral-300 flex-1 absolute -top-2 left-2.5 z-30 bg-white dark:bg-black">
							Min TVL (USD)
						</p>
						<Input
							type="text"
							inputMode="numeric"
							className="relative w-36 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-2 text-sm outline-none dark:text-white"
							value={minTvlUsdInput}
							onChange={handleMinTvlChange}
							placeholder="e.g. 2,000,000"
						/>
					</div>
					<Button
						onClick={handleApplyFilter}
						className="cursor-pointer rounded-md bg-neutral-900 text-white text-xs px-3 dark:bg-neutral-100 dark:text-black"
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
				<table className="w-full text-sm">
					<thead className="text-left bg-neutral-50 dark:bg-neutral-900/60">
						<tr className="border-b border-neutral-200 dark:border-neutral-800 dark:text-white">
							<th className="py-2 px-3 font-medium">#</th>
							<th className="py-2 px-3 font-medium">Project</th>
							<th className="py-2 px-3 font-medium">Chain</th>
							<th className="py-2 px-3 font-medium">APY</th>
							<th className="py-2 px-3 font-medium">TVL (USD)</th>
							{/* <th className="py-2 px-3 font-medium">Pool</th> */}
						</tr>
					</thead>

					<tbody>
						{isLoading ? (
							// Skeleton rows
							Array.from({ length: limit }).map((_, i) => (
								<tr key={i} className="border-b border-neutral-100 dark:border-neutral-900">
									{Array.from({ length: 6 }).map((__, j) => (
										<td key={j} className="py-3 px-3">
											<div className="h-4 w-full max-w-[160px] animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
										</td>
									))}
								</tr>
							))
						) : isError ? (
							<tr>
								<td colSpan={6} className="py-6 px-3 text-center text-red-500">
									Failed to load yields. Please try again.
								</td>
							</tr>
						) : items.length === 0 ? (
							<tr>
								<td colSpan={6} className="py-6 px-3 text-center text-neutral-500">
									No pools matched your filters.
								</td>
							</tr>
						) : (
							items.map((row, idx) => (
								<tr
									key={row.pool ?? `${row.project}-${row.chain}-${idx}`}
									className="border-b border-neutral-100 dark:border-neutral-900 hover:bg-neutral-50/60 dark:hover:bg-neutral-900/50"
								>
									<td className="py-3 px-3 dark:text-white">{(page - 1) * limit + idx + 1}</td>
									<td className="py-3 px-3">
										<div className="flex items-center gap-2">
											<Image src={`https://icons.llamao.fi/icons/protocols/${row?.project}?w=48&h=48`} alt="Logo Project" width={48} height={48} className='w-6 h-6 rounded-full' />
											<span className="text-xs font-medium capitalize dark:text-white">{row.project ?? '-'}</span>
										</div>
									</td>
									<td className="py-3 px-3">
										<TooltipCommon classNameTypo="!p-1" content={row?.chain || ''} trigger={<Image src={`https://icons.llamao.fi/icons/chains/rsz_${row.chain}?w=48&h=48`} alt="Logo Project" width={48} height={48} className='w-6 h-6 rounded-full' />} />
									</td>
									<td className="py-3 px-3">
										<span className="inline-block text-xs rounded-md bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300 px-2 py-0.5">
											{Number(row.apy ?? 0).toFixed(2)}%
										</span>
									</td>
									<td className="py-3 px-3 dark:text-white text-xs">${formatWithComma(String(row.tvlUsd))}</td>
									{/* <td className="py-3 px-3">
										{row.pool ? (
											<a
												href={row.pool}
												target="_blank"
												rel="noreferrer"
												className="text-xs text-blue-600 hover:underline"
											>
												View pool
											</a>
										) : (
											<span className="text-neutral-400">-</span>
										)}
									</td> */}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Footer / Pagination */}
			<div className="flex items-center justify-between">
				<div className="text-xs text-neutral-500">
					{isFetching ? 'Refreshing…' : `Showing ${items.length} of ${total} pools`}
				</div>
				<div className="flex items-center gap-2">
					<button
						className="dark:text-white cursor-pointer h-8 px-3 rounded-md border border-neutral-200 dark:border-neutral-700 disabled:opacity-50"
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={!canPrev}
					>
						Prev
					</button>
					<span className="text-xs text-neutral-600 dark:text-neutral-300">
						Page <b>{page}</b> / {totalPages}
					</span>
					<button
						className="dark:text-white cursor-pointer h-8 px-3 rounded-md border border-neutral-200 dark:border-neutral-700 disabled:opacity-50"
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