import React from 'react';
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
      size     : '7vh',
      carousel : false,
      query    : '',
      results  : [],
      myGIFs   : [],
      total    : 0,
      current  : 0,
      view     : 'trendingGIFs',
      slides   : [],
    }
  }

  componentDidMount() {
    this.refresh()
  }
  refresh() {
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

  setSlide(data,id) {
    let setSlide = this.state.slides[1].details.slice(0,id).reduce((width,item)=>{
      return width += item
    },0)
    $(".sliderbox").animate({left:`-=400`},200);
    $(".right").animate({left:`+=${setSlide}`},200);
    $(".left").animate({left:`+=${setSlide}`},200);    
  }

  toggleCarousel(data,id,view) {
    console.log('data', data)
    this.setState({
      carousel: !this.state.carousel,
      current : 0,
      slides  : data,
      view    : view,
      total   : data[0].total
    })
  }
  onRightClick () {
    let move = this.state.slides[1].details[this.state.current].width;
    let right = this.state.slides[1].details[this.state.current+1].width;
    if(this.state.current < this.state.total) {
      this.state.current++;
      $(".sliderbox").animate({left:`-=${move}`},200);
      $(".right").animate({left:`+=${right}`},200);
      $(".left").animate({left:`+=${move}`},200);
    }
  };
  onLeftClick() {
    let move = this.state.slides[1].details[this.state.current-1].width
    let right = this.state.slides[1].details[this.state.current].width
    if(this.state.current > 0) {
      this.state.current--;
      $(".sliderbox").animate({left:`+=${move}`},200);
      $(".right").animate({left:`-=${right}`},200);
      $(".left").animate({left:`-=${move}`},200);
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
          size    : '65vh',
        })
      })
      .catch((err) => {console.log(err)})
  }
  toggleMinimize() {
    this.setState({
      expand: false,
      size  : '7vh', 
    })
  }
  toggleMaximize() {
    this.setState({
      expand: true,
      size  : '65vh',
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
          <Search results={this.state.results}/>        
          <Trending trendingGIFs={this.state.trendingGIFs} 
            toggleCarousel={this.toggleCarousel.bind(this)}/>
          <Carousel 
            slides={this.state.slides}
            view={this.state.view}
            cur={this.state.current}
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
            toggleCarousel={this.toggleCarousel.bind(this)}
            size={this.state.size}
            expand={this.state.expand}/>        
          <Trending 
            trendingGIFs={this.state.trendingGIFs} 
            toggleCarousel={this.toggleCarousel.bind(this)}
            refresh={this.refresh.bind(this)}/>
        </div>
      );
    } 
  }
}

export default App;


