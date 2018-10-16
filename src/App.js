import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

import Trending from './Components/Trending.js';
import Search from './Components/Search.js';
import Carousel from './Components/Carousel.js';

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
      myGIFs  : [],
      total: 0,
      current: 0,
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

  toggleCarousel() {
    console.log(!this.state.carousel)
    this.setState({carousel: !this.state.carousel})
  }
  onRightClick () {
    if(this.state.current < this.state.total-1) {
      this.state.current++;
      $(".sliderbox").animate({left:"-=400"},200);
      $(".right").animate({left:"+=400"},200);
      $(".left").animate({left:"+=400"},200);
    }
  };

  onLeftClick() {
    if(this.state.current > 0) {
      this.state.current--;
      $(".sliderbox").animate({left:"+=400"},200);
      $(".right").animate({left:"-=400"},200);
      $(".left").animate({left:"-=400"},200);
    }
  }

  toggleView(e) {
    console.log('toggling');
    if (e.target.name !== this.state.trend) {
      let bool = !this.state.trend;
      this.setState({trend: bool})
    } 
  }

  handleChange(event) {
    this.setState({query:event.target.value})
  }
  
  handleSearch() {
    client.search("gifs", {"q": query})
      .then((response) => {
        let searchResults = response.data;
        console.log(searchResults.length)
        this.setState({
          results : searchResults,
        })
      })
      .catch((err) => {console.log(err)})
  }

  render() {
    if (this.state.carousel) {
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>eazy GIPHY</h2>
          </div>
          <Search handleChange={this.handleChange.bind(this)} 
            handleSearch={this.handleSearch.bind(this)}
            query={this.state.query}
            results={this.state.results}/>        
          <Trending trendingGIFS={this.state.trendingGIFs} 
            toggle={this.toggleView.bind(this)}
            carousel={this.toggleCarousel.bind(this)}/>
          <Carousel trendingGIFs={this.state.trendingGIFs}
            left={this.onLeftClick.bind(this)}
            right={this.onRightClick.bind(this)}
            toggleCarousel={this.toggleCarousel.bind(this)}/>
        </div>
      )
  } else if (this.state.trend) {
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>eazy GIPHY</h2>
          </div>
          <Search handleChange={this.handleChange.bind(this)} 
            handleSearch={this.handleSearch.bind(this)}
            query={this.state.query}
            results={this.state.results}/>        
          <Trending trendingGIFS={this.state.trendingGIFs} 
            toggle={this.toggleView.bind(this)}
            carousel={this.toggleCarousel.bind(this)}/>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>eazy GIPHY</h2>
            </div>
            <Search handleChange={this.handleChange.bind(this)} 
              handleSearch={this.handleSearch.bind(this)}
              query={this.state.query}
              results={this.state.results}/>        
            <Trending trendingGIFS={this.state.trendingGIFs}/>
        </div>
      )
    }
  }
}

export default App;


