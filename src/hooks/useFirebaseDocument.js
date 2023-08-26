import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const useFirebaseDocument = (collection, language) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Add a new loading state

  useEffect(() => {
    setLoading(true); // Set loading to true when collection or language changes
    const fetchData = async () => {
      const docRef = doc(db, collection, language);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such document!");
        setData(null); // Explicitly set data to null if the document doesn't exist
      }
      setLoading(false); // Set loading to false after fetching data
    };

    fetchData();
  }, [collection, language]);

  return [data, loading]; // Return both data and loading state
};

export default useFirebaseDocument;
