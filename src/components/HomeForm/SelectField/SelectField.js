import React from "react";

function SelectField({ options, onChange, name, selected }) {
  return (
    <div className="field">
      <div className="select">
        <select value={selected} onChange={onChange} name={name}>
          {options.map((option) => {
            return <option key={option}>{option}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

export default SelectField;
