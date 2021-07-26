import React from "react";
import "./ConfirmationButtons.css";

function ConfirmationButtons({ onCancel, onConfirm }) {
  return (
    <div className="buttons button-container">
      <button onClick={onCancel} className="button is-info is-light">
        Cancel
      </button>
      <button onClick={onConfirm} className="button is-info">
        Confirm
      </button>
    </div>
  );
}

export default ConfirmationButtons;
