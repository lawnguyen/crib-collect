import React from "react";
import FieldLabel from "../FieldLabel/FieldLabel";
import "./CheckboxField.css";

function CheckboxField({ label, options }) {
  return (
    <div className="field">
      <FieldLabel label={label}></FieldLabel>
      {options.map((option) => {
        return (
          <label className="checkbox">
            <input type="checkbox" />
            {" " + option}
          </label>
        );
      })}
    </div>
  );
}

export default CheckboxField;
