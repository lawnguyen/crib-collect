import React from "react";
import deleteIcon from "../../icons/delete.svg";
import editIcon from "../../icons/edit.svg";
import starIcon from "../../icons/star.svg";
import "./CardFooter.css";

class CardFooter extends React.Component {
  render() {
    return (
      <footer className="card-footer">
        <button
          onClick={() => {
            this.props.editHome(this.props.homeId);
          }}
          className="card-footer-item"
        >
          <img src={editIcon} alt="edit icon" />
        </button>

        <button
          onClick={() => {
            console.log("rating");
          }}
          className="card-footer-item"
        >
          <img src={starIcon} alt="rating icon" />
        </button>

        <button
          onClick={() => {
            this.props.deleteHome(this.props.homeId);
          }}
          className="card-footer-item"
        >
          <img src={deleteIcon} alt="delete icon" />
        </button>
      </footer>
    );
  }
}

export default CardFooter;
