import React from 'react';
import './DateAdded.css';

class DateAdded extends React.Component {
  render() {
    return (
      <div className="date">
        Date added: {new Date(this.props.date).toDateString()}
      </div>
    )
  }
}

export default DateAdded;