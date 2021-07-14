import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useState, useEffect } from "react";

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
const uiConfig = {
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

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <p>
        Welcome {firebase.auth().currentUser.displayName}! You are now
        signed-in!
      </p>
      <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
    </div>
  );
}

export default SignInScreen;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
