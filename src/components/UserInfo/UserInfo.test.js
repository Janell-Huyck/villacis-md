// UserInfo.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserInfo from './UserInfo';
import { auth } from '../../firebase/firebaseConfig';
import { fetchUserName } from '../../firebase/firebaseOperations';

// Mock the signOut function from firebaseConfig
jest.mock('../../firebase/firebaseConfig', () => ({
  auth: {
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(),
  },
}));

// Mock fetchUserName function
jest.mock('../../firebase/firebaseOperations', () => ({
  fetchUserName: jest.fn(),
}));

test('displays user info and handles logout', async () => {
  const fakeUser = { uid: '123' };
  auth.onAuthStateChanged.mockImplementationOnce((cb) => {
    cb(fakeUser);
    return jest.fn();
  });

  fetchUserName.mockResolvedValueOnce('JohnDoe');

  render(<UserInfo />);
  
  // Async wait for username to be displayed
  const usernameElement = await screen.findByText('Logged in as: JohnDoe');
  expect(usernameElement).toBeInTheDocument();
  
  fireEvent.click(screen.getByText('Logout'));
  
  expect(auth.signOut).toHaveBeenCalledTimes(1);
});
