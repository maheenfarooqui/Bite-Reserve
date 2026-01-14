import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { auth } from "../app/firebase";

// Signup Function
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login Function
export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout Function
export const logOut = () => {
  return signOut(auth);
};