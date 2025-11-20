// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: "class",
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./styles/**/*.{css,scss}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-reddit)', 'sans-serif'],
				reddit: ['var(--font-reddit)', 'sans-serif'],
				noto: ['var(--font-noto)', 'sans-serif'],
				space: ['var(--font-space)', 'sans-serif'],
			},
			experimental: {
				optimizeCss: false,
			},
		},
	},
	plugins: [],
}
export default config