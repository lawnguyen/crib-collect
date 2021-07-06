import React from "react";
import FieldLabel from "../FieldLabel/FieldLabel";

function TextField({ label, placeholder }) {
  return (
    <div className="field">
      <FieldLabel label={ label }></FieldLabel>
      <div className="control">
        <input className="input" type="text" placeholder={ placeholder } />
      </div>
    </div>
  );
}

export default TextField;
