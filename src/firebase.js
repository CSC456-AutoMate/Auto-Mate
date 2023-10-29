import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2QoxBvznalBozoY6BgF7Iuq6h0mglUCo",
  authDomain: "automate-ac7be.firebaseapp.com",
  projectId: "automate-ac7be",
  storageBucket: "automate-ac7be.appspot.com",
  messagingSenderId: "730484918576",
  appId:"1:730484918576:web:281ba02c15f786e79260f5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

