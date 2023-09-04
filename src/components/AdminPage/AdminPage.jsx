import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import AuthForm from '../AuthForm/AuthForm';
import AdminActions from '../AdminActions/AdminActions';
import AdminInstructions from '../AdminInstructions/AdminInstructions';
import AdminEditForm from '../AdminEditForm/AdminEditForm';

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  const setUserRole = async (user) => {
    user.getIdTokenResult().then(idTokenResult => {
      setRole(idTokenResult.claims.role);
    });
  };

  const handleSuccessfulLogin = async (user) => {
    setUser(user);
    setUserRole(user);
  }

  const handleUnsuccessfulLogin = async () => {
    setUser(null);
    setRole("");
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        handleSuccessfulLogin(user);
      } else {
        handleUnsuccessfulLogin();
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  return (
    <div>
      {user ? (
        <>
          {role === 'admin' && (
            <AdminActions />
          )}
          <AdminInstructions />
          <AdminEditForm />
        </>
      ) : (
          <AuthForm onLoginSuccess={handleSuccessfulLogin} onLoginFail={handleUnsuccessfulLogin}  />
      )}
    </div>
  );
};

export default AdminPage;
