import { format, isValid, parseISO } from "date-fns";

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