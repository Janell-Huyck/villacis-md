import React from 'react';
import withLanguage from '../../hocs/withLanguage';
import { FooterContainer } from './Footer.styles';

const Footer = ({ content }) => {
  
    return (
            <FooterContainer>
              <h1>This is the footer</h1>
            </FooterContainer>
            )};

export default withLanguage(Footer, "Footer");