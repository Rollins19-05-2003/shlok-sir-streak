// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1B39kzDXVdx8zzVU8hCdiHFAEtuNE8zA",
  authDomain: "login-auth-9854c.firebaseapp.com",
  projectId: "login-auth-9854c",
  storageBucket: "login-auth-9854c.appspot.com",
  messagingSenderId: "709063013234",
  appId: "1:709063013234:web:dfa3f8a2610949488a63eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);
export default app;