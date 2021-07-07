import React from "react";
import "./CheckboxField.css";

function CheckboxField({ options }) {
  return (
    <div className="field">
      {options.map((option) => {
        return (
          <label key={option} className="checkbox">
            <input type="checkbox" />
            {" " + option}
          </label>
        );
      })}
    </div>
  );
}

export default CheckboxField;
