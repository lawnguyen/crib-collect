import React from 'react';
import Attribute from './Attribute';
import './CardAttributesList.css';

class CardAttributes extends React.Component {
  render() {
    const attributes = this.props.attributes;
    return (
      <div className="content">
        <table className="table is-narrow">
          <tbody>
            {Object.keys(attributes).map(attr => (
                <Attribute key={attr} name={attr} value={attributes[attr]}></Attribute>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default CardAttributes;