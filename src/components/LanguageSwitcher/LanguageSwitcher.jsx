import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { LanguageSwitcherButton } from './LanguageSwitcher.styles';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
    console.log("Just set language in languageSwitcher to: ", language);

  };

  return (
    <LanguageSwitcherButton id="language-switcher-button">
      <button onClick={toggleLanguage}>
        {language === 'en' ? 'Español' : 'English'}
      </button>
    </LanguageSwitcherButton>
  );
};

export default LanguageSwitcher;
