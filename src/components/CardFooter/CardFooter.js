import React from "react";
import deleteIcon from "../../icons/delete.svg";
import editIcon from "../../icons/edit.svg";
import "./CardFooter.css";

class CardFooter extends React.Component {
  render() {
    return (
      <footer className="card-footer">
        <button
          onClick={() => {
            this.props.editHome(this.props.editHomeId);
          }}
          className="card-footer-item"
        >
          <img src={editIcon} alt="edit icon" />
        </button>
        <button className="card-footer-item">
          <img src={deleteIcon} alt="delete icon" />
        </button>
      </footer>
    );
  }
}

export default CardFooter;
