const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
const { getFirebaseServiceAccount } = require('./firebaseUtils');

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
  firestore: jest.fn(),
}));

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('Firebase Initialization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.FIREBASE_SERVICE_ACCOUNT = './firebaseServiceAccount.json';
  });

  it('should initialize with correct credentials', () => {
    const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT);
    const serviceAccountJSON = JSON.stringify({ test: 'test' });
    fs.readFileSync.mockReturnValue(serviceAccountJSON);

    const serviceAccount = getFirebaseServiceAccount();

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    expect(fs.readFileSync).toHaveBeenCalledWith(serviceAccountPath, 'utf8');
    expect(admin.credential.cert).toHaveBeenCalledWith(JSON.parse(serviceAccountJSON));
  });
  
  it('should initialize Firestore database', () => {
    require('./firebaseSetup');
    expect(admin.firestore).toHaveBeenCalled();
  }); 
});
