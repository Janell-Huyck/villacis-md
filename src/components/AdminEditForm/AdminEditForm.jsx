import React, { useState, useEffect } from 'react';
import { generateCollectionNames, fetchMostRecentDoc } from '../../firebase/firebaseOperations';
import useAllPageNames from '../../hooks/useAllPageNames';

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
        console.log(collectionNames);
        setCollections(collectionNames);
      } catch (error) {
        console.error('Error fetching collections: ', error);
      }
      setIsLoading(false);
      console.log('Done fetching collections');
      console.log("collections: ", collections)
    };

    getCollections();
  }, []);

  useEffect(() => {
    const fetchDocument = async (selectedCollection) => {
      if (selectedCollection) {
        const document = await fetchMostRecentDoc(selectedCollection);
        setMostRecentDoc(document);
      }
      console.log('Done fetching document');
      console.log("mostRecentDoc: ", mostRecentDoc)
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
          {mostRecentDoc && <pre>{JSON.stringify(mostRecentDoc, null, 2)}</pre>}
        </>
      )}
    </div>
  );
};


export default AdminEditForm;