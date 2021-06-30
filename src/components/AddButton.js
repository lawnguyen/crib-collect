import React from 'react';
import './AddButton.css';

function AddButton(props) {
  return (
    <div className="add-button-container">
      <button className="button is-info is-large" onClick={() => {
        props.addNew();
      }}>
        ADD NEW
      </button>
    </div>
  )
}

export default AddButton;