// This hook was created to pair with the firebaseOptions function 
// generateCollectionNames in order to dynamically generate a list of
// all collections in the database that could be edited.
// This is used in the AdminEditForm.jsx component.
// It returns a list of all page names in the app.

import { useStaticQuery, graphql } from 'gatsby';

const useAllPageNames = () => {
  const data = useStaticQuery(graphql`
    query {
      allSitePage {
        edges {
          node {
            path
          }
        }
      }
    }
  `);

  // Transform the data to get only the titles
  const pageNames = data.allSitePage.edges.map(edge => {
    const path = edge.node.path;
    const name = path.replace(/\//g, '');
    return name;
  });

  return pageNames;
};

export default useAllPageNames;
