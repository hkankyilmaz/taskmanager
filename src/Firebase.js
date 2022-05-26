import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDbs2a6NOaOXTFf25JGrJJjUK8djlGng2k",
  authDomain: "eshop-b7dff.firebaseapp.com",
  projectId: "eshop-b7dff",
  storageBucket: "eshop-b7dff.appspot.com",
  messagingSenderId: "856482228455",
  appId: "1:856482228455:web:d006cf27e60ab18472da42",
  measurementId: "G-KKMPQWTC8V"
};

const fireBaseApp = initializeApp(firebaseConfig);
const auth = getAuth(fireBaseApp);
const db = getFirestore(fireBaseApp);

const storage = getStorage(fireBaseApp);
//const provider=new GoogleAuthProvider()

export { db, auth, storage };


