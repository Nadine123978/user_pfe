// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD561xtbiRgWG97BHVbE9VbF8-e07Ncquo",
  authDomain: "springbootdemo-a7725.firebaseapp.com",
  projectId: "springbootdemo-a7725",
  storageBucket: "springbootdemo-a7725.appspot.com",
  messagingSenderId: "170367058392",
  appId: "1:170367058392:web:1dc42e62e97cc10d0072ad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
