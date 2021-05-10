import React, { useContext } from 'react'
import { auth } from './config'

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email,password)
  };

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        setLoading(false)
   })
   return unsubscribe
  }, [])

  const value = {
    currentUser, 
    signUp,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children }
    </AuthContext.Provider>
  )
}

