import React from 'react';
import Header from '../Header/Header';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import Footer from '../Footer/Footer';
import { LayoutContainer, ContentContainer, GlobalStyles } from './Layout.styles';
import { useMenuContext } from '../../contexts/MenuContext'

const Layout = ({ children }) => {
  const { menuOpen } = useMenuContext();

  return (
  <LayoutContainer>
    <GlobalStyles />  
    <Header id="header"/>
    {!menuOpen && <LanguageSwitcher id="language-switcher" data-testid="language-switcher" />}
    <ContentContainer id="main-content">
      {children}
    </ContentContainer>
    <Footer id="footer"/>
  </LayoutContainer>
  )
};

export default Layout;