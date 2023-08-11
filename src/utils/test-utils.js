// test-utils.js
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { LanguageContext } from '../contexts/LanguageContext';

function renderWithLanguage(ui, { language = 'en', setLanguage = () => {}, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { renderWithLanguage as render };
