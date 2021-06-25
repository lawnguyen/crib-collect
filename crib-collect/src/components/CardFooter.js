import React from 'react';
import deleteIcon from '../icons/delete.svg';
import editIcon from '../icons/edit.svg';

class CardFooter extends React.Component {
  render() {
    return (
      <footer className="card-footer">
        <a className="card-footer-item">
          <img src={editIcon}/>
        </a>
        <a className="card-footer-item">
          <img src={deleteIcon}/>
        </a>
      </footer>
    )
  }
}

export default CardFooter;