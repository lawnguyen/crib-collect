import React from "react";

function SelectField({ options, onChange, name }) {
  return (
    <div className="field">
      <div className="select">
        <select onChange={onChange} name={name}>
          {options.map((option) => {
            return <option key={option}>{option}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

export default SelectField;
