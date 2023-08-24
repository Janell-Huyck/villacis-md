const admin = require('firebase-admin');
const { getFirebaseServiceAccount } = require('./firebaseUtils'); 

const serviceAccount = getFirebaseServiceAccount();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
