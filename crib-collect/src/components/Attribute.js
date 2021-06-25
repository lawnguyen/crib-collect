import React from 'react';

class Attribute extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <span>
            {this.props.icon}
          </span>
          {this.props.name}
        </td>
        <td>{this.props.value}</td>
      </tr>
    )
  }
}

export default Attribute;