import React from 'react';
import './CardHeader.css';
import openLink from '../icons/openlink.svg';

class CardHeader extends React.Component {
  render() {
    return (
      <header className="card-header">
        <a href={this.props.link} target="_blank" className="card-header-title">
          <span className="price">
            ${this.props.price}
          </span>
          {this.props.title}&nbsp;
          <img className="link-icon" src={openLink} />
        </a>
      </header>
    )
  }
}

export default CardHeader;