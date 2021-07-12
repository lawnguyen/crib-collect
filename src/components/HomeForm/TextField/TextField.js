import React from "react";

function TextField({ placeholder, onChange, name, type, step, value, isError }) {
  return (
    <div className="field">
      <div className="control">
        <input
          name={name}
          className={`input ${isError ? "is-danger" : ""}`}
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
