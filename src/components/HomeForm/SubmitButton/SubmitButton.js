import React from "react";

function SubmitButton({ buttonText, onSubmit }) {
  return (
    <button onClick={onSubmit} className="button is-info">
      {buttonText}
    </button>
  );
}

export default SubmitButton;
