import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Trending from './Components/Trending.js';
import Search from './Components/Search.js'

let giphy = require('./../key.js')
let GphApiClient = require('giphy-js-sdk-core')
let client = GphApiClient(giphy.key)


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trend   : true,
      search  : false,
      carousel: false,
    
      trendingGIFs:[],
      query   : '',
      results : [],
    }
  }

  componentDidMount() {
    client.trending("gifs", {
      limit:10,
    })
      .then((response) => {
        let gifs = response.data;
        this.setState({trendingGIFs: gifs});
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleChange(event) {
    this.setState({query:event.target.value})
  }
  
  handleSearch() {
    let query =  this.state.search;
    client.search("gifs", {"q": query})
      .then((response) => {
        let searchResults = response.data;
        this.setState({
          results : searchResults,
        })
        console.log(searchResults)
      })
      .catch((err) => {console.log(err)})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>eazy GIPHY</h2>
        </div>
        <Search handleChange={this.handleChange.bind(this)} 
          handleSearch={this.handleSearch.bind(this)}
          query={this.state.query}
          results={this.state.results}
        />        
        <Trending trendingGIFS={this.state.trendingGIFs}/>
      </div>
    );
  }
}

export default App;


