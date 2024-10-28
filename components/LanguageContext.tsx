import React, { createContext, useContext, useState, ReactNode } from 'react';
import i18n from '@/app/i18n';

interface LanguageContextType {
    language: string;
    changeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<string>(i18n.locale);

    const changeLanguage = (lang: string) => {
        i18n.locale = lang;
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("ERR on context");
    }
    return context;
};
