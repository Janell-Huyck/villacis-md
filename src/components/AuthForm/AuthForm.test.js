import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AuthForm from './AuthForm';

describe('AuthForm', () => {
  test('renders form and triggers login on submit', () => {
    const handleLogin = jest.fn();
    render(<AuthForm handleLogin={handleLogin} loginError={null} />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@email.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testpass' },
    });

    fireEvent.click(screen.getByText('Login'));

    expect(handleLogin).toHaveBeenCalledWith('test@email.com', 'testpass');
  });
});
