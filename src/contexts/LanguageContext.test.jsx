import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, LanguageContext } from './LanguageContext';

test('toggles language between English and Spanish', () => {
  render(
    <LanguageProvider>
      <LanguageContext.Consumer>
        {({ language, setLanguage }) => (
          <div>
            <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}>Switch</button>
            <span>{language}</span>
          </div>
        )}
      </LanguageContext.Consumer>
    </LanguageProvider>
  );

  const button = screen.getByText('Switch');
  expect(screen.getByText('en')).toBeInTheDocument();

  fireEvent.click(button);
  expect(screen.getByText('es')).toBeInTheDocument();

  fireEvent.click(button);
  expect(screen.getByText('en')).toBeInTheDocument();
});

test('LanguageProvider provides correct default language', () => {
  render(
    <LanguageProvider>
      <LanguageContext.Consumer>
        {({ language }) => {
          expect(language).toBe('en'); // Check the default language
          return null;
        }}
      </LanguageContext.Consumer>
    </LanguageProvider>
  );
});

test('LanguageProvider initializes with value from localStorage', () => {
  // Simulate setting a value in localStorage
  localStorage.setItem('language', 'es');

  let retrievedLanguage;
  render(
    <LanguageProvider>
      <LanguageContext.Consumer>
        {value => {
          retrievedLanguage = value.language;
          return null;
        }}
      </LanguageContext.Consumer>
    </LanguageProvider>
  );

  // Assert that the value from localStorage was used
  expect(retrievedLanguage).toBe('es');
});