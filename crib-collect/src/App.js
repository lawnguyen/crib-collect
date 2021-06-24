import './App.css';
import HomeCard from './components/HomeCard.js';

function App() {
  return (
    <div class="app">
      <div class="columns is-multiline">
        <div class="column is-one-quarter">
          <HomeCard></HomeCard>
        </div>
        <div class="column is-one-quarter">
          <HomeCard></HomeCard>
        </div>
        <div class="column is-one-quarter">
          <HomeCard></HomeCard>
        </div>
        <div class="column is-one-quarter">
          <HomeCard></HomeCard>
        </div>
        <div class="column is-one-quarter">
          <HomeCard></HomeCard>
        </div>
        <div class="column is-one-quarter">
          <HomeCard></HomeCard>
        </div>
      </div>
    </div>
  );
}

export default App;
