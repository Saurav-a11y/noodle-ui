const GithubCommunityLoading = () => {
    return (
        <div className="bg-[var(--bg-block)] rounded-xl p-5 animate-pulse">
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--loading)]" />
                    <div className="flex-1 space-y-2">
                        <div className="w-1/3 h-4 bg-[var(--loading)] rounded" />
                        <div className="w-1/4 h-3 bg-[var(--loading)] rounded" />
                    </div>
                    <div className="w-16 h-5 bg-[var(--loading)] rounded-full" />
                </div>

                <div className="space-y-2">
                    <div className="w-5/6 h-4 bg-[var(--loading)] rounded" />
                    <div className="w-3/5 h-4 bg-[var(--loading)] rounded" />
                    <div className="w-1/3 h-3 bg-[var(--loading)] rounded" />
                </div>
            </div>
        </div>
    )
}

export default GithubCommunityLoading;