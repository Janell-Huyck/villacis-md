/**
 * Test File for Firebase Client-Side Initialization
 * 
 * This file tests the client-side initialization code for Firebase in the project.
 * It uses Jest, a JavaScript testing framework, to mock and assert the behavior of
 * Firebase services. Here's a breakdown of what this file does:
 * 
 * 1. Mock Libraries: Jest replaces the actual Firebase services with mock functions,
 *    allowing us to run tests without making calls to external services.
 * 
 * 2. Mock Environment Variables: Since Firebase initialization depends on environment
 *    variables, we mock them to simulate a real-world scenario.
 * 
 * 3. Mock Functions: Each Firebase service function expected to be called is mocked,
 *    enabling us to assert how and when they are called.
 * 
 * 4. Test Cases: Two main test cases are covered:
 *    - The first one ensures that Firebase analytics are NOT initialized if the
 *      function `isSupported` returns false.
 *    - The second one checks whether Firebase initializes with the correct 
 *      configuration settings.
 * 
 * 5. Setup and Cleanup: The `beforeEach` block resets mocks and cached modules
 *    before each test to ensure no state is shared between tests.
 */

// Import your mocked libraries
jest.mock('firebase/app');
jest.mock('firebase/firestore');
jest.mock('firebase/auth');
jest.mock('firebase/analytics');

// Mocked Environment variables
process.env.GATSBY_FIREBASE_API_KEY = 'test-api-key';
process.env.GATSBY_FIREBASE_AUTH_DOMAIN = 'test-auth-domain';
process.env.GATSBY_FIREBASE_PROJECT_ID = 'test-project-id';
process.env.GATSBY_FIREBASE_STORAGE_BUCKET = 'test-storage-bucket';
process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID = 'test-messaging-sender-id';
process.env.GATSBY_FIREBASE_APP_ID = 'test-app-id';

// Mocked Firebase functions
const mockInitializeApp = jest.fn();
const mockGetFirestore = jest.fn();
const mockGetAuth = jest.fn();
const mockGetAnalytics = jest.fn();
const mockIsSupported = jest.fn();

jest.mock('firebase/app', () => ({
  initializeApp: mockInitializeApp,
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: mockGetFirestore,
}));

jest.mock('firebase/auth', () => ({
  getAuth: mockGetAuth,
}));

jest.mock('firebase/analytics', () => ({
  getAnalytics: mockGetAnalytics,
  isSupported: mockIsSupported,
}));

describe('Firebase Client-Side Initialization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should not initialize analytics if isSupported returns false', () => {
    mockIsSupported.mockReturnValue(false);

    require('./firebaseConfig');

    // Validate initializeApp was called
    expect(mockInitializeApp).toHaveBeenCalledTimes(1);

    // Validate other Firebase services were initialized
    expect(mockGetFirestore).toHaveBeenCalledTimes(1);
    expect(mockGetAuth).toHaveBeenCalledTimes(1);

    // Validate analytics was not initialized
    expect(mockGetAnalytics).toHaveBeenCalledTimes(0);
  });

  it('should initialize app with the correct config', () => {
    mockIsSupported.mockReturnValue(true);

    // Require the config to execute the initialization
    require('./firebaseConfig');

    // Validate initializeApp was called with correct parameters
    expect(mockInitializeApp).toHaveBeenCalledWith({
      apiKey: 'test-api-key',
      authDomain: 'test-auth-domain',
      projectId: 'test-project-id',
      storageBucket: 'test-storage-bucket',
      messagingSenderId: 'test-messaging-sender-id',
      appId: 'test-app-id',
    });

    // Validate other Firebase services were initialized
    expect(mockGetFirestore).toHaveBeenCalledTimes(1);
    expect(mockGetAuth).toHaveBeenCalledTimes(1);
    expect(mockGetAnalytics).toHaveBeenCalledTimes(1);
  });


});
