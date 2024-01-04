// Import the functions you need from the SDKs you need

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBKVUuXuYEQJQ6NhH8wKGZQ0gJKQA78INQ",

  authDomain: "phoenixreader-46236.firebaseapp.com",

  projectId: "phoenixreader-46236",

  storageBucket: "phoenixreader-46236.appspot.com",

  messagingSenderId: "169724479299",

  appId: "1:169724479299:web:6422eeee887850e35ed1f6",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app };
