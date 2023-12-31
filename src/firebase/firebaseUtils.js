const fs = require('fs');
const path = require('path');

const requiredEnvVars = [
  'FIREBASE_TYPE',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_PRIVATE_KEY_ID',
  'FIREBASE_PRIVATE_KEY',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_CLIENT_ID',
  'FIREBASE_AUTH_URI',
  'FIREBASE_TOKEN_URI',
  'FIREBASE_AUTH_PROVIDER_X509_CERT_URL',
  'FIREBASE_CLIENT_X509_CERT_URL',
  'FIREBASE_UNIVERSE_DOMAIN',
];
class MissingEnvVarsError extends Error {
  constructor(missingVars) {
    super(`Missing required environment variables: ${missingVars.join(', ')}`);
    this.name = 'MissingEnvVarsError';
  }
}

const validateRequiredEnvVars = () => {
  const missingVars = requiredEnvVars.filter(varName => 
    !process.env[varName] || 
    process.env[varName] === '' || 
    process.env[varName] === 'undefined'
  );
  
  if (typeof process.env.FIREBASE_PRIVATE_KEY !== 'string') {
    missingVars.push('FIREBASE_PRIVATE_KEY should be a string');
  }
  
  if (missingVars.length > 0) {
    throw new MissingEnvVarsError(missingVars);
  }
};

const fetchProductionServiceAccount = () => {
  return {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  };
};

const fetchDevServiceAccount = () => {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT || process.env.FIREBASE_SERVICE_ACCOUNT === '' || process.env.FIREBASE_SERVICE_ACCOUNT === 'undefined') {
    throw new Error("FIREBASE_SERVICE_ACCOUNT is undefined");
  }
  const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT);
  try {
    return JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  } catch (error) {
    throw new Error('Failed to read or parse service account file');
  }
};

const getFirebaseServiceAccount = () => {
  validateRequiredEnvVars();
  if (process.env.NODE_ENV === 'production') {
    return fetchProductionServiceAccount();
  }
  return fetchDevServiceAccount();
};

module.exports = {
  getFirebaseServiceAccount,
  MissingEnvVarsError 
};
