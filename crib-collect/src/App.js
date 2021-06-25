import './App.css';
import React from 'react';
import HomeCard from './components/HomeCard.js';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="columns is-multiline">

          {this.props.homes.map(home => (
            <div 
              key={home.link} 
              className="column is-one-quarter-fullhd is-one-half-tablet is-one-third-desktop">
              <HomeCard homeDetails={home}></HomeCard>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
