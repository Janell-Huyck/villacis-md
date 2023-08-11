// This is to wrap the root element of my application in a language provider.
// This will allow me to access the language context from anywhere in my application.
// This is for server-side rendering.
import React from 'react';
import { LanguageProvider } from './src/contexts/LanguageContext';

export const wrapRootElement = ({ element }) => (
  <LanguageProvider>{element}</LanguageProvider>
);
