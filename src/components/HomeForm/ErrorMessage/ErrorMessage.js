import React from "react";
import "./ErrorMessage.css";
import errorIcon from "../../../icons/error.svg";

function ErrorMessage({ message }) {
  if (message) {
    return (
      <p className="message">
        <img className="icon" alt={"error icon"} src={errorIcon} />
        {message}
      </p>
    );
  }
  return <p></p>;
}

export default ErrorMessage;
