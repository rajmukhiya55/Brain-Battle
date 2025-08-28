// src/Mycomponents/firebase.js

// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// (optional) Analytics
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxvZi2PALkIRcahrD6hapjZUBsNRIc330",
  authDomain: "brain-battle-11fc9.firebaseapp.com",
  projectId: "brain-battle-11fc9",
  storageBucket: "brain-battle-11fc9.appspot.com", // ✅ fixed domain (was wrong)
  messagingSenderId: "338739573639",
  appId: "1:338739573639:web:0d61c6c090f13959785922",
  measurementId: "G-B2M535XS2K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// (optional) export analytics if you need it
export const analytics = getAnalytics(app);
