import React from 'react';
import withLanguage from '../../hocs/withLanguage';

const Header = ({ content }) => {
  
    return (
            <div>
              <h1>This is the header</h1>
            </div>
            )};

export default withLanguage(Header, "Header");