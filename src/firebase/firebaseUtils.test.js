/**
 * Tests for firebaseUtils.js, specifically the function getFirebaseServiceAccount
 *
 * The objective of these tests is to validate the behavior of the function getFirebaseServiceAccount, 
 * which reads Firebase service account details either from environment variables or from a JSON file 
 * and returns them in a parsed JSON format.
 *
 * Mocking and Environment Setup:
 * - The 'fs' (file system) module is mocked using Jest's mock capabilities to simulate file read operations.
 * - We use a utility function, setupEnv, to simulate different NODE_ENV settings ('production' or 'development').
 * - The process.env object is saved and restored before and after each test to prevent state leakage between tests.
 * 
 * Test Scenarios:
 * 1. Production Mode
 *    - Check if it throws an error when mandatory environment variables are missing.
 *    - Check if it correctly reads from environment variables.
 *    - Check if it throws an error if some of the environment variables are not set.
 *
 * 2. Development Mode
 *    - Validate behavior when FIREBASE_SERVICE_ACCOUNT path is provided.
 *    - Validate reading and parsing of JSON service account details from a file.
 *    - Check for errors when the JSON file is malformed.
 *    - Check for errors when mandatory environment variables are missing.
 *    - Validate behavior when an invalid path is provided for the service account file.
 *
 * Each test is designed to validate one of these scenarios, using the appropriate mocks and expectations.
 */
const { getFirebaseServiceAccount, MissingEnvVarsError } = require('./firebaseUtils');
import { setupEnv } from '../utils/test-utils';
const fs = require('fs');
const path = require('path');
jest.mock('fs');

const productionEnv = {
  NODE_ENV: 'production',
};

const developmentEnv = {
  NODE_ENV: 'development',
  FIREBASE_SERVICE_ACCOUNT: './firebaseServiceAccount.json',
};

let originalEnv;

beforeEach(() => {
  originalEnv = { ...process.env };
  fs.readFileSync.mockReset();
});

afterEach(() => {
  process.env = originalEnv;
});

describe('getFirebaseServiceAccount', () => {

  it('should throw an error if FIREBASE_PRIVATE_KEY is undefined in production', () => {
    setupEnv(productionEnv);
    process.env.FIREBASE_PRIVATE_KEY = undefined;
  
    expect(() => getFirebaseServiceAccount()).toThrow(new MissingEnvVarsError(['FIREBASE_PRIVATE_KEY']));
  });

  it('should return the parsed JSON from environment variable in production mode', () => {
    setupEnv(productionEnv);
    const prodServiceAccountJSON = JSON.stringify({
      type: "service_account",
      project_id: "project_id",
      private_key_id: "private_key_id",
      private_key: "someKey",
      client_email: "client_email",
      client_id: "client_id",
      auth_uri: "auth_uri",
      token_uri: "token_uri",
      auth_provider_x509_cert_url: "auth_provider_x509_cert_url",
      client_x509_cert_url: "client_x509_cert_url",
      universe_domain: "universe_domain",
    });

    const result = getFirebaseServiceAccount();
    
    expect(result).toEqual(JSON.parse(prodServiceAccountJSON));
  });

  it('should read and return the parsed JSON from file in development mode', () => {
    setupEnv(developmentEnv);
  
    const fakeServiceAccount = JSON.stringify({
      type: "service_account",
      project_id: "fake_project_id",
      private_key_id: "fake_private_key_id",
      private_key: "fake_private_key",
      client_email: "fake_client_email",
      client_id: "fake_client_id",
      auth_uri: "fake_auth_uri",
      token_uri: "fake_token_uri",
      auth_provider_x509_cert_url: "fake_auth_provider_x509_cert_url",
      client_x509_cert_url: "fake_client_x509_cert_url",
      universe_domain: "fake_universe_domain",
    });
    fs.readFileSync.mockReturnValue(fakeServiceAccount);
    
    const result = getFirebaseServiceAccount();
    expect(fs.readFileSync).toHaveBeenCalledWith(path.resolve(__dirname, './firebaseServiceAccount.json'), 'utf8');
    
    expect(result).toEqual(JSON.parse(fakeServiceAccount));
  });
  
  

  it('should throw an error if the JSON in the service account file is malformed', () => {
    setupEnv(developmentEnv);
    const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT);
  
    fs.readFileSync.mockReturnValue('This is not JSON');
  
    expect(() => getFirebaseServiceAccount()).toThrow("Failed to read or parse service account file");
  });
  
  it('should throw an error if FIREBASE_SERVICE_ACCOUNT is undefined in development', () => {
    setupEnv(developmentEnv);
    process.env.FIREBASE_SERVICE_ACCOUNT = undefined;

    expect(() => getFirebaseServiceAccount()).toThrow("FIREBASE_SERVICE_ACCOUNT is undefined");
  });

  it('should throw an error if FIREBASE_SERVICE_ACCOUNT is not a valid path', () => {
    setupEnv(developmentEnv);
    process.env.FIREBASE_SERVICE_ACCOUNT = './invalidPath.json';
    const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT);

    fs.readFileSync.mockImplementation(() => { throw new Error("File not found"); });

    expect(() => getFirebaseServiceAccount()).toThrow("Failed to read or parse service account file");
  });

  it('should throw an error if some required environment variables are missing in production', () => {
    setupEnv(productionEnv);
    process.env.FIREBASE_PRIVATE_KEY_ID = undefined; // intentionally unset
  
    expect(() => getFirebaseServiceAccount()).toThrow(new MissingEnvVarsError(['FIREBASE_PRIVATE_KEY_ID']));
  });
  
  it('should throw an error if some required environment variables are missing in development', () => {
    setupEnv(developmentEnv);
    process.env.FIREBASE_PRIVATE_KEY_ID = undefined; // intentionally unset

    expect(() => getFirebaseServiceAccount()).toThrow(new MissingEnvVarsError(['FIREBASE_PRIVATE_KEY_ID']));
  })

  it('should throw an error if the service account file is invalid in development', () => {
    setupEnv(developmentEnv);
    process.env.FIREBASE_SERVICE_ACCOUNT = './invalidFirebaseServiceAccount.json';
    
    fs.readFileSync.mockImplementation(() => {
      throw new Error('File not found');
    });
  
    expect(() => getFirebaseServiceAccount()).toThrow('Failed to read or parse service account file');
  });

  it('should call fs.readFileSync with the correct arguments', () => {
    setupEnv(developmentEnv);
    fs.readFileSync.mockReturnValue(JSON.stringify({ key: 'value' }));
    getFirebaseServiceAccount();
    expect(fs.readFileSync).toHaveBeenCalledWith(path.resolve(__dirname, './firebaseServiceAccount.json'), 'utf8');
  });
  

});

