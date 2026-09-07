import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { ThemeMode } from '@/types';

interface ThemeContextType {
    theme: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: { mode: 'light' },
    toggleTheme: () => { },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeMode>({ mode: 'light' });

    useEffect(() => {
        const stored = localStorage.getItem('omni360-theme') as 'light' | 'dark' | null;
        if (stored) setTheme({ mode: stored });
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme.mode);
        localStorage.setItem('omni360-theme', theme.mode);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => ({ mode: prev.mode === 'dark' ? 'light' : 'dark' }));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
