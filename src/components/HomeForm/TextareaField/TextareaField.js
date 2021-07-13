import React from "react";

function TextareaField({ placeholder, onChange, name, value }) {
  return (
    <textarea
      onChange={onChange}
      name={name}
      className="textarea"
      placeholder={placeholder}
      value={value}
    ></textarea>
  );
}

export default TextareaField;
