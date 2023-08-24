const fs = require('fs');
const path = require('path');

const getFirebaseServiceAccount = () => {
  if (process.env.NODE_ENV === 'production') {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT);
    return JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  }
};

module.exports = {
  getFirebaseServiceAccount,
};
