import React from "react";

function SelectField({ options, onChange, name, selected }) {
  return (
    <div className="field">
      <div className="select">
        <select onChange={onChange} name={name}>
          {options.map((option) => {
            return option === selected ? (
              <option selected key={option}>{option}</option>
            ) : (
              <option key={option}>{option}</option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default SelectField;
