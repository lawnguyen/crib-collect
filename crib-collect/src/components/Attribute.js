import React from 'react';

class Attribute extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.value}</td>
      </tr>
    )
  }
}

export default Attribute;