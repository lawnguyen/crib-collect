import './App.css';
import React from 'react';
import HomeCard from './components/HomeCard.js';

class App extends React.Component {
  render() {
    return (
      <div class="app">
        <div class="columns is-multiline">

          {this.props.homes.map(home => (
            <div class="column is-one-quarter-tablet is-one-fifth-desktop">
              <HomeCard homeDetails={home} key={home.link}></HomeCard>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
