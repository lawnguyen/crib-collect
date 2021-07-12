import React from "react";

function TextField({ placeholder, onChange, name, type, step, value }) {
  return (
    <div className="field">
      <div className="control">
        <input
          name={name}
          className="input"
          type={type}
          step={step}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
}

export default TextField;
