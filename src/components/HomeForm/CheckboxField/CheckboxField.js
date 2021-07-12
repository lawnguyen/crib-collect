import React from "react";
import "./CheckboxField.css";

function CheckboxField({ options, onChange, name, selectedList }) {
  return (
    <div className="field">
      {options.map((option) => {
        return (
          <label key={option} className="checkbox">
            <input
              checked={selectedList && selectedList.includes(option)}
              onChange={onChange}
              name={name}
              type="checkbox"
            />
            {" " + option}
          </label>
        );
      })}
    </div>
  );
}

export default CheckboxField;
