import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AdminPage from './AdminPage';  // Replace with your actual path
import firebase from 'firebase/app';

jest.mock('firebase/app');

describe('AdminPage Component', () => {
  test('shows login prompt when not logged in', () => {
    const { getByText } = render(<AdminPage />);
    expect(getByText('Please log in')).toBeInTheDocument();
  });

  test('shows logged-in email and logout button when logged in', () => {
    firebase.auth().onAuthStateChanged.mockImplementationOnce((callback) => callback({
      email: 'test@email.com'
    }));

    const { getByText } = render(<AdminPage />);
    expect(getByText('You are logged in as test@email.com')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });

  test('logs out the user when logout button is clicked', () => {
    const signOutMock = jest.fn();
    firebase.auth.mockReturnValue({
      signOut: signOutMock
    });

    const { getByText } = render(<AdminPage />);
    fireEvent.click(getByText('Logout'));

    expect(signOutMock).toHaveBeenCalled();
  });
});
