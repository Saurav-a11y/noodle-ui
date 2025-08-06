const TwitterCommunityLoading = () => {
	return (
		<div className="rounded-xl bg-white dark:bg-[#1A1A1A] px-4 py-3 shadow-sm animate-pulse">
			<div className="flex justify-between items-start">
				<div className="flex items-center gap-3">
					<div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
					<div className="flex flex-col gap-1">
						<div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
						<div className="h-3 w-20 bg-gray-100 dark:bg-gray-600 rounded" />
					</div>
				</div>
				<div className="h-6 w-24 rounded bg-gray-200 dark:bg-gray-700" />
			</div>

			<div className="mt-3 h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
			<div className="mt-1 h-4 w-2/3 bg-gray-100 dark:bg-gray-600 rounded" />

			<div className="mt-3 flex items-center justify-between text-gray-400 text-xs">
				<div className="flex items-center gap-5">
					{Array(4).fill(0).map((_, i) => (
						<div key={i} className="flex items-center gap-1">
							<div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600" />
							<div className="h-3 w-4 bg-gray-300 dark:bg-gray-600 rounded" />
						</div>
					))}
				</div>
				<div className="h-3 w-12 bg-gray-300 dark:bg-gray-600 rounded" />
			</div>
		</div>
	)
}

export default TwitterCommunityLoading;