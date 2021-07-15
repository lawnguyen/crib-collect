import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bulma/css/bulma.min.css";
import { firestore } from "./firebase";
import SignInScreen from "./components/SignInScreen/SignInScreen";

let HOMES = [];

firestore
  .collection("homes")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      HOMES.push(doc.data());
    });

    ReactDOM.render(
      <React.StrictMode>
        <SignInScreen homes={HOMES}></SignInScreen>
      </React.StrictMode>,
      document.getElementById("root")
    );
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
