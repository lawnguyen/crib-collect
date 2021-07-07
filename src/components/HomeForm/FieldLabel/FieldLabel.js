import React from "react";
import "./FieldLabel.css";

function FieldLabel({ label, isRequired }) {
  return (
    <label className="label">
      {label} <span className="required">{isRequired ? "*" : ""}</span>
    </label>
  );
}

export default FieldLabel;
