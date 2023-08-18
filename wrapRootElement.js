// wrapRootElement.js
import React from 'react';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { MenuProvider } from './src/contexts/MenuContext';

export const wrapRootElement = ({ element }) => (
  <LanguageProvider>
    <MenuProvider>
        {element}
    </MenuProvider>
  </LanguageProvider>
);
