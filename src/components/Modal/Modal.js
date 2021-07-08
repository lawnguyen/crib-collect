import React from "react";
import "./Modal.css";

function Modal({ title, children, onCloseModal }) {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <article className="message is-info">
          <div className="message-header">
            <p>{title}</p>
            <button onClick={onCloseModal} className="delete" aria-label="delete"></button>
          </div>
          <div className="message-body">
            {children}
          </div>
        </article>
      </div>
      <button onClick={onCloseModal} className="modal-close is-large" aria-label="close"></button>
    </div>
  );
}

export default Modal;
