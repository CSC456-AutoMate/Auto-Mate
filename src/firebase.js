import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MSG_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};


// const firebaseConfig = {
//   apiKey: "AIzaSyD2QoxBvznalBozoY6BgF7Iuq6h0mglUCo",
//   authDomain: "automate-ac7be.firebaseapp.com",
//   projectId: "automate-ac7be",
//   storageBucket: "automate-ac7be.appspot.com",
//   messagingSenderId: "730484918576",
//   appId: "1:730484918576:web:281ba02c15f786e79260f5",
// };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

