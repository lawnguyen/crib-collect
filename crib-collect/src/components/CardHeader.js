import React from 'react';

class CardHeader extends React.Component {
  render() {
    return (
      <header class="card-header">
        <p class="card-header-title">
          {this.props.title}
        </p>
      </header>
    )
  }
}

export default CardHeader;