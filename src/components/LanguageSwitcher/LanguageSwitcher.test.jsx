import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';
import { LanguageContext } from '../../contexts/LanguageContext';

describe('LanguageSwitcher', () => {
  it('toggles the language between English and Spanish', () => {
    let testLanguage = 'en'; // Keep track of the test language
    const setLanguage = (newLanguage) => { testLanguage = newLanguage }; // Simulate the setLanguage function

    const { getByText, rerender } = render(
      <LanguageContext.Provider value={{ language: testLanguage, setLanguage }}>
        <LanguageSwitcher />
      </LanguageContext.Provider>
    );

    // Click the button to switch to Spanish
    fireEvent.click(getByText('Español'));

    // Expect the setLanguage to have changed the testLanguage to 'es'
    expect(testLanguage).toEqual('es');

    // Rerender with the new test language value
    rerender(
      <LanguageContext.Provider value={{ language: testLanguage, setLanguage }}>
        <LanguageSwitcher />
      </LanguageContext.Provider>
    );

    // Expect to see the 'Switch to English' button now
    expect(getByText('English')).toBeInTheDocument();
  });
});
