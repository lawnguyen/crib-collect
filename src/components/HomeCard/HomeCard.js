import React from "react";
import CardHeader from "../CardHeader/CardHeader";
import CardFooter from "../CardFooter/CardFooter";
import CardAttributes from "../CardAttributeList/CardAttributesList";
import DateAdded from "../DateAdded/DateAdded";
import "./HomeCard.css";

class HomeCard extends React.Component {
  render() {
    return (
      <div
        className={`card ${this.props.homeDetails.isDeleted ? "deleted" : ""}`}
      >
        {this.props.homeDetails.isDeleted ? (
          <p className="deleted-message">This home posting has been deleted</p>
        ) : null}
        <CardHeader
          title={this.props.homeDetails.title}
          price={this.props.homeDetails.price}
          link={this.props.homeDetails.link}
        ></CardHeader>
        <DateAdded date={this.props.homeDetails.dateAdded}></DateAdded>
        <div className="card-content">
          <CardAttributes
            attributes={this.props.homeDetails.attributes}
          ></CardAttributes>
        </div>
        <CardFooter
          homeId={this.props.homeDetails.id}
          editHome={this.props.editHome}
          deleteHome={this.props.deleteHome}
        ></CardFooter>
      </div>
    );
  }
}

export default HomeCard;
