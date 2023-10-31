import React, { useState, useContext, useEffect, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children, initialUser = null }) {
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState(null);

  async function logIn(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }
  async function signUp(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }
  async function logOut() {
    try {
      await signOut(auth);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, setUser, logIn, signUp, logOut, error, setError }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
