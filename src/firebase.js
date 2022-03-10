import firebase from "firebase/app";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  //config info
  apiKey: "AIzaSyCU8daBjmhQU7RgTWZLV0fGF88V009KayM",
  authDomain: "react-messenger-app-585fe.firebaseapp.com",
  projectId: "react-messenger-app-585fe",
  storageBucket: "react-messenger-app-585fe.appspot.com",
  messagingSenderId: "236223082378",
  appId: "1:236223082378:web:2edc3c2e6835b2ec8d6273",
  measurementId: "G-MSD1QDXJZ9",
});

const db = firebaseApp.firestore();

export default db;
