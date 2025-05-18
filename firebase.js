// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABJhKf5suoKrUPTI6qKF1DVCeV51ENa08",
  authDomain: "mentoraapp-7c915.firebaseapp.com",
  projectId: "mentoraapp-7c915",
  storageBucket: "mentoraapp-7c915.firebasestorage.app",
  messagingSenderId: "251816072807",
  appId: "1:251816072807:web:514e5188e869b98c05a6c2",
  measurementId: "G-T03S2SV79K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
