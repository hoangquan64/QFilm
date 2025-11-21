import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTjmzTWhWTYHOEhan9-LMWbnadozfeKrI",
  authDomain: "qfilm2005-533ba.firebaseapp.com",
  projectId: "qfilm2005-533ba",
  storageBucket: "qfilm2005-533ba.firebasestorage.app",
  messagingSenderId: "1014212545531",
  appId: "1:1014212545531:web:ee605dfb55219366ed195e",
  measurementId: "G-36CMYX808S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();