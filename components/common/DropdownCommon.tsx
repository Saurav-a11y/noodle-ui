'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Globe } from 'lucide-react';

export default function DropdownCommon({ data, title }: { data: { name: string; url: string }[], title: string }) {
	const [open, setOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	if (!data || data.length === 0) return null;

	return (
		<div className="flex items-center justify-between relative" ref={ref}>
			<p className="text-sm font-medium opacity-50 font-noto">{title}</p>
			<div className="relative flex-1 flex items-center justify-end gap-2">
				<button
					className="flex items-center gap-2 bg-[#DDF346] dark:text-[#1A1A1A] px-3 py-1.5 rounded-full font-medium text-sm cursor-pointer font-reddit w-full max-w-[124px] overflow-hidden whitespace-nowrap truncate"
				>
					<span className="truncate block w-full">{data[0]?.name}</span>
				</button>
				<span onClick={() => setOpen(!open)} className='cursor-pointer'>
					{open ? (
						<ChevronUp className="w-4 h-4 flex-shrink-0" />
					) : (
						<ChevronDown className="w-4 h-4 flex-shrink-0" />
					)}
				</span>
				{open && (
					<div className="absolute -bottom-[174px] bg-[#1A1A1A] text-white rounded-md shadow-md py-2 z-50 w-50">
						{data.map((item, index) => (
							<Link
								key={index}
								href={item?.url || '#'}
								target="_blank"
								onClick={() => {
									setOpen(false);
								}}
								className="block px-4 py-2 text-sm hover:bg-[#333] cursor-pointer truncate flex items-center gap-2"
							>
								<Globe className='w-4 h-4' />
								{item?.name}
							</Link>
						))}
					</div>
				)}
			</div>
		</div >
	);
}