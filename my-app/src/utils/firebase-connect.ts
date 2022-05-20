import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"

// const {
//   REACT_APP_FIREBASE_API_KEY,
//   REACT_APP_AUTH_DOMAIN,
//   REACT_APP_DATABASE_URL,
//   REACT_APP_PROJECT_ID,
//   REACT_APP_STORAGE_BUCKET,
//   RAECT_APP_MESSAGING_SENDER_ID,
//   REACT_APP_API_ID,
// } = process.env;



const firebaseConfig = {
  apiKey: "AIzaSyBWkfbjRMTSHtMupWmb9nMMZ8dncZ0yhAs",
  authDomain: "webmarket-299505.firebaseapp.com",
  databaseURL: "https://webmarket-299505-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webmarket-299505",
  storageBucket: "webmarket-299505.appspot.com",
  messagingSenderId: "405375357493",
  appId: "1:405375357493:web:1c5149c5124583bb6cd77c"
};



const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const authDB = getAuth(app);
export const firebaseStorage = getStorage(app);


