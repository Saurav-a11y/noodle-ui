"use client";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
	isDark: boolean;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme");
		const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const initialDark = storedTheme ? storedTheme === "dark" : systemPrefersDark;
		setIsDark(initialDark);
		document.documentElement.classList.toggle("dark", initialDark);
	}, []);

	const toggleTheme = () => {
		setIsDark((prev) => {
			const newDark = !prev;
			document.documentElement.classList.toggle("dark", newDark);
			localStorage.setItem("theme", newDark ? "dark" : "light");
			return newDark;
		});
	};

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default function useThemeMode() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useThemeMode must be used inside <ThemeProvider>");
	return ctx;
}