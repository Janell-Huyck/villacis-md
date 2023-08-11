// This will allow me to access the language context from anywhere in my application.
import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const withLanguage = (WrappedComponent, componentName) => {
  return (props) => {
    const { language } = useContext(LanguageContext);
    const contentModule = require(`../components/${componentName}/content-${language}.js`);
    const content = contentModule.default;
    return <WrappedComponent {...props} content={content} />;
  };
};

export default withLanguage;

