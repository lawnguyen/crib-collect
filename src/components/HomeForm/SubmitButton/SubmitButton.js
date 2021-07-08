import React from "react";
import "./SubmitButton.css";

function SubmitButton({ buttonText, onSubmit }) {
  return (
    <div className="submit-button">
      <button onClick={onSubmit} className="button is-info">{buttonText}</button>
    </div>
  );
}

export default SubmitButton;
