import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const useFirebaseDocument = (collectionBase, language) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const newCollectionName = `${collectionBase}_${language}`;
        const q = query(
          collection(db, newCollectionName),
          orderBy("createdAt", "desc"),
          limit(1)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const mostRecentDoc = querySnapshot.docs[0];
          setData(mostRecentDoc.data());
        } else {
          setData(null);
        }
        setLoading(false);

      } catch (e) {
        setLoading(false);
        setError(e.message);
      }
  };

  fetchData();
}, [collectionBase, language]);

  return [data, loading, error];
};

export default useFirebaseDocument;
