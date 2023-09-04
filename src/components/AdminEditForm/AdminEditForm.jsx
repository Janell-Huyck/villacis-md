import React, { useState, useEffect } from 'react';
import { generateCollectionNames, fetchMostRecentDoc } from '../../firebase/firebaseOperations';
import useAllPageNames from '../../hooks/useAllPageNames';
import { FlexContainer, HighlightKey } from './AdminEditForm.styles';

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
  }, []);

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

  const renderField = (key, value) => {
    if (value == true || value == false) {
      return value.toString();
    }
    if (key === 'createdAt' || key === 'updatedAt') {
      const date = new Date(value.seconds * 1000);
      return date.toString();
    }
    if (value == null) {
      return 'null';
    }
    if (value && typeof value === 'object') {
      if (Array.isArray(value)) {
        // Handle array recursively
        return (
          <ul>
            {value.map((v, i) => (
              <li key={i}>{renderField(i.toString(), v)}</li>
            ))}
          </ul>
        );
        
      } else {
        // Handle object recursively
        return (
          <ul>
            {Object.keys(value).map((key) => (
              <li key={key}>
                <HighlightKey>{key}:</HighlightKey> {renderField(key, value[key])}
              </li>
            ))}
          </ul>
        );
      }
    }
    return value;  // For primitive types like string, number, boolean, etc.
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