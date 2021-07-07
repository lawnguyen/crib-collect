import React from "react";
import "./RadioField.css";

function RadioField({ options, name }) {
  return (
    <div className="field">
      <div className="control">
        {options.map((option) => {
          return (
            <label key={option} className="radio">
              <input type="radio" name={name} />
              {" " + option}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default RadioField;
