import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

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
