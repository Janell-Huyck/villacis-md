const fs = require('fs');
const path = require('path');
const { getFirebaseServiceAccount } = require('./firebaseUtils'); // Adjust path as needed

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('getFirebaseServiceAccount', () => {
  const prodServiceAccountJSON = JSON.stringify({ prod: 'production' });
  const devServiceAccountJSON = JSON.stringify({ dev: 'development' });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the parsed JSON from environment variable in production mode', () => {
    process.env.NODE_ENV = 'production';
    process.env.FIREBASE_SERVICE_ACCOUNT = prodServiceAccountJSON;

    const result = getFirebaseServiceAccount();

    expect(result).toEqual(JSON.parse(prodServiceAccountJSON));
  });

  it('should read and return the parsed JSON from file in development mode', () => {
    process.env.NODE_ENV = 'development';
    process.env.FIREBASE_SERVICE_ACCOUNT = './firebaseServiceAccount.json';
    const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT);

    fs.readFileSync.mockReturnValue(devServiceAccountJSON);

    const result = getFirebaseServiceAccount();

    expect(fs.readFileSync).toHaveBeenCalledWith(serviceAccountPath, 'utf8');
    expect(result).toEqual(JSON.parse(devServiceAccountJSON));
  });
});
