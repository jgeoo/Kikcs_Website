
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUE48CQ-cWgsEvFjEHsM9PofZeCTpXCDg",
  authDomain: "kicks-website.firebaseapp.com",
  projectId: "kicks-website",
  storageBucket: "kicks-website.appspot.com",
  messagingSenderId: "339437707467",
  appId: "1:339437707467:web:8952fd5d53bd661b75fb4e",
  measurementId: "G-PNXHL1T1X1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);
export  {auth };