import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: "arlanda-queue.firebaseapp.com",
  projectId: "arlanda-queue",
  storageBucket: "arlanda-queue.appspot.com",
  messagingSenderId: "982820982130",
  appId: "1:982820982130:web:888690dc44905b35a821eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app, "europe-west1");
