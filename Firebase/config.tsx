import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5BdAwnHyb1qObXAmjTk2hHcHG_y4g-XM",
  authDomain: "money-lender-001.firebaseapp.com",
  projectId: "money-lender-001",
  storageBucket: "money-lender-001.firebasestorage.app",
  messagingSenderId: "862932336979",
  appId: "1:862932336979:web:ff39973ccba77ba74421a6",
  measurementId: "G-DVFJWTHTZX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };