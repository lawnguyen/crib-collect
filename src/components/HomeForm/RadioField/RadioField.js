import React from "react";
import "./RadioField.css";

function RadioField({ options, name, onChange, selected }) {
  return (
    <div className="field">
      <div className="control">
        {options.map((option) => {
          return selected === option ? (
            <label key={option} className="radio">
              <input checked onChange={onChange} type="radio" name={name} />
              {" " + option}
            </label>
          ) : (
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
