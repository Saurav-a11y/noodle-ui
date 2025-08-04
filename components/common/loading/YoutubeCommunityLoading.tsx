export const YoutubeCommunityLoading = () => {
    return (
        <div className="bg-white dark:bg-[#000] rounded-xl p-5 animate-pulse">
            <div className="flex items-start gap-3">
                {/* Thumbnail Placeholder */}
                <div className="w-[100px] h-[56px] bg-gray-300 dark:bg-[#222] rounded-md" />

                <div className="flex-1 space-y-2">
                    {/* Title */}
                    <div className="h-4 bg-gray-300 dark:bg-[#222] rounded w-3/4" />

                    {/* Sub info */}
                    <div className="flex items-center gap-2 mt-2">
                        <div className="h-3 w-20 bg-gray-300 dark:bg-[#222] rounded" />
                        <div className="h-3 w-10 bg-gray-300 dark:bg-[#222] rounded" />
                        <div className="h-3 w-14 bg-gray-300 dark:bg-[#222] rounded" />
                    </div>

                    {/* Likes + Comments */}
                    <div className="flex items-center gap-4 mt-2">
                        <div className="h-3 w-16 bg-gray-300 dark:bg-[#222] rounded" />
                        <div className="h-3 w-16 bg-gray-300 dark:bg-[#222] rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
};