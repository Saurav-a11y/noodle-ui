const ChatIcon = ({ width, height, fill = "none", ...props }: React.SVGProps<SVGSVGElement> & { width?: number; height?: number; fill?: string }) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill={fill}>
		<path d="M2.598 12.621C1.5 11.7427 1.5 11.0782 1.5 8.25C1.5 5.42175 1.5 4.00725 2.598 3.129C3.6975 2.25 5.4645 2.25 9 2.25C12.5355 2.25 14.3032 2.25 15.4012 3.129C16.4992 4.008 16.5 5.42175 16.5 8.25C16.5 11.0782 16.5 11.7427 15.4012 12.621C14.304 13.5 12.5355 13.5 9 13.5C7.1175 13.5 6.15 14.8035 4.5 15.75V13.341C3.6795 13.2188 3.07575 13.0035 2.598 12.621Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export default ChatIcon;