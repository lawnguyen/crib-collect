import React, { useState } from "react";
import CopyIcon from "../../icons/copy.svg";
import "./CopyToClipboard.css";

function CopyToClipboard({ textToCopy }) {
    const [tooltipText, updateTooltipText] = useState("Copy to clipboard");
  return (
    <div className="control copy-field">
      <input className="input" type="text" value={textToCopy} readOnly />
      <div className="tooltip">
        <button
          className="copy-button"
          onClick={() => {
            navigator.clipboard.writeText(textToCopy);
            updateTooltipText("Copied!");
          }}
        >
          <span className="tooltiptext">
            {tooltipText}
          </span>
          <img src={CopyIcon} alt="Copy icon"></img>
        </button>
      </div>
    </div>
  );
}

export default CopyToClipboard;
