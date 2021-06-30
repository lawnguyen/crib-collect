import React from "react";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import CardAttributes from "./CardAttributesList";
import DateAdded from "./DateAdded";

class HomeCard extends React.Component {
  render() {
    return (
      <div className="card">
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
        <CardFooter></CardFooter>
      </div>
    );
  }
}

export default HomeCard;
