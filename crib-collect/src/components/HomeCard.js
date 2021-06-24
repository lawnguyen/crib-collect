/**
 * [
 *  {
 *      "link": "https://vancouver.craigslist.org/van/apa/d/vancouver-spacious-bed-coal-harbor/7338643305.html",
 *      "title": "Spacious 3 Bed w/ Coal Harbor Views *Move-in Incentives and Parking!",
 *      "price": 4000,
 *      "attributes": {
 *          "bedrooms": 3,
 *          "bathrooms": 2,
 *          "sqft": 1500,
 *          "insuiteLaundry": true,
 *          "neighborhood": "Coal Harbour",
 *          "parking": "1 included, rent for $100/month",
 *          "utilities": ["Water", "Electricity", "Heat"],
 *          "buildingType": "Condo",
 *          "notes": "building will be demolished within a year"
 *      }
 *  },
 *  {
 *      "link": "https://www.facebook.com/marketplace/item/4019080401546837/",
 *      "title": "4 Beds · 3 Baths · Townhouse",
 *      "price": 3450,
 *      "attributes": {
 *          "bedrooms": 4,
 *          "bathrooms": 3,
 *          "sqft": 1800,
 *          "insuiteLaundry": true,
 *          "neighborhood": "East Vancouver",
 *          "parking": "1 included",
 *          "utilities": [],
 *          "buildingType": "Townhouse",
 *          "notes": "suspiciously cheap"
 *      }
 *  }
 * ]
 * 
 * Hierarchy:
 * - HomeCard: contains all the home details
 *  - CardHeader: displays title and price
 *  - HomeAttributes: displays all home attribute details
 *  - Date: displays the date added
 *  - EditAttributesButton: button to edit home attribute
 *  - DeleteCardButton: button to delete home card
 */
import React from 'react';

class HomeCard extends React.Component {
  render() {
    return (
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Component
          </p>
          <button class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </header>
        <div class="card-content">
          <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
            <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
            <br />
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Save</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a href="#" class="card-footer-item">Delete</a>
        </footer>
      </div>
    )
  }
}

export default HomeCard;