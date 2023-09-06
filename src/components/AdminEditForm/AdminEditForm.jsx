import React, { useState, useEffect } from 'react';
import { generateCollectionNames, fetchMostRecentDoc } from '../../firebase/firebaseOperations';
import useAllPageNames from '../../hooks/useAllPageNames';
import { renderField } from '../../utils/pageUtils';
import { FlexContainer, HighlightKey } from './AdminEditForm.styles';
import UpdatePageButton from '../UpdatePageButton/UpdatePageButton';

const AdminEditForm = () => {
  const pageNames = useAllPageNames();

  const [mostRecentDoc, setMostRecentDoc] = useState(null);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCollections = async () => {
      setIsLoading(true);
      try {
        const collectionNames = await generateCollectionNames(pageNames);
        setCollections(collectionNames);
      } catch (error) {
        console.error('Error fetching collections: ', error);
      }
      setIsLoading(false);
    };

    getCollections();
  }, [pageNames]);

  useEffect(() => {
    const fetchDocument = async () => {
      if (selectedCollection) {
        const document = await fetchMostRecentDoc(selectedCollection);
        setMostRecentDoc(document);
      }
    };

    fetchDocument();
  }, [selectedCollection]);

  const handleCollectionChange = (e) => {
    setSelectedCollection(e.target.value);
  };



  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <select onChange={handleCollectionChange}>
            <option value="default" disabled>
              Select page to edit
            </option>
            {collections.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
            </select>
            <UpdatePageButton data={mostRecentDoc} />
            {mostRecentDoc && (
              <ul>
           <FlexContainer>
          {Object.keys(mostRecentDoc).map((key) => (
            <li key={key}>
              <HighlightKey>{key}:</HighlightKey> {renderField(key, mostRecentDoc[key])}
            </li>
          ))}
                </FlexContainer>
                </ul>
          )}
        </>
      )}
    </div>
  );
};


export default AdminEditForm;