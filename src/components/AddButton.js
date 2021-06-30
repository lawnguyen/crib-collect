import React from 'react';
import './AddButton.css';

class AddButton extends React.Component {
  render() {
    return (
      <div className="add-button-container">
        <button className="button is-info is-large">
          ADD NEW
        </button>
      </div>
    )
  }
}

export default AddButton;