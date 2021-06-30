import React from "react";
import "./Attribute.css";

class Attribute extends React.Component {
  render() {
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
        <td>{this.props.value.toString()}</td>
      </tr>
    );
  }
}

export default Attribute;
