import React, { createContext, useState, useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const AuthContext = createContext();
const loginWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  await signInWithPopup(auth, googleProvider);
};
const logOut = async () => {
  await signOut(auth);
};

export const AuthProvider = ({ children }) => {
  const [userLoged, setUserLoged] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoged(user);
      } else {
        setUserLoged(null);
      }
      setUserLoading(false);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ loginWithGoogle, userLoged, userLoading, logOut, setUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
