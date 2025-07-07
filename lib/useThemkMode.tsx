import { useEffect, useState } from 'react';

export default function useThemekMode() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(dark);

        const listener = (e: MediaQueryListEvent) => {
            setIsDark(e.matches);
        };

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);
        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
        };
    }, []);

    return { isDark };
}