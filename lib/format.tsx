import { format, isValid, parseISO } from "date-fns";
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

export const formatNumberShort = (input: number | string): string => {
    const num = typeof input === 'string' ? parseFloat(input.replace(/,/g, '')) : input;

    if (isNaN(num)) return '-';

    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toLocaleString();
};

export const formatCurrency = (value: number) => {
    if (!value || isNaN(value)) return "$0.00";

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

export const formatPercent = (value: number) => {
    if (value === 0) return "0%";

    const absValue = Math.abs(value);

    // Giá trị lớn hơn 1T -> Format thành Trillion (T)
    if (absValue >= 1e12) {
        return (
            <p className={`flex items-center gap-1 ${value > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {value > 0 ? "▲" : "▼"}
                <span className="flex items-center gap-1 font-semibold">
                    {numeral(absValue / 1e12).format("0.00")}T%
                </span>
            </p>
        );
    }

    // Giá trị lớn hơn 1B -> Format thành Billion (B)
    if (absValue >= 1e9) {
        return (
            <div className={`flex items-center gap-1 ${value > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {value > 0 ? "▲" : "▼"}
                <span className="flex items-center gap-1 font-semibold">
                    {numeral(absValue / 1e9).format("0.00")}B%
                </span>
            </div>
        );
    }

    // Giá trị lớn hơn 1M -> Format thành Million (M)
    if (absValue >= 1e6) {
        return (
            <div className={`flex items-center gap-1 ${value > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {value > 0 ? "▲" : "▼"}
                <span className="flex items-center gap-1 font-semibold">
                    {numeral(absValue / 1e6).format("0.00")}M%
                </span>
            </div>
        );
    }

    // Giá trị lớn hơn 1 -> Hiển thị dạng `1,234.56%`
    if (absValue >= 1) {
        return (
            <div className={`flex items-center gap-1 ${value > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {value > 0 ? "▲" : "▼"}
                <span className="flex items-center gap-1 font-semibold">
                    {numeral(absValue).format("0,0.00") + "%"}
                </span>
            </div>
        );
    }

    // Giá trị từ 0.001 đến 0.9999 -> Format `0.0000%`
    if (absValue >= 0.001) {
        return (
            <p className={`flex items-center gap-1 ${value > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {value > 0 ? "▲" : "▼"}
                <span className="flex items-center gap-1 font-semibold">
                    {numeral(absValue).format("0.000") + "%"}
                </span>
            </p>
        );
    }

    // Giá trị nhỏ hơn 0.001 -> Format `0.0(n)xx%`
    const fixedValue = absValue.toExponential(12);
    const match = fixedValue.match(/^(\d(?:\.\d+))e-(\d+)$/);

    let formattedValue;
    if (match) {
        const significantDigits = match[1].replace(".", "").slice(0, 2); // Chỉ lấy 2 số đầu sau 0
        const zeroCount = parseInt(match[2], 10) - 1;
        formattedValue = (
            <>
                0.0
                <sub className="text-xs">({zeroCount})</sub>
                {significantDigits}%
            </>
        );
    } else {
        formattedValue = numeral(absValue).format("0.0000") + "%";
    }

    return (
        <p className={`flex items-center gap-1 ${value > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {value > 0 ? "▲" : "▼"}
            <span className="flex items-center gap-1 font-semibold">
                {formattedValue}
            </span>
        </p>
    );
};