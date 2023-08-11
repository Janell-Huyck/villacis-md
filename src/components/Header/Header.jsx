import React from 'react';
import withLanguage from '../../hocs/withLanguage';
import { HeaderContainer } from './Header.styles';

const Header = ({ content }) => {
  
    return (
            <HeaderContainer id="header-container">
              <h1>This is the header</h1>
            </HeaderContainer>
            )};

export default withLanguage(Header, "Header");