import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSwitcher.css';

const SimpleLanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <div className="simple-language-switcher">
      <button 
        className="simple-language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        <span className="simple-language-flag">{currentLanguage.flag}</span>
        <span className="simple-language-code">{currentLanguage.code.toUpperCase()}</span>
      </button>
      
      {isOpen && (
        <div className="simple-language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`simple-language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => {
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              <span className="simple-language-flag">{lang.flag}</span>
              <span className="simple-language-name">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleLanguageSwitcher;