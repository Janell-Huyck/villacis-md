import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <button onClick={toggleLanguage}>
      {language === 'en' ? 'Español' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;
