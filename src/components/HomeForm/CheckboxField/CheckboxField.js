import React from "react";
import "./CheckboxField.css";

function CheckboxField({ options, onChange, name, selectedList }) {
  return (
    <div className="field">
      {options.map((option) => {
        return selectedList && selectedList.includes(option) ? (
          <label key={option} className="checkbox">
            <input checked onChange={onChange} name={name} type="checkbox" />
            {" " + option}
          </label>
        ) : (
          <label key={option} className="checkbox">
            <input onChange={onChange} name={name} type="checkbox" />
            {" " + option}
          </label>
        );
      })}
    </div>
  );
}

export default CheckboxField;
