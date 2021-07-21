import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bulma/css/bulma.min.css";
import SignInScreen from "./components/SignInScreen/SignInScreen";

ReactDOM.render(
  <React.StrictMode>
    <SignInScreen></SignInScreen>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
