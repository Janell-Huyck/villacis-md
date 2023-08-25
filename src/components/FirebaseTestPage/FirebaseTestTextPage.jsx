import React, { useContext } from 'react';
import useFirebaseDocument from '../../hooks/useFirebaseDocument';
import { LanguageContext } from '../../contexts/LanguageContext';

const FirebaseTestTextPage = () => {
  const { language } = useContext(LanguageContext);
  const data = useFirebaseDocument('testText', language);

  return (
    <div>
      <h1>Test Text</h1>
      <p>{data?.first}</p> {/* Make sure to access the correct field */}
    </div>
  );
};

export default FirebaseTestTextPage;
