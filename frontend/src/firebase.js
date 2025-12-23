
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOklcdvoH7fNxh1gzaFKVFo-58NjrN8lY",
  authDomain: "newfirebase-2f10d.firebaseapp.com",
  databaseURL: "https://newfirebase-2f10d-default-rtdb.firebaseio.com",
  projectId: "newfirebase-2f10d",
  storageBucket: "newfirebase-2f10d.firebasestorage.app",
  messagingSenderId: "517035974142",
  appId: "1:517035974142:web:2f64f8aa812668e25d74af",
  measurementId: "G-5R3P0K7VDB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
