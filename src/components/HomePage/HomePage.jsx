import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import withLanguage from '../../hocs/withLanguage';
import { BackgroundImageWrapper, HeroContent, MainContent, HomePageContainer } from './HomePage.styles';

const HomePage = ({ content }) => {
  // use graphql to retrieve the background image
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "brainz.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            aspectRatio: 1
            transformOptions: { fit: COVER, cropFocus: NORTH }
          )
        }
      }
    }
  `);

const image = getImage(data.file.childImageSharp.gatsbyImageData);

  return (<HomePageContainer>
            <BackgroundImageWrapper id="landing-image-and-hero">
              <GatsbyImage id="background-image" 
                           image={image} 
                           alt="Background Image" 
                           style={{
                            position: 'absolute',
                            width: '100vw',
                            height: '100vh',
                            objectFit: 'scale-down',
                            objectPosition: 'left top',
                            top: '0',
                            zIndex: '-1',
                            }} />
              <HeroContent id="hero-content">
                <h1>{content.title}</h1>
                <h2>{content.subtitle}</h2>
                <h3>{content.slogan}</h3>
                <p>{content.location}</p>
              </HeroContent>
            </BackgroundImageWrapper>
            <MainContent id="home-main-content">
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
            </MainContent>
          </HomePageContainer>);
};

export default withLanguage(HomePage, "HomePage");
