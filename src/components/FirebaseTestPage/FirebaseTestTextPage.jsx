import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const FirebaseTestTextPage = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'testText', 'QXWlwBgFGGxW4ve2edtc');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setText(docSnap.data().text1); // Assuming the text is stored in a field named 'text1'
      } else {
        console.log('No such document!');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Text</h1>
      <p>{text}</p>
    </div>
  );
};

export default FirebaseTestTextPage;
