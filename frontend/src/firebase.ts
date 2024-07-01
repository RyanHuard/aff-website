// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  ProviderId,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import {
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { api } from "./lib/api";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "aff-website-890ce.firebaseapp.com",
  databaseURL: "https://aff-website-890ce-default-rtdb.firebaseio.com",
  projectId: "aff-website-890ce",
  storageBucket: "aff-website-890ce.appspot.com",
  messagingSenderId: "533205865065",
  appId: "1:533205865065:web:90ebf37664defd1ee108f8",
  measurementId: "G-VFW41V4YHW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export function signInWithGoogle() {
  signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    if (user) {
      const role = await getUserRole(user.uid);
      if (role === "general_manager") {
      }
    }
  });
}

async function getUserRole(uid: string) {
  const userRef = doc(db, "managers", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data().role;
  } else {
    return null;
  }
}
