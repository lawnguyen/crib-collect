import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4zBRZG9lrUzMkz11mqMVRKj2xtGZ5qSI",
  authDomain: "crib-collect.firebaseapp.com",
  projectId: "crib-collect",
  storageBucket: "crib-collect.appspot.com",
  messagingSenderId: "227975714132",
  appId: "1:227975714132:web:22b023b9eaf9a1099924c1",
  measurementId: "G-CBWW7PJQYP"
};
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();