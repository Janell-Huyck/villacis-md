// test-utils.js
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { LanguageContext } from '../contexts/LanguageContext';


// A custom render method that includes LanguageContext
function renderWithLanguage(ui, { language = 'en', setLanguage = () => {}, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything, with export override for the render method
export * from '@testing-library/react';
export { renderWithLanguage as render };



// A mock image for Gatsby Image, replicating the staticQuery to find the image
export const mockGatsbyImageData = {
    file: {
      childImageSharp: {
        gatsbyImageData: {
          layout: 'fullWidth',
          backgroundColor: '#a89898',
          aspectRatio: 1,
          images: {
            fallback: {
              src: '/static/33049a0474feb0716a26bbba0917c9d2/aced0/brainz.jpg',
              srcSet: '/static/33049a0474feb0716a26bbba0917c9d2/8cf23/bra…0474feb0716a26bbba0917c9d2/aced0/brainz.jpg 1920w',
              sizes: '100vw',
            },
          },
          transformOptions: { fit: 'cover', cropFocus: 'north' },
        }}}
};
