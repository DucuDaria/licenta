import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect, useContext, createContext } from "react";

const firebaseConfig = {
 apiKey: "AIzaSyDa434iUwiyBD_d70X4oCpmCXDYQpA1v7Q",
    authDomain: "licenta2025daria.firebaseapp.com",
    projectId: "licenta2025daria",
    storageBucket: "licenta2025daria.firebasestorage.app",
    messagingSenderId: "738908804621",
    appId: "1:738908804621:web:7df06df89c2ff481e8a744",
    measurementId: "G-985L0STLTV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Hook de autentificare global
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default app;