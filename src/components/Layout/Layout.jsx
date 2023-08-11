import React from 'react';
import Header from '../Header/Header';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import Footer from '../Footer/Footer';
import { LayoutContainer, ContentContainer } from './Layout.styles';

const Layout = ({ children }) => (
  <LayoutContainer>
    <Header id="header"/>
    <LanguageSwitcher id="language-switcher"/>
    <ContentContainer id="main-content">
      {children}
    </ContentContainer>
    <Footer id="footer"/>
  </LayoutContainer>
);

export default Layout;