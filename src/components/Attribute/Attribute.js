import React from "react";
import "./Attribute.css";

class Attribute extends React.Component {
  render() {
    const value = this.props.value;
    return (
      <tr>
        <td>
          <img
            className="icon"
            alt={`${this.props.name} icon`}
            src={this.props.icon}
          />
          <span className="attr-name">{this.props.name}</span>
        </td>
        <td>{Array.isArray(value) ? value.join(', ') : value.toString()}</td>
      </tr>
    );
  }
}

export default Attribute;
