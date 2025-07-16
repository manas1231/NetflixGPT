// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFQNhOeh9w_pTF_iAAtynoGCPG3ROoRYQ",
  authDomain: "netflixgpt-4f9b8.firebaseapp.com",
  projectId: "netflixgpt-4f9b8",
  storageBucket: "netflixgpt-4f9b8.firebasestorage.app",
  messagingSenderId: "143544805161",
  appId: "1:143544805161:web:326c4dfb7f4e8d7ff87938",
  measurementId: "G-D8G28KWLY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
