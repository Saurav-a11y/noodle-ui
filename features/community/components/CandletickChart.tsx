'use client';

// import IconifyIcon from '@/components/common/IconifyIcon';
// import PremiumFeatureLink, { PremiumFeatureLinkRef } from '@/components/common/PremiumFeatureLink';
// import { useAppDispatch, useAppSelector } from '@/hooks';
// import useAuthenticate from '@/hooks/useAuthenticate';
// import { getPriceHistory, resetPriceHistory } from '@/store/community/communitySlice';
import { format, getTime, parseISO, subDays, subMonths, subWeeks } from 'date-fns';
import { ColorType, createChart, PriceScaleMode } from 'lightweight-charts';
import { forEach, isEmpty, map } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '@/styles/chartStyles.scss';
// import TweetList from './TweetList';
// import formatNumberWithDecimal from '@/lib/format';
import ModalCommon from './ModalCommon';
import { tweets } from './fakeData';
import TweetList from './TweetList';
import { formattedDate } from '@/lib/format';
import useThemekMode from '@/lib/useThemkMode';
import { usePriceHistory } from '../hooks/usePriceHistory';
import { useParams } from 'next/navigation';

// const COMMUNITIES_STATUS = {
// 	LISTED: 'listed',
// 	UNLISTED: 'unlisted',
// };

const platforms = [
	{ name: "All", active: true },
	{ name: "Twitter", active: false },
	{ name: "Reddit", active: false },
	{ name: "Github", active: false },
	{ name: "Youtube", active: false },
];

interface TweetInfo {
	author_id: string;
	bookmark_count: string;
	collection_date: string;
	conversation_id: string;
	created_at: string;
	data_type: 'reply' | 'quote' | 'retweet' | 'tweet';
	impression_count: string;
	in_reply_to_user_id: string;
	name: string;
	profile_image_url: string;
	quote_count: string;
	reply_count: string;
	retweet_count: string;
	symbol: string;
	text: string;
	user_id: string;
	id: string;
	verified?: boolean;
	classification?: string;
	'xt.username': string;
	'xt.id': string;
	'xt.like_count': string;
}

interface PricePoint {
	open: number;
	high: number;
	low: number;
	close: number;
	time: number;
}

const barsInTimeFrame = {
	'1D': 24 * 2,
	'3D': 24 * 7,
	'7D': 24 * 14,
	'1M': 24 * 30,
};

const CandlestickChart = ({
	symbol,
	// status 
}: {
	symbol?: string;
	// status?: string 
}) => {
	// const dispatch = useAppDispatch();
	// const {
	// 	priceHistory: { data: priceHistoryToken, isLoading, tweets },
	// } = useAppSelector((state) => state.community);
	const params = useParams();
	const communityId = params?.slug as string;
	const { isDark } = useThemekMode();
	const now = useMemo(() => new Date(), []);
	const startTime = useMemo(() => getTime(subMonths(now, 1)), [now]);
	const endTime = useMemo(() => getTime(now), [now]);

	const { data: priceHistoryToken, isLoading, error } = usePriceHistory({
		symbol: communityId,
		startTime,
		endTime,
		interval: '1M',
	});
	console.log("🚀 ~ data:", priceHistoryToken)
	// const premiumRef = useRef<PremiumFeatureLinkRef>(null);

	// ✅ State lưu thời gian từ
	const [selectedTimeFrame, setSelectedTimeFrame] = useState('3D');
	const limitTweetNormalUser = 5;

	const chartContainerRef = useRef<HTMLDivElement>(null);
	const markerContainerRef = useRef<HTMLDivElement>(null);
	const [chartInstance, setChartInstance] = useState<{ chart: any; candlestickSeries: any; formattedData: PricePoint[] } | null>(null);
	const markerRefs = useRef<Map<string, HTMLDivElement>>(new Map());
	// const [hoveredCandle, setHoveredCandle] = useState<{ open: number; high: number; low: number; close: number; color: string } | null>(
	// 	null,
	// );
	// State for platforms
	const [platformsState, setPlatformsState] = useState(platforms);

	const handlePlatformClick = (name: string) => {
		setPlatformsState((prev) =>
			prev.map((p) => ({ ...p, active: p.name === name }))
		);
	};

	const [activeHourTweets, setActiveHourTweets] = useState<TweetInfo[]>([]);
	const [isShowModalTweet, setIsShowModalTweet] = useState(false);

	// const formattedDate = (date: string, regex = 'HH:mm - MMM dd yyyy') => {
	// 	const parsedDate = parseISO(date);
	// 	return format(
	// 		new Date(
	// 			parsedDate.getUTCFullYear(),
	// 			parsedDate.getUTCMonth(),
	// 			parsedDate.getUTCDate(),
	// 			parsedDate.getUTCHours(),
	// 			parsedDate.getUTCMinutes(),
	// 		),
	// 		regex,
	// 	);
	// };

	const applyMultipleMarkerStyle = useCallback((element: HTMLElement) => {
		Object.assign(element.style, {
			backgroundColor: isDark ? '#1A1A1A' : '#ffffff',
			border: '1px solid #B1B1B1',
			boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		});
	}, [isDark]);

	// useEffect(() => {
	// 	dispatch(
	// 		getPriceHistory({
	// 			symbol,
	// 			startTime: getTime(subMonths(now, 1)),
	// 			endTime: currentTimestamp,
	// 			interval: '1M',
	// 		}),
	// 	);
	// 	return () => {
	// 		dispatch(resetPriceHistory());
	// 	};
	// }, []);

	useEffect(() => {
		if (!chartContainerRef.current) return;
		if (!priceHistoryToken) return;
		// Tạo biểu đồ
		const chart = createChart(chartContainerRef.current, {
			layout: {
				textColor: '#222222',
				background: { type: ColorType.Solid, color: '#ffffff' },
			},
			grid: {
				vertLines: { color: isDark ? '#1A1A1A' : '#E8E8E8' },
				horzLines: { color: isDark ? '#1A1A1A' : '#E8E8E8', visible: true },
			},
			width: chartContainerRef.current.clientWidth,
			height: 500,
		});

		const candlestickSeries = chart?.addCandlestickSeries({
			wickUpColor: 'rgb(22, 199, 132)',
			upColor: 'rgb(22, 199, 132)',
			wickDownColor: 'rgb(234, 57, 67)',
			downColor: 'rgb(234, 57, 67)',
			borderVisible: false,
		});

		const formattedData = map(priceHistoryToken, (item) => ({
			open: item.o,
			high: item.h,
			low: item.l,
			close: item.c,
			time: Math.floor(item.unixTime) as any,
		})).sort((a, b) => a.time - b.time);

		candlestickSeries.setData(formattedData);
		chart.timeScale().applyOptions({
			timeVisible: true,
			borderVisible: false,
		});
		chart.priceScale('right').applyOptions({
			mode: PriceScaleMode.Normal, // Giữ giá trị chính xác
			autoScale: true,
			borderVisible: false,
			alignLabels: true,
			ticksVisible: true,
			scaleMargins: {
				top: 0.05,
				bottom: 0.05,
			},
		});
		const desiredBars = barsInTimeFrame[selectedTimeFrame as keyof typeof barsInTimeFrame];
		const chartWidth = chart.timeScale().width();
		chart.applyOptions({
			layout: {
				background: { color: isDark ? '#100F11' : '#fff' }, // Màu nền
				textColor: isDark ? '#ffffff' : '#000000',
			},
			timeScale: {
				rightOffset: 15, // Thêm padding bên phải
				barSpacing: (chartWidth - 92) / desiredBars, // Khác với option vì lần đầu render. Tăng khoảng cách giữa các cột nếu có ít dữ liệu
				// minBarSpacing: 10, // Giới hạn zoom out tối đa (càng lớn thì zoom out càng ít)
				// timeVisible: true,
				// tickMarkFormatter: (time: number) => {
				//   const date = new Date(time * 1000);
				//   return format(date, 'dd MMM');
				// },
			},
			localization: {
				locale: 'en-US',
				// dateFormat: 'dd MMM yyyy',
			},
		});
		// candlestickSeries.priceFormatter().format = (price: number): string => price.toFixed(6);
		candlestickSeries.priceFormatter().format = (price: number): string => price.toFixed(2);
		setChartInstance({ chart, candlestickSeries, formattedData });

		return () => {
			chart.remove();
		};
	}, [selectedTimeFrame, isDark, priceHistoryToken]);

	// Cập nhật vị trí markers khi zoom/pan
	useEffect(() => {
		if (!chartInstance) return;
		const { chart, candlestickSeries, formattedData } = chartInstance;

		// Xóa tất cả marker hiện tại
		if (markerContainerRef.current) {
			while (markerContainerRef.current.firstChild) {
				markerContainerRef.current.removeChild(markerContainerRef.current.firstChild);
			}
		}

		// Reset các tham chiếu marker
		markerRefs.current = new Map();

		let timeDifferenceInSeconds = 3600;
		// Lấy khoảng cách giữa 2 nến
		const firstCandle = formattedData[0];
		const secondCandle = formattedData[1];
		if (secondCandle?.time && firstCandle?.time) {
			timeDifferenceInSeconds = secondCandle?.time - firstCandle?.time;
		}

		// Nhóm tweet theo giờ (sử dụng timestamp làm khóa)
		const tweetsByTimeInterval = new Map<number, TweetInfo[]>();

		// Phân loại tweet theo giờ
		forEach(tweets, (tweet) => {
			const tweetTimestamp = Math.floor(new Date(tweet.created_at).getTime() / 1000);
			// Round down to the nearest interval
			const intervalTimestamp = Math.floor(tweetTimestamp / timeDifferenceInSeconds) * timeDifferenceInSeconds;

			if (!tweetsByTimeInterval.has(intervalTimestamp)) {
				tweetsByTimeInterval.set(intervalTimestamp, []);
			}
			tweetsByTimeInterval.get(intervalTimestamp)?.push(tweet as any);
		});

		let accessibleCount = 0; // Count accessible tweets
		// Tạo marker nhóm cho mỗi giờ
		tweetsByTimeInterval.forEach((tweetsInInterval, intervalTimestamp) => {
			if (tweetsInInterval.length === 0) return;
			const isAccessible = accessibleCount < limitTweetNormalUser;
			if (isAccessible) {
				accessibleCount++;
			}

			// Tìm điểm giá gần nhất với giờ này
			const closestPricePoint = formattedData.reduce((prev: PricePoint, curr: PricePoint) => {
				return Math.abs(curr.time - intervalTimestamp) < Math.abs(prev.time - intervalTimestamp) ? curr : prev;
			}, formattedData[0]);

			if (!closestPricePoint) return;

			// Tạo marker nhóm
			const groupMarkerElement = document.createElement('div');
			const groupId = `hour-group-${intervalTimestamp}`;
			groupMarkerElement.id = groupId;
			groupMarkerElement.className = 'tweet-group-marker';
			groupMarkerElement.style.position = 'absolute';
			groupMarkerElement.style.cursor = 'pointer';
			groupMarkerElement.style.pointerEvents = 'auto';

			const iconMarkup = document.createElement('div');
			iconMarkup.className = 'tweet-icon-wrapper';
			iconMarkup.style.position = 'relative';
			iconMarkup.style.width = '28px';
			iconMarkup.style.height = '28px';
			iconMarkup.style.borderRadius = '50%';

			if (tweetsInInterval.length === 1 && isAccessible) {
				// Single tweet and accessible
				const tweet = tweetsInInterval[0];
				iconMarkup.innerHTML = `
          <img 
            src="${tweet?.profile_image_url}" 
            onerror="this.onerror=null; this.src='/avatar.png';" 
            class="marker-avatar" 
            style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid #B1B1B1; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); object-fit: cover;" 
            alt="${tweet?.['xt.username']}"
          />
        `;
			} else if (isAccessible) {
				// Multiple tweets and accessible
				applyMultipleMarkerStyle(iconMarkup);

				// Icon
				iconMarkup.innerHTML = `
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m17.687 3.063l-4.996 5.711l-4.32-5.711H2.112l7.477 9.776l-7.086 8.099h3.034l5.469-6.25l4.78 6.25h6.102l-7.794-10.304l6.625-7.571zm-1.064 16.06L5.654 4.782h1.803l10.846 14.34z"/></svg>
        `;
			} else {
				// Premium locked content
				applyMultipleMarkerStyle(iconMarkup);

				// Lock icon for premium-locked content
				iconMarkup.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path fill="currentColor" d="M24.875 15.334v-4.876c0-4.894-3.98-8.875-8.875-8.875s-8.875 3.98-8.875 8.875v4.876H5.042v15.083h21.916V15.334zm-14.25-4.876c0-2.964 2.41-5.375 5.375-5.375s5.375 2.41 5.375 5.375v4.876h-10.75zm7.647 16.498h-4.545l1.222-3.667a2.37 2.37 0 0 1-1.325-2.12a2.375 2.375 0 1 1 4.75 0c0 .932-.542 1.73-1.324 2.12z"/></svg>
        `;
			}

			// Count badge
			if (tweetsInInterval.length > 1 && isAccessible) {
				const countBadge = document.createElement('div');
				countBadge.style.position = 'absolute';
				countBadge.style.top = '-11px';
				countBadge.style.right = '-8px';
				countBadge.style.backgroundColor = isDark ? '#ffffff' : '#000000';
				countBadge.textContent = `+${tweetsInInterval.length.toString()}`;
				countBadge.style.fontSize = '10px';
				countBadge.style.fontWeight = 'bold';
				countBadge.style.height = '18px';
				countBadge.style.width = 'auto';
				countBadge.style.minWidth = '18px';
				countBadge.style.padding = '0 4px';
				countBadge.style.borderRadius = '9px';
				countBadge.style.display = 'flex';
				countBadge.style.alignItems = 'center';
				countBadge.style.justifyContent = 'center';
				countBadge.style.border = '1px solid #B1B1B1';
				countBadge.style.color = isDark ? '#000000' : '#ffffff';
				countBadge.style.boxSizing = 'border-box';
				countBadge.style.whiteSpace = 'nowrap';

				iconMarkup.appendChild(countBadge);
			}

			groupMarkerElement.appendChild(iconMarkup);

			// Thêm sự kiện khi click vào marker
			groupMarkerElement.addEventListener('click', (event) => {
				event.stopPropagation();
				if (isAccessible) {
					setActiveHourTweets(tweetsInInterval);
					setIsShowModalTweet(true);
				}
				// else {
				// 	if (premiumRef.current) {
				// 		premiumRef.current.checkPremiumStatus(); // Gọi hàm qua ref
				// 	}
				// }
			});

			// Hiệu ứng hover
			groupMarkerElement.addEventListener('mouseenter', () => {
				groupMarkerElement.style.transform = 'scale(1.1)';
				groupMarkerElement.style.zIndex = '10';
			});

			groupMarkerElement.addEventListener('mouseleave', () => {
				groupMarkerElement.style.transform = 'scale(1)';
				groupMarkerElement.style.zIndex = '1';
			});

			// Thêm marker vào container
			if (markerContainerRef.current) {
				markerContainerRef.current.appendChild(groupMarkerElement);
			}
			markerRefs.current.set(groupId, groupMarkerElement);
		});
		// Hàm cập nhật vị trí marker khi chart thay đổi
		const updateMarkerPositions = () => {
			const timeRange = chart.timeScale().getVisibleRange();
			if (!timeRange) return;

			// Thiết lập một khoảng đệm nhỏ để hiển thị tweet ngay cả khi chúng ở gần cạnh màn hình
			const padding = 3600 * 6; // 6 giờ đệm mỗi bên

			// Kiểm tra tất cả các marker và ẩn các marker ngoài vùng nhìn thấy
			tweetsByTimeInterval.forEach((tweetsInHour, hourTimestamp) => {
				const groupId = `hour-group-${hourTimestamp}`;
				const markerElement = markerRefs.current.get(groupId);
				// Ẩn marker nếu nằm ngoài vùng nhìn thấy
				if (hourTimestamp < timeRange.from - padding || hourTimestamp > timeRange.to + padding) {
					if (markerElement) {
						markerElement.style.display = 'none';
					}
					return;
				}

				// Nếu marker nằm trong vùng nhìn thấy, tiếp tục xử lý như bình thường
				const hourX = chart.timeScale().timeToCoordinate(hourTimestamp);
				if (hourX === null) {
					if (markerElement) markerElement.style.display = 'none';
					return;
				}

				// Tìm điểm giá cho giờ này
				const closestPricePoint = formattedData.find(
					(p) => Math.abs(p.time - hourTimestamp) < 1800, // Tìm điểm giá trong vòng 30 phút
				);

				if (!closestPricePoint) {
					if (markerElement) markerElement.style.display = 'none';
					return;
				}

				// Tính vị trí Y dựa trên giá trị cao
				const y = candlestickSeries.priceToCoordinate(closestPricePoint.high);
				if (y === null) {
					if (markerElement) markerElement.style.display = 'none';
					return;
				}

				// Hiển thị và cập nhật vị trí marker
				if (markerElement) {
					markerElement.style.display = 'block';
					markerElement.style.left = `${hourX}px`;
					markerElement.style.top = `${y - 35}px`; // Hiển thị phía trên cây nến
					markerElement.style.transition = 'transform 0.2s ease';
				}
			});
		};

		// Đăng ký các sự kiện cập nhật vị trí khi chart thay đổi
		chart.timeScale().subscribeVisibleTimeRangeChange(updateMarkerPositions);
		chart.timeScale().subscribeVisibleLogicalRangeChange(updateMarkerPositions);

		// Cập nhật vị trí ban đầu
		setTimeout(updateMarkerPositions, 100);

		return () => {
			chart.timeScale().unsubscribeVisibleTimeRangeChange(updateMarkerPositions);
			chart.timeScale().unsubscribeVisibleLogicalRangeChange(updateMarkerPositions);
		};
	}, [chartInstance, selectedTimeFrame, isDark, applyMultipleMarkerStyle]);

	useEffect(() => {
		if (!chartInstance) return;
		const { chart, candlestickSeries, formattedData } = chartInstance;

		if (formattedData.length > 0) {
			// const latestCandle = formattedData[formattedData.length - 1]; // Cây nến mới nhất

			// setHoveredCandle({
			// 	open: latestCandle.open,
			// 	high: latestCandle.high,
			// 	low: latestCandle.low,
			// 	close: latestCandle.close,
			// 	color: latestCandle.close >= latestCandle.open ? 'text-green-500' : 'text-red-500',
			// });
		}

		const handleCrosshairMove = (param: any) => {
			if (!param || !param.seriesData) return;

			// Lấy dữ liệu của cây nến đang hover
			const candlestickData = param.seriesData.get(candlestickSeries);
			if (!candlestickData) return;

			// Cập nhật state với giá trị mới
			// setHoveredCandle({
			// 	open: candlestickData.open,
			// 	high: candlestickData.high,
			// 	low: candlestickData.low,
			// 	close: candlestickData.close,
			// 	color: candlestickData.close >= candlestickData.open ? 'text-green-500' : 'text-red-500',
			// });
		};

		chart.subscribeCrosshairMove(handleCrosshairMove);

		return () => {
			chart.unsubscribeCrosshairMove(handleCrosshairMove);
		};
	}, [chartInstance]);

	const renderTweetTitle = (list: TweetInfo[]) => {
		if (isEmpty(list)) return 'No tweet';
		const count = list.length;
		const time = formattedDate(list[0].created_at || '', count > 1 ? 'HH:00 - MMM dd yyyy' : undefined);
		return `${count} ${count === 1 ? 'tweet' : 'tweets'} posted at ${time}`;
	};

	const handleTimeFrameChange = (timeFrame: '1D' | '3D' | '7D' | '1M') => {
		if (!chartInstance) return;
		const { chart } = chartInstance;
		setSelectedTimeFrame(timeFrame);
		if (timeFrame === '1M') {
			chart.timeScale().applyOptions({
				rightOffset: 30,
			});
			return chart.timeScale().fitContent();
		} else {
			chart.timeScale().applyOptions({
				rightOffset: 15,
			});
		}
		const desiredBars = barsInTimeFrame[timeFrame];
		const chartWidth = chart.timeScale().width();
		const newBarSpacing = chartWidth / desiredBars;

		chart.timeScale().applyOptions({
			barSpacing: newBarSpacing,
		});

		chart.timeScale().scrollToRealTime();
	};

	return (
		<div>
			<div className='flex items-center gap-x-6 gap-y-3 mb-4 flex-wrap  justify-between gap-1'>
				<div className="flex items-center gap-2">
					{platformsState.map((platform) => (
						<button
							key={platform.name}
							className={`px-3 py-1.5 rounded text-xs font-reddit cursor-pointer font-medium transition-colors ${platform.active
								? "bg-[#DDF346] text-[#222]"
								: "border border-[#DDF346] hover:bg-[#F4F4F5] dark:hover:bg-[#313131]"
								}`}
							onClick={() => handlePlatformClick(platform.name)}
						>
							{platform.name}
						</button>
					))}
				</div>
				<div className='flex items-center bg-[#F9F9F9] dark:bg-[#313131] p-1.5 rounded'>
					{['1D', '3D', '7D', '1M'].map((timeFrame) => (
						<button
							key={timeFrame}
							onClick={() => handleTimeFrameChange(timeFrame as any)}
							className={`px-2.5 py-1 rounded cursor-pointer text-xs font-reddit font-medium transition-colors ${selectedTimeFrame === timeFrame ? 'bg-[#DDF346] rounded-md text-[#222]' : 'hover:bg-[#F4F4F5] dark:hover:bg-[#313131]'
								}`}
						>
							{timeFrame}
						</button>
					))}
				</div>
				{/* {hoveredCandle && (
					<div className='flex justify-center items-center gap-2 text-xs sm:text-sm font-medium py-2 flex-wrap'>
						<p>
							O <span className={hoveredCandle.color}>{formatNumberWithDecimal(hoveredCandle.open, 8)}</span>
						</p>
						<p>
							H <span className={hoveredCandle.color}>{formatNumberWithDecimal(hoveredCandle.high, 8)}</span>
						</p>
						<p>
							L <span className={hoveredCandle.color}>{formatNumberWithDecimal(hoveredCandle.low, 8)}</span>
						</p>
						<p>
							C <span className={hoveredCandle.color}>{formatNumberWithDecimal(hoveredCandle.close, 8)}</span>
						</p>
					</div>
				)} */}
			</div>
			<div style={{ position: 'relative' }}>
				{/* ✅ Hiển thị loading overlay nếu đang fetch data */}
				{/* {isLoading && (
					<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[3] rounded-2xl border dark:border-borderPrimary flex-col gap-3'>
						<div className='w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin'></div>
						<div>
							<p className='text-white text-center text-lg font-semibold'>Loading Data</p>
							<p className='text-white text-center'>Please wait a moment</p>
						</div>
					</div>
				)} */}
				{/* {!isLoading && !priceHistoryToken.length && (
					<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[3] rounded-2xl border dark:border-borderPrimary flex-col gap-3'>
						<div className='w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin'></div>
						<IconifyIcon icon='vaadin:line-bar-chart' className='size-10' />
						<div>
							<p className='text-white text-center text-lg font-semibold'>
								{status === COMMUNITIES_STATUS.UNLISTED ? 'Coming Soon - Price will be announced later' : 'No Price Available'}
							</p>
						</div>
					</div>
				)} */}
				<div
					ref={chartContainerRef}
					id='chart'
					className='w-full h-[500px] rounded-2xl'
					style={{ overflow: 'hidden' }}
				/>
				<div
					ref={markerContainerRef}
					id='marker-container'
					className='z-[2] absolute top-0 left-0 h-full'
					style={{ overflow: 'hidden', width: 'calc(100% - 85px)', pointerEvents: 'none' }}
				/>
			</div>
			{/* <PremiumFeatureLink ref={premiumRef} showLink={false} /> */}
			<ModalCommon
				open={isShowModalTweet}
				onOpenChange={setIsShowModalTweet}
				title={renderTweetTitle(activeHourTweets)}
				classNameChildren='overflow-y-auto overflow-x-hidden rounded-none hidden-scrollbar max-h-[80vh]'
				classNameContent='sm:w-full w-[96vw] max-w-screen-sm'
			>
				<TweetList tweets={activeHourTweets || []} isParseUTC symbol={symbol} />
			</ModalCommon>
		</div>
	);
};

export default CandlestickChart;
