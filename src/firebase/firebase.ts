import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDVWDsAi1Ax-oe-9-DF9v2bI9f9PxQt_6E",
  authDomain: "poqrikheros-af1ff.firebaseapp.com",
  projectId: "poqrikheros-af1ff",
  storageBucket: "poqrikheros-af1ff.appspot.com",
  messagingSenderId: "202968855717",
  appId: "1:202968855717:web:e9a1fcceef0d75f5f6c94c",
  measurementId: "G-RC0FVJ0DM5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };
