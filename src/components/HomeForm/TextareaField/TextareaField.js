import React from "react";

function TextareaField({ placeholder, onChange, name }) {
  return (
    <textarea
      onChange={onChange}
      name={name}
      className="textarea"
      placeholder={placeholder}
    ></textarea>
  );
}

export default TextareaField;
