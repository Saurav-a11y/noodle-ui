'use client';
import { useEffect, useState } from "react";

import CandlestickChart from "./CandletickChart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";

const timezones = [
	{ label: '(UTC)', offset: 0 },
	{ label: '(UTC-10) Honolulu', offset: -10 },
	{ label: '(UTC-8) Ghim', offset: -8 },
	{ label: '(UTC-8) Juneau', offset: -8 },
	{ label: '(UTC-7) Los Angeles', offset: -7 },
	{ label: '(UTC-7) Phoenix', offset: -7 },
	{ label: '(UTC-7) Vancouver', offset: -7 },
	{ label: '(UTC-6) Denver', offset: -6 },
	{ label: '(UTC-6) San Salvador', offset: -6 },
	{ label: '(UTC-6) Mexico City', offset: -6 },
	{ label: '(UTC-5) Bogota', offset: -5 },
	{ label: '(UTC-5) Chicago', offset: -5 },
	{ label: '(UTC-5) Lima', offset: -5 },
	{ label: '(UTC-4) Caracas', offset: -4 },
	{ label: '(UTC-4) New York', offset: -4 },
	{ label: '(UTC-4) Santiago', offset: -4 },
	{ label: '(UTC-4) Toronto', offset: -4 },
	{ label: '(UTC-3) Buenos Aires', offset: -3 },
	{ label: '(UTC-3) Sao Paulo', offset: -3 },
	{ label: '(UTC) Azores', offset: 0 },
	{ label: '(UTC) Reykjavik', offset: 0 },
	{ label: '(UTC+1) Casablanca', offset: 1 },
	{ label: '(UTC+1) Dublin', offset: 1 },
	{ label: '(UTC+1) Lagos', offset: 1 },
	{ label: '(UTC+1) Lisbon', offset: 1 },
	{ label: '(UTC+1) London', offset: 1 },
	{ label: '(UTC+1) Tunis', offset: 1 },
	{ label: '(UTC+2) Amsterdam', offset: 2 },
	{ label: '(UTC+2) Belgrade', offset: 2 },
	{ label: '(UTC+2) Berlin', offset: 2 },
	{ label: '(UTC+2) Bratislava', offset: 2 },
	{ label: '(UTC+2) Brussels', offset: 2 },
	{ label: '(UTC+2) Budapest', offset: 2 },
	{ label: '(UTC+2) Copenhagen', offset: 2 },
	{ label: '(UTC+2) Johannesburg', offset: 2 },
	{ label: '(UTC+2) Luxembourg', offset: 2 },
	{ label: '(UTC+2) Madrid', offset: 2 },
	{ label: '(UTC+2) Malta', offset: 2 },
	{ label: '(UTC+2) Oslo', offset: 2 },
	{ label: '(UTC+2) Paris', offset: 2 },
	{ label: '(UTC+2) Prague', offset: 2 },
	{ label: '(UTC+2) Rome', offset: 2 },
	{ label: '(UTC+2) Stockholm', offset: 2 },
	{ label: '(UTC+2) Vienna', offset: 2 },
	{ label: '(UTC+2) Warsaw', offset: 2 },
	{ label: '(UTC+2) Zurich', offset: 2 },
	{ label: '(UTC+3) Athens', offset: 3 },
	{ label: '(UTC+3) Bahrain', offset: 3 },
	{ label: '(UTC+3) Bucharest', offset: 3 },
	{ label: '(UTC+3) Cairo', offset: 3 },
	{ label: '(UTC+3) Helsinki', offset: 3 },
	{ label: '(UTC+3) Istanbul', offset: 3 },
	{ label: '(UTC+3) Jerusalem', offset: 3 },
	{ label: '(UTC+3) Kuwait', offset: 3 },
	{ label: '(UTC+3) Moscow', offset: 3 },
	{ label: '(UTC+3) Nairobi', offset: 3 },
	{ label: '(UTC+3) Nicosia', offset: 3 },
	{ label: '(UTC+3) Qatar', offset: 3 },
	{ label: '(UTC+3) Riga', offset: 3 },
	{ label: '(UTC+3) Riyadh', offset: 3 },
	{ label: '(UTC+3) Tallinn', offset: 3 },
	{ label: '(UTC+3) Vilnius', offset: 3 },
	{ label: '(UTC+3:30) Tehran', offset: 3.5 },
	{ label: '(UTC+4) Dubai', offset: 4 },
	{ label: '(UTC+4) Muscat', offset: 4 },
	{ label: '(UTC+5) Ashkhabad', offset: 5 },
	{ label: '(UTC+5) Astana', offset: 5 },
	{ label: '(UTC+5) Karachi', offset: 5 },
	{ label: '(UTC+5:30) Colombo', offset: 5.5 },
	{ label: '(UTC+5:30) Kolkata', offset: 5.5 },
	{ label: '(UTC+5:45) Kathmandu', offset: 5.75 },
	{ label: '(UTC+6) Dhaka', offset: 6 },
	{ label: '(UTC+6:30) Yangon', offset: 6.5 },
	{ label: '(UTC+7) Bangkok', offset: 7 },
	{ label: '(UTC+7) Jakarta', offset: 7 },
	{ label: '(UTC+7) Ho Chi Minh City', offset: 7 },
	{ label: '(UTC+8) Taipei', offset: 8 },
	{ label: '(UTC+8) Hong Kong', offset: 8 },
	{ label: '(UTC+8) Kuala Lumpur', offset: 8 },
	{ label: '(UTC+8) Manila', offset: 8 },
	{ label: '(UTC+8) Perth', offset: 8 },
	{ label: '(UTC+8) Singapore', offset: 8 },
	{ label: '(UTC+8) Shanghai', offset: 8 },
	{ label: '(UTC+8) Chongqing', offset: 8 },
	{ label: '(UTC+9) Seoul', offset: 9 },
	{ label: '(UTC+9) Tokyo', offset: 9 },
	{ label: '(UTC+9:30) Adelaide', offset: 9.5 },
	{ label: '(UTC+10) Brisbane', offset: 10 },
	{ label: '(UTC+10) Sydney', offset: 10 },
	{ label: '(UTC+11) Norfolk Island', offset: 11 },
	{ label: '(UTC+12) New Zealand', offset: 12 },
	{ label: '(UTC+12:45) Chatham Islands', offset: 12.75 },
	{ label: '(UTC+13) Tokelau', offset: 13 },
];

const SocialChart = ({ type }) => {
	const [currentTime, setCurrentTime] = useState('')
	const [selectedTz, setSelectedTz] = useState<{ label: string; offset: number }>(timezones[0]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const utc = Date.UTC(
				now.getUTCFullYear(),
				now.getUTCMonth(),
				now.getUTCDate(),
				now.getUTCHours(),
				now.getUTCMinutes(),
				now.getUTCSeconds()
			);

			const target = new Date(utc + selectedTz.offset * 3600000);
			const time = target.toISOString().split('T')[1].split('.')[0];
			setCurrentTime(time);
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, [selectedTz]);
	return (
		<div className="p-6 rounded-xl bg-[var(--bg-block)] text-[var(--text)]">
			<CandlestickChart utcOffset={selectedTz.offset} type={type} />
			<div className="flex flex-col md:flex-row md:items-center mt-4 justify-between gap-2">
				<div className="flex items-center gap-2 text-xs text-[var(--bg-text)]">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild >
							<div className="cursor-pointer text-xs text-[var(--bg-text)] flex items-center gap-2">
								<span>
									{currentTime} {selectedTz.label}
								</span>
							</div>
						</PopoverTrigger>
						<PopoverContent className="w-[250px] max-h-64 overflow-y-auto p-2 bg-[var(--bg-card)]">
							{timezones.map((tz) => (
								<div
									key={tz.label}
									onClick={() => {
										setSelectedTz(tz);
										setOpen(false);
									}}
									className={`text-sm px-3 py-2 cursor-pointer text-[var(--bg-text)] hover:bg-[var(--bg-hover)] ${selectedTz.label === tz.label ? 'text-blue-500 font-medium' : ''
										}`}
								>
									{tz.label}
								</div>
							))}
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	);
};

export default SocialChart;