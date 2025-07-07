import { VisuallyHidden } from '@radix-ui/themes';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/modalCommonStyles.scss';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/Dialog';

export function isIOS() {
	return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

interface ModalCommonProps {
	open: boolean;
	onOpenChange: (value: boolean) => void;
	isMiniApp?: boolean;
	title?: React.ReactNode | string;
	onInteractOutside?: () => void;
	handleClose?: () => void;
	onOpenAutoFocus?: (e: any) => void;
	children: React.ReactNode;
	onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
	classNameTMA?: string;
	classNameChildren?: string;
	classNameChildrenTMA?: string;
	classNameContent?: string;
	classNameHeader?: string;
	height?: string;
	isCenterTitle?: boolean;
	isEnabledKeyboard?: boolean;
}

const hiddenComponent = (
	<VisuallyHidden>
		<DialogTitle></DialogTitle>
		<DialogDescription></DialogDescription>
	</VisuallyHidden>
);

export default function ModalCommon({
	open,
	onOpenChange,
	isMiniApp = false,
	title = '',
	onInteractOutside,
	handleClose = () => { },
	children,
	classNameTMA = '',
	classNameChildren = '',
	classNameChildrenTMA = '',
	classNameContent = '',
	classNameHeader = '',
	height = 'auto',
	onScroll = () => { },
	isCenterTitle = false,
	isEnabledKeyboard = false,
	onOpenAutoFocus
}: ModalCommonProps) {
	const onClose = () => {
		handleClose();
		onOpenChange(false);
	};

	const titleComponent = (
		<div
			className={cn('text-lg font-bold font-reddit', {
				'text-center': isCenterTitle,
			})}
		>
			{title}
		</div>
	);

	const header = (
		<div
			className={cn(
				'relative',
				{
					'py-4': isMiniApp,
					'flex justify-end': !title,
				},
				classNameHeader,
			)}
		>
			{title !== '' && titleComponent}
		</div>
	);

	useEffect(() => {
		if (isMiniApp) {
			const hideScroll = () => {
				const overlay = document.getElementById('overlay');
				if (overlay) {
					document.body.removeChild(overlay);
				}
				document.body.style.overflow = '';
			};
			if (open) {
				// Hiển thị lớp phủ
				const overlay = document.createElement('div');
				overlay.id = 'overlay';
				overlay.style.position = 'fixed';
				overlay.style.top = '0';
				overlay.style.left = '0';
				overlay.style.width = '100%';
				overlay.style.height = '100%';
				overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
				overlay.style.zIndex = '99998';
				document.body.appendChild(overlay);
				document.body.style.overflow = 'hidden';
			} else {
				hideScroll();
			}
			return () => {
				hideScroll();
			};
		}
	}, [isMiniApp, open]);

	useEffect(() => {
		if (isMiniApp) {
			document.documentElement.style.setProperty('--tma-dialog-height', `${height}`);
		}
	}, [isMiniApp, height]);

	return (
		<>
			{isMiniApp ? (
				open ? (
					createPortal(
						<div className='fixed inset-0 z-[99999] bg-[#0D131B]/70'>
							<div className='absolute inset-0 ' onClick={onClose}></div>
							<div
								style={{
									boxShadow: '0 -3px 0px -1px var(--purpleTMA-color), 0 -2px 70px -1px var(--purpleTMA-color)',
								}}
								className={cn(
									`bottom-0 pb-[80px] bg-[#25272E] px-5 rounded-t-[20px] text-white text-[14px] leading-[17px] fixed left-0 right-0  z-[99999]`,
									{
										'slide-up': open,
										'slide-down': !open,
										'bottom-[100px] pb-[40px]': isEnabledKeyboard && isIOS(),
										// 'bottom-0 pb-[80px]': !isEnabledKeyboard,
									},
									classNameTMA,
								)}
							>
								{header}
								<div className={cn('h-full hidden-scrollbar overflow-y-auto max-h-full', classNameChildrenTMA)} onScroll={onScroll}>
									{children}
								</div>
							</div>
						</div>,
						document.body,
					)
				) : (
					<></>
				)
			) : (
				<Dialog open={open} onOpenChange={onClose}>
					<DialogContent
						onInteractOutside={(e) => {
							e.preventDefault();
							if (onInteractOutside) {
								onInteractOutside();
							} else {
								onClose();
							}
						}}
						className={cn('dialog-common-content p-3 md:p-5', classNameContent)}
						onOpenAutoFocus={onOpenAutoFocus}
					>
						{hiddenComponent}
						{header}
						<div className={cn('rounded-[20px]', classNameChildren)}>{children}</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
