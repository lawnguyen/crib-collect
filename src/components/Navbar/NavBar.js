import React from "react";

function NavBar({ buttonText, username, onClick }) {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="welcome">
            <b>Welcome {username}</b>
          </div>
          <div className="buttons">
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
