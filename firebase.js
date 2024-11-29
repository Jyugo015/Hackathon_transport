import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase project configuration (found in the Firebase Console under "Project Settings")
const firebaseConfig = {
  apiKey: "AIzaSyCMpwWdMFCmjjywDNzzzA8yXabKCsBYk3U",
  authDomain: "transportation-9807f.firebaseapp.com",
  projectId: "transportation-9807f",
  storageBucket: "transportation-9807f.firebasestorage.app",
  messagingSenderId: "1022719929860",
  appId: "1:1022719929860:web:88a131723113eb0f434f51",
  measurementId: "G-NMVHGRNJNQ"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };