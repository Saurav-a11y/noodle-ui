// import { useAppDispatch } from '@/hooks';
// import { reportTweet } from '@/store/community/communitySlice';
// import { isSuccessResponse } from '@/types/common/response-dto';
import React, { useState } from 'react';
// import toast from 'react-hot-toast';
import { Button } from '../../../components/ui/Button';
import ModalCommon from './ModalCommon';

interface ReportTweetModalProps {
	open: boolean;
	tweetId?: string;
	// symbol?: string;
	onClose: () => void;
}

const ReportTweetModal: React.FC<ReportTweetModalProps> = ({ open, tweetId,
	// symbol, 
	onClose }) => {
	// const dispatch = useAppDispatch();
	const [reportReason, setReportReason] = useState<string>('wrong_keyword');
	const [additionalReason, setAdditionalReason] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	// const [isLoading, setIsLoading] = useState<boolean>(false);

	const reasons = [
		{ id: 'wrong_keyword', label: 'Tweet is not relevant or mentions wrong keyword' },
		{ id: 'want_exclude', label: 'Tweet owner wants to exclude the tweet' },
		{ id: 'others', label: 'Others' }
	];

	const validateForm = (value: string = additionalReason) => {
		if (reportReason === 'others') {
			if (!value.trim()) return 'Please provide additional details if you selected "Others".';
			if (value.length > 200) return 'Additional details cannot exceed 200 characters.';
		}
		return null;
	};

	const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setAdditionalReason(value);
		if (isSubmitted) {
			setError(validateForm(value));
		}
	};

	const handleSubmit = async () => {
		setIsSubmitted(true);
		// const validationError = validateForm();
		// if (validationError) {
		// 	setError(validationError);
		// 	return;
		// }
		// try {
		// 	setIsLoading(true);
		// 	const enumReason = {
		// 		wrong_keyword: 'Tweet is not relevant or mentions wrong keyword',
		// 		want_exclude: 'Tweet owner wants to exclude the tweet',
		// 		others: additionalReason
		// 	}
		// 	const result = await dispatch(reportTweet({ symbol, tweetId, reason: enumReason[reportReason as keyof typeof enumReason] }));
		// 	if (isSuccessResponse(result.payload)) {
		// 		toast.success("Thank you for your report. Our team will review it and improve the algorithm accordingly.")
		// 		handleClose();
		// 	} else {
		// 		const message = typeof result.payload.data === 'string' ? result.payload.data : result.payload.message;
		// 		toast.error(message || "Something went wrong. Please try again!");
		// 	}
		// } catch (error) {
		// 	console.log(" handleSubmit error:", error);
		// } finally {
		// 	setIsLoading(false);
		// }
	};

	// const handleClose = () => {
	// 	setReportReason('wrong_keyword');
	// 	setAdditionalReason('');
	// 	setError(null);
	// 	setIsSubmitted(false);
	// 	onClose();
	// }

	return (
		<ModalCommon
			open={open}
			onOpenChange={onClose}
			title={`Report Tweet ${tweetId}`}
			classNameContent='sm:w-full w-[96vw]'
		>
			<div className='max-h-[75vh] overflow-y-auto space-y-5 hidden-scrollbar pb-2'>
				<p className='font-medium'>Why are you reporting this tweet?</p>
				<div className='space-y-3'>
					{reasons.map(({ id, label }) => (
						<div key={id} className='flex items-center space-x-3'>
							<input
								type='radio'
								id={id}
								name='reportReason'
								value={id}
								checked={reportReason === id}
								onChange={(e) => setReportReason(e.target.value)}
							/>
							<label htmlFor={id} className='text-sm cursor-pointer'>{label}</label>
						</div>
					))}
					{reportReason === 'others' && (
						<div>
							<textarea
								placeholder='Please provide more details (if applicable)'
								rows={4}
								className='w-full border rounded-lg p-2 text-sm'
								onChange={handleTextareaChange}
								value={additionalReason}
							></textarea>
							{error && <p className='text-red-500 text-xs'>{error}</p>}
						</div>
					)}
					<Button
						// isLoading={isLoading}
						// disabled={isLoading}
						onClick={handleSubmit}
						className='w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition'
					>
						Submit Report
					</Button>
				</div>
			</div>
		</ModalCommon>
	);
};

export default ReportTweetModal;