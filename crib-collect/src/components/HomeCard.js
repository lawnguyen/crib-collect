/**
 * Hierarchy:
 * - HomeCard: contains all the home details
 *  - CardHeader: displays title and price
 *  - HomeAttributes: displays all home attribute details
 *  - Date: displays the date added
 *  - EditAttributesButton: button to edit home attribute
 *  - DeleteCardButton: button to delete home card
 */
import React from 'react';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';

class HomeCard extends React.Component {
  render() {
    return (
      <div class="card">
        <CardHeader title={this.props.homeDetails.title}></CardHeader>
        <div class="card-content">
          <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
            <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
            <br />
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
        <CardFooter></CardFooter>
      </div>
    )
  }
}

export default HomeCard;