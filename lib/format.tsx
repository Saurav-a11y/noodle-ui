import { format, isValid, parseISO, formatDistanceToNow, isToday, fromUnixTime } from "date-fns";
import numeral from "numeral";

export default function formatNumberWithDecimal(number: string | number, decimalPlaces = 0) {
    if (!number || Number.isNaN(number)) return number;
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    });
    const formattedNumber = formatter.format(+number);
    const parts = formattedNumber.toString().split('.');

    // Remove trailing zeros from the decimal part
    if (parts.length > 1) {
        parts[1] = parts[1].replace(/0+$/, '');
    }

    // Remove the decimal part if it is empty after removing zeros
    if (parts[1] === '') {
        return parts[0];
    }
    return parts.join('.');
}

export const formattedDate = (date: string, regex = 'HH:mm - MMM dd yyyy', isParseUTC = false) => {
    const parsedDate = parseISO(date);

    if (!isValid(parsedDate)) {
        console.error('Invalid date:', date);
        return null;
    }

    if (!isParseUTC) {
        return format(parsedDate, regex);
    }

    return format(
        new Date(
            parsedDate.getUTCFullYear(),
            parsedDate.getUTCMonth(),
            parsedDate.getUTCDate(),
            parsedDate.getUTCHours(),
            parsedDate.getUTCMinutes(),
        ),
        regex,
    );
};

export const formatNumberShort = (input: number | string | null | undefined): string => {
    if (input === null || input === undefined || input === '') return '∞';

    const num = typeof input === 'string' ? parseFloat(input.replace(/,/g, '')) : input;

    if (typeof num !== 'number' || isNaN(num)) return '∞';

    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toLocaleString();
};

export const formatCurrency = (value: number) => {
    if (value === 0) return "$0.00";
    if (!value || isNaN(value)) return "∞";

    if (value >= 1e12) {
        return `$${numeral(value / 1e12).format("0,0.00")}T`; // Trillion với dấu ,
    } else if (value >= 1e9) {
        return `$${numeral(value / 1e9).format("0.00")}B`; // Billion
    } else if (value >= 1e6) {
        return `$${numeral(value / 1e6).format("0.00")}M`; // Million
    } else if (value >= 1e3) {
        return `$${numeral(value / 1e3).format("0.00")}K`; // Thousand
    } else {
        return `$${numeral(value).format("0,0.00")}`;
    }
};

export const formatPercent = (value: number | null | undefined) => {
    if (value === null || value === undefined || isNaN(value)) return "0%";
    if (value === 0) return "0%";

    const absValue = Math.abs(value);
    const colorClass = value > 0 ? 'text-green-500' : 'text-red-500';
    const arrow = value > 0 ? '▲' : '▼';

    if (absValue >= 1e12) {
        return (
            <p className={`flex items-center gap-1 ${colorClass}`}>
                {arrow}
                <span className="font-semibold">{numeral(absValue / 1e12).format("0.00")}T%</span>
            </p>
        );
    }

    if (absValue >= 1e9) {
        return (
            <p className={`flex items-center gap-1 ${colorClass}`}>
                {arrow}
                <span className="font-semibold">{numeral(absValue / 1e9).format("0.00")}B%</span>
            </p>
        );
    }

    if (absValue >= 1e6) {
        return (
            <p className={`flex items-center gap-1 ${colorClass}`}>
                {arrow}
                <span className="font-semibold">{numeral(absValue / 1e6).format("0.00")}M%</span>
            </p>
        );
    }

    if (absValue >= 1) {
        return (
            <p className={`flex items-center gap-1 ${colorClass}`}>
                {arrow}
                <span className="font-semibold">{numeral(absValue).format("0,0.00")}%</span>
            </p>
        );
    }

    if (absValue >= 0.001) {
        return (
            <p className={`flex items-center gap-1 ${colorClass}`}>
                {arrow}
                <span className="font-semibold">{numeral(absValue).format("0.000")}%</span>
            </p>
        );
    }

    // Giá trị quá nhỏ, hiển thị dạng 0.0(n)xx%
    const fixedValue = absValue.toExponential(12);
    const match = fixedValue.match(/^(\d(?:\.\d+))e-(\d+)$/);

    let formattedValue;
    if (match) {
        const significantDigits = match[1].replace(".", "").slice(0, 2);
        const zeroCount = parseInt(match[2], 10) - 1;
        formattedValue = (
            <>
                0.0<sub className="text-xs">({zeroCount})</sub>{significantDigits}%
            </>
        );
    } else {
        formattedValue = numeral(absValue).format("0.0000") + "%";
    }

    return (
        <p className={`flex items-center gap-1 ${colorClass}`}>
            {arrow}
            <span className="font-semibold">{formattedValue}</span>
        </p>
    );
};

export function getChangeDisplay({
    change,
    changePercent,
    unit = '',
    changeDescription,
}: {
    change?: number;
    changePercent?: number;
    unit?: string;
    changeDescription?: string;
}) {
    const isUp = Number(change) > 0 || Number(changePercent) > 0;
    const isDown = Number(change) < 0 || Number(changePercent) < 0;

    const arrow = isUp ? '▲' : isDown ? '▼' : '';
    const color = isUp ? '#00B552' : isDown ? '#FF0000' : '#000';

    const formattedChange = change !== undefined ? formatNumberShort(change) : null;
    const formattedPercent = changePercent !== undefined ? `(${changePercent > 0 ? '+' : ''}${changePercent}${unit})` : null;
    const formattedDescription = changeDescription ? ` ${changeDescription}` : '';

    const changeText = [arrow, formattedChange, formattedPercent].filter(Boolean).join(' ') + formattedDescription;

    return { changeText, color };
}

export const formatTimestamp = (timestamp: number | string): string => {
    let date: Date;

    if (typeof timestamp === 'number') {
        // Unix timestamp (seconds)
        date = fromUnixTime(timestamp);
    } else {
        // ISO date string
        date = new Date(timestamp);
        if (isNaN(date.getTime())) return ''; // Invalid date
    }

    if (isToday(date)) {
        return formatDistanceToNow(date, { addSuffix: true }); // e.g., "2 hours ago"
    }

    return format(date, 'dd/MM/yyyy'); // e.g., "23/07/2025"
};

export const calculateEngagementRate = (likes: number, retweets: number, replies: number, impressions: number = 0, bookmarks: number = 0, followersCount: number,) => {
    if (!followersCount) return 0;
    const totalEngagement = likes + retweets + replies + impressions + bookmarks;
    return Number(((totalEngagement / followersCount) * 100).toFixed(2))
}

export const formatNumberWithCommas = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
};