import React from "react";
import "./AddButton.css";

function AddButton({ addNew }) {
  return (
    <div className="add-button-container">
      <button
        className="button is-info is-large"
        onClick={() => {
          addNew();
        }}
      >
        ADD NEW
      </button>
    </div>
  );
}

export default AddButton;
