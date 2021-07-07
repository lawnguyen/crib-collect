import React from "react";

function SelectField({ options }) {
  return (
    <div className="field">
      <div className="select">
        <select>
          {options.map((option) => {
            return <option>{option}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

export default SelectField;
