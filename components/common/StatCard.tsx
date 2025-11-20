import { formatNumberWithCommas } from "@/lib/format";
import TooltipCommon from "./TooltipCommon";

const StatCard = ({ title, tooltip, value, change, isLoading }: any) => {
    const isUp = change?.direction === 'up';
    const isDown = change?.direction === 'down';

    let icon = '';
    let color = '';
    if (isUp) {
        icon = '▲';
        color = 'text-[#00B552]';
    } else if (isDown) {
        icon = '▼';
        color = 'text-[#FF0000]';
    } else {
        icon = '';
        color = 'text-gray-400';
    }

    return (
        <div className="p-4 bg-white dark:bg-black rounded-xl shadow-xl dark:text-white flex-1">
            <div className="flex items-center gap-2 mb-2">
                <h3 className="font-reddit">{title}</h3>
                <TooltipCommon content={tooltip} />
            </div>
            {isLoading ? (
                <div className="space-y-2">
                    <div className="h-10 w-24 bg-gray-200 dark:bg-[#333] rounded-md animate-pulse" />
                    <div className="h-4 w-32 bg-gray-200 dark:bg-[#333] rounded-md animate-pulse" />
                </div>
            ) : (
                <>
                    <div className="text-4xl font-bold font-noto">{formatNumberWithCommas(value)}</div>
                    {isUp || isDown ? (
                        <div className={`text-sm ${color} font-medium mt-1 font-noto flex items-center`}>
                            {icon} {isUp ? '+' : '-'}
                            {formatNumberWithCommas(change?.absolute)}
                            {isUp || isDown ? ` (${isUp ? '+' : '-'}${change?.percentage}%)` : ''}
                        </div>
                    ) : (
                        <div className="text-sm text-gray-400 font-medium mt-1 font-noto flex items-center">
                            <span style={{ letterSpacing: 0.5 }}>No change</span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default StatCard;