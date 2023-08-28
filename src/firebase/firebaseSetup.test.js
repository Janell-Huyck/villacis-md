/**
 * Tests for firebaseSetup.js
 * 
 * The purpose of these tests is to ensure that the Firebase Admin SDK and Firestore 
 * are correctly initialized when firebaseSetup.js is executed.
 * 
 * To accomplish this, we mock external dependencies using Jest's mocking functionality:
 * - `firebase-admin` is mocked to verify that the SDK's initialization methods are being called.
 * - `getFirebaseServiceAccount` from 'firebaseUtils.js' is mocked to simulate getting a service account.
 * 
 * We are using Jest's mock functions (`jest.fn()`) to track calls to methods, and their arguments.
 * 
 * 1. The first test checks if Firebase Admin SDK is initialized with the correct service account credentials.
 * 2. The second test ensures that Firestore is initialized.
 *
 * We reset all mocks and modules before each test to ensure that no state is shared between tests.
 */
const mockCert = jest.fn();
const mockInit = jest.fn();
const mockFirestore = jest.fn();

jest.mock('firebase-admin', () => ({
  initializeApp: mockInit,
  credential: {
    cert: mockCert,
  },
  firestore: mockFirestore,
}));

const mockGetFirebaseServiceAccount = jest.fn();

jest.mock('./firebaseUtils', () => ({
  getFirebaseServiceAccount: mockGetFirebaseServiceAccount,
}));

describe('firebaseSetup', () => {
  let firebaseSetup;
  
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    mockGetFirebaseServiceAccount.mockReturnValue({
        type: "service_account",
        project_id: "project_id",
        private_key_id: "private_key_id",
        clientEmail: "client_email",
        clientId: "client_id",
        authUri: "auth_uri",
        tokenUri: "token_uri",
        authProviderX509CertUrl: "auth_provider_x509_cert_url",
        clientX509CertUrl: "client_x509_cert_url",
        universeDomain: "universe_domain",
    });
    firebaseSetup = require('./firebaseSetup');
    firebaseSetup.initializeFirebase();
  });

  it('should initialize Firebase Admin SDK with correct credentials', () => {
    expect(mockCert).toHaveBeenCalledWith({
      type: "service_account",
      project_id: "project_id",
      private_key_id: "private_key_id",
      clientEmail: "client_email",
      clientId: "client_id",
      authUri: "auth_uri",
      tokenUri: "token_uri",
      authProviderX509CertUrl: "auth_provider_x509_cert_url",
      clientX509CertUrl: "client_x509_cert_url",
      universeDomain: "universe_domain",
    });
    expect(mockInit).toHaveBeenCalled();
  });

  it('should set up Firestore', () => {
    expect(mockFirestore).toHaveBeenCalled();
  });
});
