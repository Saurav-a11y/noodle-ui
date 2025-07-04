// app/fonts.ts
import { Noto_Sans_Display, Reddit_Sans, Space_Grotesk } from "next/font/google";

export const notoSansDisplay = Noto_Sans_Display({
    subsets: ['latin'],
    variable: '--font-noto',
    display: 'swap',
})

export const redditSans = Reddit_Sans({
    subsets: ['latin'],
    variable: '--font-reddit',
    display: 'swap',
})

export const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space',
    display: 'swap',
})
