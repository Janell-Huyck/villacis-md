import { doc, getDoc, collection, query, orderBy, limit, getDocs  } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { db, auth } from "../firebase/firebaseConfig";


export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.log("Firebase was unable to log in that email/password combination.");
  }
  return { success: false, user: null };
};

export const logout = () => {
  return signOut(auth);
};

export const fetchUserName = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    return userSnap.data()?.username;
  } catch (error) {
    return null;
  }
};

// Firebase doesn't allow us to read all collections, so we are creating
// a list of all collections dynamically based off our Gatsby pages.
export const generateCollectionNames = (pageNames) => {
  const excludeNames = ['dev-404-page', '404.html', 'admin'];
  const filteredPageNames = pageNames.filter(name => !excludeNames.includes(name));

  const collectionNames = filteredPageNames.map(name => {
    // Home page is a special case
    if (name === '') {
      return ['home_en', 'home_es'];
    }
    return [`${name}_en`, `${name}_es`];
  }).flat();

  return collectionNames;
};

export const fetchMostRecentDoc = async (collectionName) => {
  try {
    const q = query(
      collection(db, collectionName),
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    let mostRecentDoc = null;
    querySnapshot.forEach((doc) => {
      mostRecentDoc = { id: doc.id, ...doc.data() };
    });

    return mostRecentDoc;
  } catch (error) {
    console.error("Error fetching the most recent document:", error);
    return null;
  }
};
