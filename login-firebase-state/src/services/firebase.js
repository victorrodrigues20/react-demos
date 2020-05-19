import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyD2pSbnzTk3d_VJsfVfgE4xHD2OgQB5lMw",
  authDomain: "sshop-2bb0e.firebaseapp.com",
  databaseURL: "https://sshop-2bb0e.firebaseio.com",
  projectId: "sshop-2bb0e",
  storageBucket: "sshop-2bb0e.appspot.com",
  messagingSenderId: "986585873372",
  appId: "1:986585873372:web:94073f8b9cadcaebf6ad19"
};

// Initialize Firebase
if (!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

// o firestore não está sendo usado nesse exemplo
export { auth, firestore }