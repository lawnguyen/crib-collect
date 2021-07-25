import React from "react";
import ShareIcon from "../../icons/share.svg";

function ShareButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <img src={ShareIcon} alt="Share icon"></img>
    </button>
  );
}

export default ShareButton;
