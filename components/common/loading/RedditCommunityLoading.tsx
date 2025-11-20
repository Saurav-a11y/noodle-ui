const RedditCommunityLoading = () => {
	return (
		<div className="bg-[var(--bg-block)] rounded-xl p-5 animate-pulse">
			<div className="flex items-center gap-3 mb-4">
				<div className="w-10 h-10 bg-[var(--loading)] rounded-full" />
				<div className="flex-1 space-y-1">
					<div className="w-24 h-4 bg-[var(--loading)] rounded" />
					<div className="w-16 h-3 bg-[var(--loading)] rounded" />
				</div>
				<div className="hidden md:block w-24 h-6 bg-[var(--loading)] rounded" />
			</div>

			<div className="h-6 w-3/4 bg-[var(--loading)] rounded mb-2" />
			<div className="h-4 w-full bg-[var(--loading)] rounded mb-1" />
			<div className="h-4 w-5/6 bg-[var(--loading)] rounded mb-4" />

			<div className="relative h-[450px] w-full bg-[var(--loading)] rounded-xl overflow-hidden mb-4" />

			<div className="flex items-center gap-4 text-sm">
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-[var(--loading)] rounded-full" />
					<div className="w-6 h-3 bg-[var(--loading)] rounded" />
					<div className="w-4 h-4 bg-[var(--loading)] rounded-full" />
				</div>
				<div className="flex items-center gap-1">
					<div className="w-4 h-4 bg-[var(--loading)] rounded-full" />
					<div className="w-6 h-3 bg-[var(--loading)] rounded" />
				</div>
				<div className="flex items-center gap-1">
					<div className="w-4 h-4 bg-[var(--loading)] rounded-full" />
					<div className="w-6 h-3 bg-[var(--loading)] rounded" />
				</div>
				<div className="ml-auto w-24 h-4 bg-[var(--loading)] rounded" />
			</div>
		</div>
	)
}

export default RedditCommunityLoading;