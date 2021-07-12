import React from "react";
import "./RadioField.css";

function RadioField({ options, name, onChange, selected }) {
  return (
    <div className="field">
      <div className="control">
        {options.map((option) => {
          return (
            <label key={option} className="radio">
              <input checked={selected === option} onChange={onChange} type="radio" name={name} />
              {" " + option}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default RadioField;
