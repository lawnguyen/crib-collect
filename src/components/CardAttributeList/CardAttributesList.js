import React from "react";
import Attribute from "../Attribute/Attribute";
import "./CardAttributesList.css";
import bed from "../../icons/bed.svg";
import bath from "../../icons/bath.svg";
import sqft from "../../icons/sqft.svg";
import laundry from "../../icons/laundry.svg";
import neighborhood from "../../icons/neighborhood.svg";
import parking from "../../icons/parking.svg";
import utilities from "../../icons/utilities.svg";
import building from "../../icons/building.svg";
import notes from "../../icons/notes.svg";
import aircon from "../../icons/aircon.svg";
import starIcon from "../../icons/star.svg";

class CardAttributes extends React.Component {
  render() {
    const attributes = this.props.attributes;
    let attrToDisplayMap = {
      rating: { label: "rating avg.", icon: starIcon },
      bedrooms: { label: "beds", icon: bed },
      bathrooms: { label: "baths", icon: bath },
      sqft: { label: "sqft", icon: sqft },
      laundry: { label: "w/d", icon: laundry },
      neighborhood: { label: "area", icon: neighborhood },
      parking: { label: "parking", icon: parking },
      utilities: { label: "utilities", icon: utilities },
      airConditioning: { label: "ac", icon: aircon },
      buildingType: { label: "type", icon: building },
      notes: { label: "notes", icon: notes },
    };

    return (
      <div className="content">
        <table>
          <tbody>
            {Object.keys(attrToDisplayMap).map((attr) => (
              <Attribute
                key={attr}
                icon={attrToDisplayMap[attr].icon}
                name={attrToDisplayMap[attr].label}
                value={attributes[attr]}
              ></Attribute>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CardAttributes;
