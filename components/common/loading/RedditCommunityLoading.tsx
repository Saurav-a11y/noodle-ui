const RedditCommunityLoading = () => {
	return (
		<div className="bg-white dark:bg-black rounded-xl p-5 animate-pulse">
			<div className="flex items-center gap-3 mb-4">
				<div className="w-10 h-10 bg-gray-300 dark:bg-neutral-700 rounded-full" />
				<div className="flex-1 space-y-1">
					<div className="w-24 h-4 bg-gray-300 dark:bg-neutral-700 rounded" />
					<div className="w-16 h-3 bg-gray-200 dark:bg-neutral-800 rounded" />
				</div>
				<div className="hidden md:block w-24 h-6 bg-gray-200 dark:bg-neutral-800 rounded" />
			</div>

			<div className="h-6 w-3/4 bg-gray-300 dark:bg-neutral-700 rounded mb-2" />
			<div className="h-4 w-full bg-gray-200 dark:bg-neutral-800 rounded mb-1" />
			<div className="h-4 w-5/6 bg-gray-200 dark:bg-neutral-800 rounded mb-4" />

			<div className="relative h-[450px] w-full bg-gray-200 dark:bg-neutral-800 rounded-xl overflow-hidden mb-4" />

			<div className="flex items-center gap-4 text-sm">
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-gray-300 dark:bg-neutral-700 rounded-full" />
					<div className="w-6 h-3 bg-gray-200 dark:bg-neutral-800 rounded" />
					<div className="w-4 h-4 bg-gray-300 dark:bg-neutral-700 rounded-full" />
				</div>
				<div className="flex items-center gap-1">
					<div className="w-4 h-4 bg-gray-300 dark:bg-neutral-700 rounded-full" />
					<div className="w-6 h-3 bg-gray-200 dark:bg-neutral-800 rounded" />
				</div>
				<div className="flex items-center gap-1">
					<div className="w-4 h-4 bg-gray-300 dark:bg-neutral-700 rounded-full" />
					<div className="w-6 h-3 bg-gray-200 dark:bg-neutral-800 rounded" />
				</div>
				<div className="ml-auto w-24 h-4 bg-gray-300 dark:bg-neutral-700 rounded" />
			</div>
		</div>
	)
}

export default RedditCommunityLoading;