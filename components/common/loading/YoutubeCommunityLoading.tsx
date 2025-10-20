export const YoutubeCommunityLoading = () => {
    return (
        <div className="bg-[var(--bg-block)] rounded-xl p-5 animate-pulse">
            <div className="flex items-start gap-3">
                {/* Thumbnail Placeholder */}
                <div className="w-[100px] h-[56px] bg-[var(--loading)] rounded-md" />

                <div className="flex-1 space-y-2">
                    {/* Title */}
                    <div className="h-4 bg-[var(--loading)] rounded w-3/4" />

                    {/* Sub info */}
                    <div className="flex items-center gap-2 mt-2">
                        <div className="h-3 w-20 bg-[var(--loading)] rounded" />
                        <div className="h-3 w-10 bg-[var(--loading)] rounded" />
                        <div className="h-3 w-14 bg-[var(--loading)] rounded" />
                    </div>

                    {/* Likes + Comments */}
                    <div className="flex items-center gap-4 mt-2">
                        <div className="h-3 w-16 bg-[var(--loading)] rounded" />
                        <div className="h-3 w-16 bg-[var(--loading)] rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
};