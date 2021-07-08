import React from "react";

function TextField({ placeholder, onChange, name }) {
  return (
    <div className="field">
      <div className="control">
        <input
          name={name}
          className="input"
          type="text"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default TextField;
