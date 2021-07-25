import React from "react";
import CopyIcon from "../../icons/copy.svg";
import "./CopyToClipboard.css";

function CopyToClipboard() {
  return (
    <div className="control copy-field">
      <input
        className="input"
        type="text"
        value="https://crib-collect.web.app/group/1234124"
        readOnly
      />
      <button className="copy-button">
        <img src={CopyIcon} alt="Copy icon"></img>
      </button>
    </div>
  );
}

export default CopyToClipboard;
