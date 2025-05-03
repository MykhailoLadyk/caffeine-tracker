import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../../firebase";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}
export function AuthProvider(props) {
  const { children } = props;
  const [globalUser, setGlobalUser] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  function logout() {
    setGlobalUser(null);
    setGlobalData(null);
    return signOut(auth);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return;
      }
      setGlobalUser(user);
      try {
        console.log(user);
        setIsLoading(true);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        let firebaseData = {};
        if (docSnap.exists()) {
          console.log("Found user data");
          firebaseData = docSnap.data();
        }
        setGlobalData(firebaseData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);
  const value = {
    globalUser,
    globalData,
    setGlobalData,
    isLoading,
    signup,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
