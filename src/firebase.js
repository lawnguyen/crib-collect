import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4zBRZG9lrUzMkz11mqMVRKj2xtGZ5qSI",
  authDomain: "crib-collect.firebaseapp.com",
  projectId: "crib-collect",
  storageBucket: "crib-collect.appspot.com",
  messagingSenderId: "227975714132",
  appId: "1:227975714132:web:22b023b9eaf9a1099924c1",
  measurementId: "G-CBWW7PJQYP",
};
firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const firebaseUiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export const uiConfig = firebaseUiConfig;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
