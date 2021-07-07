import React from "react";

function TextField({ placeholder }) {
  return (
    <div className="field">
      <div className="control">
        <input className="input" type="text" placeholder={ placeholder } />
      </div>
    </div>
  );
}

export default TextField;
