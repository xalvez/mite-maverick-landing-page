import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  const loadAllTranslations = async (lang) => {
    const sections = ['common', 'quote', 'hero']; 
    const loadedTranslations = {};
    
    for (const section of sections) {
      try {
        const response = await import(`../locales/${lang}/${section}.json`);
        loadedTranslations[section] = response.default;
      } catch (error) {
        try {
          const fallback = await import(`../locales/en/${section}.json`);
          loadedTranslations[section] = fallback.default;
        } catch (e) {
          loadedTranslations[section] = {};
        }
      }
    }
    return loadedTranslations;
  };

  const changeLanguage = async (lang) => {
    setLanguage(lang);
    localStorage.setItem('appLanguage', lang);
    
    // Load new translations BEFORE updating the state to prevent disappearing fields
    const newTranslations = await loadAllTranslations(lang);
    setTranslations(newTranslations);
    
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const tSync = (section, key) => {
    return translations[section]?.[key] || key;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage') || 'en';
    const init = async () => {
      const initialData = await loadAllTranslations(savedLanguage);
      setTranslations(initialData);
      setLanguage(savedLanguage);
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLanguage;
    };
    init();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, tSync }}>
      {children}
    </LanguageContext.Provider>
  );
};