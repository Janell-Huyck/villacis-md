import { createContext, useState, useEffect, useContext } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
   currentUser: null,
   setCurrentUser: () => {}
   });

const UserProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(null);

   useEffect(() => {
       const unsubscribe = onAuthStateChangedListener(async (user) => {
           if (user) {
               await createUserDocumentFromAuth(user)
           }
           setCurrentUser(user);
       })
       return unsubscribe;
   }, []);

   return (
       <UserContext.Provider value={{ currentUser, setCurrentUser }}>
           {children}
       </UserContext.Provider>
   );
}

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };