// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLSjgZGf6fEFUCq8VjhLZ0TCwb7VSyM4s",
  authDomain: "kangyoo-shoes.firebaseapp.com",
  projectId: "kangyoo-shoes",
  storageBucket: "kangyoo-shoes.appspot.com",
  messagingSenderId: "1044426477678",
  appId: "1:1044426477678:web:795d82700de3716f34967f",
  measurementId: "G-GTKNG3PYDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export { storage, ref, getDownloadURL };