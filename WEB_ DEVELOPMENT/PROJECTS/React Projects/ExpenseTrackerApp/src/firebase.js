// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi70MqlDRDyWehmtsdPehlKPiHF8GSqJU",
  authDomain: "expense-tracker-cf657.firebaseapp.com",
  projectId: "expense-tracker-cf657",
  storageBucket: "expense-tracker-cf657.firebasestorage.app",
  messagingSenderId: "1049078463043",
  appId: "1:1049078463043:web:1f4acfdc7cd4eb701972f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)