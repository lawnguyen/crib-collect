import React from "react";
import "./NavBar.css";

function NavBar({ buttonText, username, onClick, userPhotoUrl }) {
  return (
    <nav
      className="navbar is-spaced is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <h1 className="title welcome-message">
              Hi <b>{username}</b>!
            </h1>
          </div>
        </div>
        <div className="navbar-end">
          <img
            className=" navbar-item photo"
            alt="your account pic"
            src={userPhotoUrl}
          ></img>
          <div className="navbar-item">
            <button onClick={onClick} className="button is-danger is-light">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
