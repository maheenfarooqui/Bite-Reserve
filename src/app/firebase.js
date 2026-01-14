import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDl2B15g36dj_dfUNEwS-7hFcxyIVf75H0",
  authDomain: "bitereserve.firebaseapp.com",
  projectId: "bitereserve",
  storageBucket: "bitereserve.firebasestorage.app",
  messagingSenderId: "695782472554",
  appId: "1:695782472554:web:4ae5b28a8a9e6622a70313"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);