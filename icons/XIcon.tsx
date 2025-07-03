const XIcon = (props: React.SVGProps<SVGSVGElement> & { width?: number; height?: number; fill?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 12 12"
		width={props.width || 12}
		height={props.height || 12}
		{...props}
	>
		<path d="M8.84414 1.53125L6.34614 4.38675L4.18614 1.53125H1.05664L4.79514 6.41925L1.25214 10.4688H2.76914L5.50364 7.34375L7.89364 10.4688H10.9446L7.04764 5.31675L10.3601 1.53125H8.84414ZM8.31214 9.56125L2.82764 2.39075H3.72914L9.15214 9.56075L8.31214 9.56125Z" fill={props.fill || 'currentColor'} />
	</svg>
);

export default XIcon;