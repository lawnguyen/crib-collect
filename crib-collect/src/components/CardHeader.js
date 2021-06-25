import React from 'react';
import './CardHeader.css';

class CardHeader extends React.Component {
  render() {
    return (
      <header className="card-header">
        <p className="card-header-title">
          <span className="price">
            ${this.props.price}
          </span>
          {this.props.title}
        </p>
      </header>
    )
  }
}

export default CardHeader;