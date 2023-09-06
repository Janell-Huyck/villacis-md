// testUtils.js
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

export function setupEnv(additionalEnvVars) {
  const baseEnv = {
    FIREBASE_PRIVATE_KEY: 'someKey',
    FIREBASE_TYPE: 'service_account',
    FIREBASE_PRIVATE_KEY: 'someKey',
    FIREBASE_TYPE: 'service_account',
    FIREBASE_PROJECT_ID: 'project_id',
    FIREBASE_PRIVATE_KEY_ID: 'private_key_id',
    FIREBASE_CLIENT_EMAIL: 'client_email',
    FIREBASE_CLIENT_ID: 'client_id',
    FIREBASE_AUTH_URI: 'auth_uri',
    FIREBASE_TOKEN_URI: 'token_uri',
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: 'auth_provider_x509_cert_url',
    FIREBASE_CLIENT_X509_CERT_URL: 'client_x509_cert_url',
    FIREBASE_UNIVERSE_DOMAIN: 'universe_domain',
  };

  const envVars = { ...baseEnv, ...additionalEnvVars };

  Object.keys(envVars).forEach((key) => {
    process.env[key] = envVars[key];
  });
}
