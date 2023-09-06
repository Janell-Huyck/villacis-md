import React, { useState, useEffect,  useCallback } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import AuthForm from '../../components/AuthForm/AuthForm';
import AdminActions from '../../components/AdminActions/AdminActions';
import AdminInstructions from '../../components/AdminInstructions/AdminInstructions';
import AdminEditForm from '../../components/AdminEditForm/AdminEditForm';

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  const setUserRole = async (user) => {
    user.getIdTokenResult().then(idTokenResult => {
      setRole(idTokenResult.claims.role);
    });
  };

  const handleSuccessfulLogin = useCallback(async (user) => {
    setUser(user);
    setUserRole(user);
  }, []);

  const handleUnsuccessfulLogin = useCallback(async () => {
    setUser(null);
    setRole("");
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        handleSuccessfulLogin(user);
      } else {
        handleUnsuccessfulLogin();
      }
    });
  
    return () => unsubscribe();
  },  [handleSuccessfulLogin, handleUnsuccessfulLogin]);
  
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
