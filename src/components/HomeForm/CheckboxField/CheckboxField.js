import React from "react";
import "./CheckboxField.css";

function CheckboxField({ options }) {
  return (
    <div className="field">
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
