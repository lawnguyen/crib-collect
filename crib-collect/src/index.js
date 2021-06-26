import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bulma/css/bulma.min.css';

const HOMES = [
  {
    link: "https://vancouver.craigslist.org/van/apa/d/vancouver-spacious-bed-coal-harbor/7338643305.html",
    title: "Spacious 3 Bed w/ Coal Harbor Views Move-in Incentives and Parking!",
    price: 4000,
    dateAdded: 1519211809934,
    attributes: {
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1500,
      laundry: "in-unit",
      neighborhood: "Coal Harbour",
      parking: "1 included, rent for $100/month",
      utilities: ["Water", "Electricity", "Heat"],
      buildingType: "Condo",
      notes: "building will be demolished within a year"
    }
  },
  {
    link: "https://www.facebook.com/marketplace/item/4019080401546837/",
    title: "4 Beds · 3 Baths · Townhouse",
    price: 3450,
    dateAdded: 1519211809769,
    attributes: {
      bedrooms: 4,
      bathrooms: 3,
      sqft: 1800,
      laundry: "in-unit",
      neighborhood: "East Vancouver",
      parking: "1 included",
      utilities: [],
      buildingType: "Townhouse",
      notes: "suspiciously cheap"
    }
  }
];

ReactDOM.render(
  <React.StrictMode>
    <App homes={HOMES}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
