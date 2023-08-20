import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import withLanguage from '../../hocs/withLanguage';
import { AboutPageContainer, AboutPageContent } from './AboutPage.styles';

const AboutPage = ({ content }) => {


  // Querying the images
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { extension: { regex: "/(jpg)|(png)|(jpeg)/" } }) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              width: 400
              height: 400
              transformOptions: { fit: COVER, cropFocus: NORTH }
            )
          }
        }
      }
    }
  `);

  // Creating an object of images
  const images = data.allFile.nodes.reduce((acc, node) => {
    acc[node.relativePath] = getImage(node.childImageSharp);
    return acc;
  }, {});

  return (<AboutPageContainer>
                <h1>{content.title}</h1>
                <h2>{content.subtitle}</h2>
              
            <AboutPageContent id="about-content">
            <ul>
                {content.people.map((person, index) => (
                    <li key={index}>
                        <h3>{person.name}</h3>
                        <h4>{person.title}</h4>
                        <GatsbyImage
                            image={images[person.image]}
                            alt={person.name}
                            style={{
                            width: '400px',
                            height: '400px',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            }}
                        />
                        <div>
                            {person.bio.map((paragraph, pIndex) => (
                                <p key={pIndex}>{paragraph}</p>
                            ))}
                        </div>
                        {person.education && (
                            <ul>
                                <h5>Education</h5>
                                {person.education.map((item, eIndex) => {
                                    const key = Object.keys(item)[0];
                                    return <li key={eIndex}>{key}: {item[key]}</li>;
                                })}
                            </ul>
                        )}
                        {person.certifications && (
                            <ul>
                                <h5>Certifications</h5>
                                {person.certifications.map((item, cIndex) => (
                                    <li key={cIndex}>{item}</li>
                                ))}
                            </ul>
                        )}
                        {person.memberships && (
                            <ul>
                                <h5>Memberships</h5>
                                {person.memberships.map((item, mIndex) => (
                                    <li key={mIndex}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            </AboutPageContent>
          </AboutPageContainer>);
};

export default withLanguage(AboutPage, "AboutPage");
