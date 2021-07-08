import React from "react";
import "./SubmitButton.css";

function SubmitButton({ buttonText }) {
  return (
    <div className="submit-button">
      <button className="button is-info">{buttonText}</button>
    </div>
  );
}

export default SubmitButton;
