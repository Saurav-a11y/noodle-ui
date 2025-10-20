// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: "class",
	content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-reddit)', 'sans-serif'],
				reddit: ['var(--font-reddit)', 'sans-serif'],
				noto: ['var(--font-noto)', 'sans-serif'],
				space: ['var(--font-space)', 'sans-serif'],
			}
		},
	},
	plugins: [],
}
export default config