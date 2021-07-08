import React from "react";

function TextField({ placeholder, onChange, name, type }) {
  return (
    <div className="field">
      <div className="control">
        <input
          name={name}
          className="input"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default TextField;
