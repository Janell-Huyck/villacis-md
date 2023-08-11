import React from 'react';
import withLanguage from '../../hocs/withLanguage';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const HomePage = ({ content }) => {
  
  return (
          <div>
            <LanguageSwitcher />
            <h1>{content.title}</h1>
            <h2>{content.subtitle}</h2>
            <h3>{content.slogan}</h3>
            <p>{content.location}</p>
            <h4>{content.whyDPC}</h4>
            <p>{content.whyDPCText}</p>
            <h4>{content.aboutHCDPC}</h4>
            <p>{content.aboutHCDPCText}</p>
            <h4>{content.services}</h4>
            <p>{content.servicesText}</p>
            <ul>
              {content.servicesList.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
            <p>{content.immigrationText}</p>
          </div>
          )};

export default withLanguage(HomePage, "HomePage");
