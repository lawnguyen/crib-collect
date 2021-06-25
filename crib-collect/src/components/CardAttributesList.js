import React from 'react';
import Attribute from './Attribute';

class CardAttributes extends React.Component {
  render() {
    const attributes = this.props.attributes;
    return (
      <div class="content">
        {Object.keys(attributes).map(attr => (
          <Attribute name={attr} value={attributes[attr]}></Attribute>
        ))}
      </div>
    )
  }
}

export default CardAttributes;