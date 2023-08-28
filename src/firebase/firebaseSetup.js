const admin = require('firebase-admin');
const { getFirebaseServiceAccount } = require('./firebaseUtils');

let db;

const initializeFirebase = () => {
  const serviceAccount = getFirebaseServiceAccount();
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  db = admin.firestore();
};

initializeFirebase();

module.exports = { admin, db, initializeFirebase };

