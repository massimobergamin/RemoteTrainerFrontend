import React, { useContext, useState, useEffect, createContext } from 'react'
import { auth } from './config'

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password, type) {
    let userInfo = auth.createUserWithEmailAndPassword(email, password)
    auth.currentUser.updateProfile({ displayName: type });
    return userInfo;
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email,password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
   })
   return unsubscribe;
  }, [])

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children }
    </AuthContext.Provider>
  )
}
