import React from "react";
import CopyIcon from "../../icons/copy.svg";
import "./CopyToClipboard.css";

function CopyToClipboard({ textToCopy }) {
    console.log(textToCopy);
  return (
    <div className="control copy-field">
      <input
        className="input"
        type="text"
        value={textToCopy}
        readOnly
      />
      <button className="copy-button">
        <img src={CopyIcon} alt="Copy icon"></img>
      </button>
    </div>
  );
}

export default CopyToClipboard;
