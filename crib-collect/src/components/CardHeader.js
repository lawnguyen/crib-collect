import React from 'react';

class CardHeader extends React.Component {
  render() {
    return (
      <header className="card-header">
        <p className="card-header-title">
          {this.props.title}
        </p>
      </header>
    )
  }
}

export default CardHeader;