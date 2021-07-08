import React from "react";
import "./RadioField.css";

function RadioField({ options, name, onChange }) {
  return (
    <div className="field">
      <div className="control">
        {options.map((option) => {
          return (
            <label key={option} className="radio">
              <input onChange={onChange} type="radio" name={name} />
              {" " + option}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default RadioField;
