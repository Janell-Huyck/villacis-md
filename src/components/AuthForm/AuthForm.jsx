import React, { useState } from 'react';
import { loginWithEmail } from '../../firebase/firebaseOperations';
import { AuthFormContainer, AuthInput, AuthButton, ErrorText } from './AuthForm.styles';

const AuthForm = ({ onLoginSuccess, onLoginFail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const loginErrorText = "Unable to log in with that email/password combination. Please contact your system administrator if you need more assistance.";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, user } = await loginWithEmail(email, password);

    if (success) {
      onLoginSuccess(user);
      setLoginError(false);
    } else {
      onLoginFail();
      setLoginError(true);
    }
  };


  return (
    <>
      <h1>Please Log in to Continue</h1>
      <AuthFormContainer onSubmit={handleSubmit}>
        <AuthInput 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <AuthInput 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <AuthButton type="submit">Login</AuthButton>
        {loginError && <ErrorText>{loginErrorText}</ErrorText>}
      </AuthFormContainer>
    </>
  );
};

export default AuthForm;
