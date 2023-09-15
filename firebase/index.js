import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDFkOYlvZSg2ReCNTeF7arzxumY3mMWi-0",
  authDomain: "doimiy.firebaseapp.com",
  databaseURL: "https://doimiy-default-rtdb.firebaseio.com",
  projectId: "doimiy",
  storageBucket: "doimiy.appspot.com",
  messagingSenderId: "967042551570",
  appId: "1:967042551570:web:3925dc74f1eb694ed66dcb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {
    db
}