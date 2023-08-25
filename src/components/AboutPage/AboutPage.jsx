import React, { useContext } from 'react';
import useFirebaseDocument from '../../hooks/useFirebaseDocument';
import { LanguageContext } from '../../contexts/LanguageContext';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { AboutPageContainer, AboutPageContent, NameAndImage } from './AboutPage.styles';

const AboutPage = () => {
  const { language } = useContext(LanguageContext);
  const content = useFirebaseDocument('about', language);

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

  return content ? (
    <AboutPageContainer>
      <h1>{content.title}</h1>
      <h2>{content.subtitle}</h2>
      <AboutPageContent id="about-content">
        <ul>
          {content.people.map((person, index) => (
                  <li key={index}>
                      <NameAndImage>
                        <div>
                            <h3>{person.name}</h3>
                            <h4>{person.title}</h4>
                        </div>
                        <GatsbyImage
                            image={images[person.image]}
                            alt={person.name}
                            style={{
                            maxWidth: '400px',
                            maxHeight: '400px',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            margin: '10px auto',
                            }}
                      />
                      </NameAndImage>
                        <div>
                            {person.bio.map((paragraph, pIndex) => (
                                <p key={pIndex}>{paragraph}</p>
                            ))}
                            {person.certifications && (
                                <>
                                <h5>{person.certificationsTitle}</h5>
                                <p>{person.certifications.join(', ')}</p>
                                </>
                            )}
                            {person.memberships && (
                                <>
                                <h5>{person.membershipsTitle}</h5>
                                <p>{person.memberships.join(', ')}</p>
                                </>
                            )}
                        </div>

                        <div>
                        {person.education && (
                            <ul>
                                <h5>{person.educationTitle}</h5>
                                {person.education.map((item, eIndex) => {
                                    const key = Object.keys(item)[0];
                                    return <li key={eIndex}><em>{key}:</em> {item[key]}</li>;
                                })}
                            </ul>
                        )}
                        </div>
                        <div className="inner-border"></div>
                    </li>
                    ))}
        </ul>
      </AboutPageContent>
    </AboutPageContainer>
  ) : (
    <div>Loading...</div>
  );
};

export default AboutPage;
