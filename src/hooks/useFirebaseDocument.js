import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const useFirebaseDocument = (collection, language) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, collection, language); // Use the language as the document ID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data()); // Store the whole document data
      } else {
        console.log('No such document!');
      }
    };

    fetchData();
  }, [collection, language]);

  return data;
};

export default useFirebaseDocument;
