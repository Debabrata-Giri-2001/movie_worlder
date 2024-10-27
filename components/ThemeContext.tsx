import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
    colors: {
        background: string;
        text: string;
        toggleTrack: string;
        toggleThumb: string;
    };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const colorScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

    useEffect(() => {
        setIsDarkMode(colorScheme === 'dark');
    }, [colorScheme]);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    const theme = {
        isDarkMode,
        toggleTheme,
        colors: {
            background: isDarkMode ? '#121212E5' : '#FFFFFF',
            text: isDarkMode ? '#FFFFFF' : '#121212E5',
            toggleTrack: isDarkMode ? '#7aac95' : '#767577',
            toggleThumb: isDarkMode ? '#32A873' : '#f4f3f4',
        },
    };

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('Error on thems ');
    }
    return context;
};
