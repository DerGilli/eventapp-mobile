import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDiuBV5XgSTGWX96v_xihD5za7L__qvVFg",
  authDomain: "event-app-3b5d0.firebaseapp.com",
  projectId: "event-app-3b5d0",
  storageBucket: "event-app-3b5d0.appspot.com",
  messagingSenderId: "1079372541571",
  appId: "1:1079372541571:web:90a335597cb2b7bd76f5b6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const auth = firebase.auth();
const db = firebase.firestore();
export { auth, projectStorage, db };