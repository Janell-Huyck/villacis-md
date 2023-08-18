import React from 'react';
import Navigation from '../Navigation/Navigation';
import withLanguage from '../../hocs/withLanguage';
import { HeaderContainer, LogoContainer, ActionContainer } from './Header.styles';

const Header = ({ content }) => {
   
    return (
            <HeaderContainer id="header-container">
              <LogoContainer id="logo-container">
                <h1>Health Connections DPC</h1>
              </LogoContainer>
              <Navigation id="navigation"/>
              <ActionContainer id="action-container">
                <h2>513-555-1212</h2>
                <h2>Join Us Button</h2>
              </ActionContainer>

            </HeaderContainer>
            )};

export default withLanguage(Header, "Header");