import type { Metadata } from "next";
import "../styles/globals.css";
import { notoSansDisplay, redditSans, spaceGrotesk } from "./fonts";
import ReactQueryProvider from '@/lib/react-query-provider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Noodle",
  description: "Your ultimate crypto research assistant powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${notoSansDisplay.variable} ${redditSans.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* ✅ Thêm đoạn script inline để theme áp dụng ngay khi HTML render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ReactQueryProvider>
          <Toaster position="top-center" />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
