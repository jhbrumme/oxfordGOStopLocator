// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"


// Initialize Cloud Firestore through Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyABRJ_JDSfUy995M4SosmdznxTPmQPInkM",
  authDomain: "cs354-ad273.firebaseapp.com",
  projectId: "cs354-ad273",
  storageBucket: "cs354-ad273.appspot.com",
  messagingSenderId: "320187960902",
  appId: "1:320187960902:web:1e30ff322192b86fba0447",
  measurementId: "G-R2R72D4SLS"
});

const db = getFirestore();
//console.log(db);
export default db;


