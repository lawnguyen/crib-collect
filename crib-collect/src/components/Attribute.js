import React from 'react';

class Attribute extends React.Component {
  render() {
    return (
        <div>
            {this.props.name}: {this.props.value}
        </div>
    )
  }
}

export default Attribute;