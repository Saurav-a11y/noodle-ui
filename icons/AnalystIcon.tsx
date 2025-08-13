const AnalystIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={props?.width || "20"} height={props?.height || "20"} viewBox="0 0 16 16" fill="none">
		<path d="M1.5 2.5H14.5C14.5 2.5 15.5 2.5 15.5 3.5V12.5C15.5 12.5 15.5 13.5 14.5 13.5H1.5C1.5 13.5 0.5 13.5 0.5 12.5V3.5C0.5 3.5 0.5 2.5 1.5 2.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M2.5 10L4.6 6.5L6.5 10L8.5 8L10.5 10L13.5 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export default AnalystIcon;