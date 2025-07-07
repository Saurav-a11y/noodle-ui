import IconifyIcon from '@/components/common/IconifyIcon';
import { Avatar } from '@radix-ui/themes';
import Link from 'next/link';
import React, { useState } from 'react';
import ReportTweetModal from './ReportTweetModal';
import ImgWithOnError from './ImgWithOnError';
import { Button } from '../ui/Button';
import formatNumberWithDecimal, { formattedDate } from '@/lib/format';

interface TweetInfo {
	symbol: string;
	text: string;
	collection_date: string;
	author_id: string;
	conversation_id: string;
	in_reply_to_user_id: string;
	retweet_count: string;
	like_count: string;
	reply_count: string;
	quote_count: string;
	bookmark_count: string;
	impression_count: string;
	data_type: string;
	name: string;
	profile_image_url: string;
	id: string;
	username: string;
	created_at: string;
	classification?: string;
	verified?: boolean;
}

function TweetList({ tweets, isParseUTC, symbol }: any) {
	const [openReport, setOpenReport] = useState({ open: false, tweet: {} as any });
	return (
		<div className='max-h-[75vh] overflow-y-auto hidden-scrollbar pb-2'>
			{tweets?.map((tweet: TweetInfo, index: number) => (
				<div key={index} className={`border dark:border-gray-500 rounded-xl p-4 ${index !== tweets?.length - 1 ? 'mb-4' : ''}`}>
					<div className='flex items-start justify-between gap-2'>
						<div className='flex gap-2 items-center'>
							<ImgWithOnError
								src={tweet?.profile_image_url || '/avatar.png'}
								alt='avt'
								className='bg-gray-500 size-8 !rounded-full block'
								errImg='/avatar.png'
							/>
							<div>
								<p className='text-sm flex gap-1 items-center'>
									{tweet?.name}{' '}
									{tweet?.verified && <IconifyIcon icon='tabler:rosette-discount-check-filled' className='size-4 text-[#00C2FF]' />}
								</p>
								<p className='text-sm opacity-75'>@{tweet?.username}</p>
							</div>
							{tweet?.data_type && (
								<div className='bg-gray-500 px-2 py-1 text-white text-xs rounded-full mb-auto capitalize'>{tweet?.data_type}</div>
							)}
							{tweet?.classification && (
								<div className='bg-[#775bdd] px-2 py-1 text-white text-xs rounded-full mb-auto capitalize'>{tweet?.classification}</div>
							)}
						</div>
						<Button
							size='sm'
							variant='outline'
							className={'rounded-full shrink-0 dark:bg-black2 border dark:border-grayPrimary'}
							onClick={() => setOpenReport({ open: true, tweet })}
						>
							Report
						</Button>
					</div>

					<div className='text-sm dark:text-[#ffffff] mb-4 break-all custom_tweet' dangerouslySetInnerHTML={{ __html: tweet?.text }}></div>
					<div className='flex flex-wrap gap-2 items-center justify-between'>
						<p className='text-xs opacity-75'>
							{formattedDate(tweet.created_at, 'HH:mm - MMM dd yyyy', isParseUTC)} ·{' '}
							<Link href={`https://x.com/${tweet?.username}/status/${tweet?.id}`} target='_blank' className='text-[#1d9bf0]'>
								Link Twitter
							</Link>
						</p>
						{/* Commented stats section */}
						<div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
							<div className='flex items-center gap-1 text-sm'>
								<IconifyIcon icon='flat-color-icons:like' />{' '}
								<span className='opacity-80'>{formatNumberWithDecimal(tweet?.like_count, 0)}</span>
							</div>
							<div className='flex items-center gap-1 text-sm'>
								<IconifyIcon icon='mdi:comment-outline' className='text-blue-400' />{' '}
								<span className='opacity-80'>{formatNumberWithDecimal(tweet?.reply_count, 0)}</span>
							</div>
							<div className='flex items-center gap-1 text-sm'>
								<IconifyIcon icon='garden:arrow-retweet-stroke-12' className='text-gray-500 dark:text-gray-300' />{' '}
								<span className='opacity-80'>{formatNumberWithDecimal(tweet?.retweet_count, 0)}</span>
							</div>
						</div>
					</div>
				</div>
			))}
			{openReport.open && (
				<ReportTweetModal
					open={openReport.open}
					tweetId={openReport.tweet?.id}
					// symbol={symbol}
					onClose={() => setOpenReport({ open: false, tweet: {} })}
				/>
			)}
		</div>
	);
}

export default TweetList;
