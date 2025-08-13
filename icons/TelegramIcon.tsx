const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={props?.width || "20"} height={props?.height || "20"} viewBox="0 0 12 12" fill="none">
		<g clipPath="url(#clip0_2274_128738)">
			<path d="M11.0258 1.06402L0.394389 5.18494C-0.0334388 5.37684 -0.178142 5.76115 0.290983 5.96972L3.0184 6.84096L9.61297 2.74432C9.97304 2.48714 10.3417 2.55572 10.0245 2.83863L4.36062 7.99336L4.18271 10.1748C4.3475 10.5116 4.64923 10.5132 4.8417 10.3458L6.40869 8.85544L9.0924 10.8754C9.71572 11.2464 10.0549 11.007 10.189 10.3271L11.9493 1.94895C12.132 1.11211 11.8204 0.743391 11.0258 1.06402Z" fill="currentColor" />
		</g>
		<defs>
			<clipPath id="clip0_2274_128738">
				<rect width="12" height="12" fill="white" />
			</clipPath>
		</defs>
	</svg>
);

export default TelegramIcon;