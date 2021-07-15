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
        <NavBar isSignedIn={false}></NavBar>
        <div className="card">
          <div className="card-content">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </div>
        </div>
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
        isSignedIn={true}
      ></NavBar>
      <App homes={homes} />
    </div>
  );
}

export default SignInScreen;
