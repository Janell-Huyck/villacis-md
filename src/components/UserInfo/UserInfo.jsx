import React, {useEffect, useState} from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { fetchUserName } from '../../firebase/firebaseOperations';
import { UserInfoContainer, UserText, LogoutButton } from './UserInfo.styles';

const UserInfo = () => {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;
        const fetchedUserName = await fetchUserName(uid);
        if (fetchedUserName) {
          setUsername(fetchedUserName);
        }
        setLoggedIn(true);
      } else {
        setUsername("");
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setUsername("");
    setLoggedIn(false);
  };

  return (
    <>
      {loggedIn && (
        <UserInfoContainer>
          <UserText>Logged in as: {username}</UserText>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserInfoContainer>
      )}
    </>
  );
};

export default UserInfo;
