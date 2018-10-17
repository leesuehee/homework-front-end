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
      trendingGIFs:[],
      expand   : false,
      size     : '10vh',
      carousel : false,
      query    : '',
      results  : [],
      myGIFs   : [],
      total    : 0,
      current  : 0,
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

  handleChange(event) {
    this.setState({query:event.target.value})
  }

  handleSearch() {
    client.search("gifs", {"q": this.state.query})
      .then((response) => {
        let searchResults = response.data.slice(0,10);
        this.setState({
          results : searchResults,
          expand  : true,
          size    : '75vh',
        })
      })
      .catch((err) => {console.log(err)})
  }

  toggleMinimize() {
    this.setState({
      expand: false,
      size  : '10vh', 
    })
  }

  toggleMaximize() {
    this.setState({
      expand: true,
      size  : '75vh',
    })
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
            query={this.state.query}
            results={this.state.results}/>        
          <Trending trendingGIFS={this.state.trendingGIFs} 
            carousel={this.toggleCarousel.bind(this)}/>
          <Carousel trendingGIFs={this.state.trendingGIFs}
            left={this.onLeftClick.bind(this)}
            right={this.onRightClick.bind(this)}
            toggleCarousel={this.toggleCarousel.bind(this)}/>
        </div>
      )
    } else {
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>eazy GIPHY</h2>
          </div>
          <input className='search-input' value={this.state.query} onChange={this.handleChange.bind(this)}></input>
          <button className='search-button' onClick={this.handleSearch.bind(this)}> search </button>
          <Search  
            handleSearch={this.handleSearch.bind(this)}
            toggleMinimize={this.toggleMinimize.bind(this)}
            toggleMaximize={this.toggleMaximize.bind(this)}
            query={this.state.query}
            results={this.state.results}
            size={this.state.size}
            expand={this.state.expand}/>        
          <Trending trendingGIFS={this.state.trendingGIFs} 
            carousel={this.toggleCarousel.bind(this)}/>
        </div>
      );
    } 
  }
}

export default App;


