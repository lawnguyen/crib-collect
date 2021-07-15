import { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import NavBar from "../Navbar/NavBar";
import { auth, uiConfig } from "../../firebase";
import App from "../../App";

function SignInScreen({ homes }) {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    );
  }
  return (
    <div>
      <NavBar
        username={auth.currentUser.displayName}
        buttonText="Sign out"
        onClick={() => auth.signOut()}
        userPhotoUrl={auth.currentUser.photoURL}
      ></NavBar>
      <App homes={homes} />
    </div>
  );
}

export default SignInScreen;
