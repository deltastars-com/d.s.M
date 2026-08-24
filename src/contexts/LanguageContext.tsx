import React, { createContext, useContext, useState, useCallback } from 'react';

interface LanguageContextType {
  language: 'ar' | 'en';
  isRTL: boolean;
  setLanguage: (lang: 'ar' | 'en') => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ar',
  isRTL: true,
  setLanguage: () => {},
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<'ar' | 'en'>(() => {
    try {
      return (localStorage.getItem('ds_language') as 'ar' | 'en') || 'ar';
    } catch { return 'ar'; }
  });

  const setLanguage = useCallback((lang: 'ar' | 'en') => {
    setLanguageState(lang);
    try { localStorage.setItem('ds_language', lang); } catch {}
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  }, [language, setLanguage]);

  return (
    <LanguageContext.Provider value={{ language, isRTL: language === 'ar', setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
