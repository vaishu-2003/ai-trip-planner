// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYKW8V7elUHqi91300jHq4in_YoMjmQJM",
  authDomain: "ai-trip-planner-auth.firebaseapp.com",
  projectId: "ai-trip-planner-auth",
  storageBucket: "ai-trip-planner-auth.appspot.com", // ✅ FIXED HERE
  messagingSenderId: "1079843609504",
  appId: "1:1079843609504:web:478a3b218d491936aae2c5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
