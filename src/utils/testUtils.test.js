import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { renderWithLanguage, setupEnv, mockGatsbyImageData } from './testUtils';  // Adjust import path accordingly
import { LanguageContext } from '../contexts/LanguageContext';  // Adjust import path accordingly

describe('testUtils', () => {
  // Testing renderWithLanguage
  it('should render with default language', () => {
    const TestComponent = () => {
      const { language } = useContext(LanguageContext);
      return <span>{language}</span>;
    };
    renderWithLanguage(<TestComponent />);
    expect(screen.getByText('en')).toBeInTheDocument();
  });

  it('should render with custom language', () => {
    const TestComponent = () => {
      const { language } = useContext(LanguageContext);
      return <span>{language}</span>;
    };
    renderWithLanguage(<TestComponent />, { language: 'fr' });
    expect(screen.getByText('fr')).toBeInTheDocument();
  });

  // Testing mockGatsbyImageData
  it('should have a valid mockGatsbyImageData object', () => {
    expect(mockGatsbyImageData).toHaveProperty('file.childImageSharp.gatsbyImageData');
  });

  // Testing setupEnv
  it('should setup environment variables', () => {
    const newEnvVars = {
      FIREBASE_PROJECT_ID: 'new_project_id',
      FIREBASE_UNIVERSE_DOMAIN: 'new_universe_domain',
    };
    setupEnv(newEnvVars);
    expect(process.env.FIREBASE_PROJECT_ID).toEqual('new_project_id');
    expect(process.env.FIREBASE_UNIVERSE_DOMAIN).toEqual('new_universe_domain');
  });
});
