import React from "react";
import FieldLabel from "../FieldLabel/FieldLabel";

function SelectField({ options, label }) {
  return (
    <div className="field">
      <FieldLabel label={label}></FieldLabel>
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
