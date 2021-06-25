import React from 'react';
import Attribute from './Attribute';
import './CardAttributesList.css';

class CardAttributes extends React.Component {
  render() {
    const attributes = this.props.attributes;
    let attrToDisplayMap = {
      bedrooms: { label: "beds", icon: '' },
      bathrooms: { label: "baths", icon: '' },
      sqft: { label: "sqft", icon: '' },
      insuiteLaundry: { label: "w/d", icon: '' },
      neighborhood: { label: "area", icon: '' },
      parking: { label: "parking", icon: '' },
      utilities: { label: "utilities", icon: '' },
      buildingType: { label: "home type", icon: '' },
      notes: { label: "notes", icon: '' }
    };

    return (
      <div className="content">
        <table className="table">
          <tbody>
            {Object.keys(attributes).map(attr => (
              <Attribute
                key={attr}
                icon={attrToDisplayMap[attr].icon}
                name={attrToDisplayMap[attr].label}
                value={attributes[attr]}>
              </Attribute>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default CardAttributes;