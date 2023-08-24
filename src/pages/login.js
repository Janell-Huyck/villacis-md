import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";

const LoginPage = () => {
  const isBrowser = typeof window !== "undefined"; // Check if window object is available
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isBrowser) { // Only run this effect in the browser
      const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
        setUser(userAuth);
        if (userAuth) {
          const userRef = doc(db, "users", userAuth.uid);
          const userSnap = await getDoc(userRef);
          setUsername(userSnap.data()?.username);
        }
      });

      return () => unsubscribe(); // Cleanup function to unsubscribe the listener
    }
  }, [isBrowser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {user ? (
        <p>Welcome, {username}!</p>
      ) : (
        <>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPage;
