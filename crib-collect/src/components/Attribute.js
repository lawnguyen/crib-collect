import React from 'react';
import './Attribute.css';

class Attribute extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <img className="icon" src={this.props.icon}/>
          {this.props.name}
        </td>
        <td>{this.props.value}</td>
      </tr>
    )
  }
}

export default Attribute;