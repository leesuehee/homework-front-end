import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Trending from './Components/Trending.js';
import Search from './Components/Search.js'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>eazyPeazy</h2>
        </div>
        <Search/>        

        Trending component below...
        <Trending/>
      </div>
    );
  }
}

export default App;

