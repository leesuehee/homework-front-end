import React from 'react';
import GIF from './GIF.js';

let giphy = require('./../../key.js')
let GphApiClient = require('giphy-js-sdk-core')
let client = GphApiClient(giphy.key)

export default class Trending extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trendingGIFs:[]
    }
  };

  componentDidMount() {
    client.trending("gifs", {
      limit:5,
    })
      .then((response) => {
        let gifs = response.data;
        this.setState({
          trendingGIFs: gifs
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }

  render() {
    return (
      (this.state.trendingGIFs.length > 0)?   
        <div className='trending-component'>
          What's Trending
          <GIF data={this.state.trendingGIFs}/>  
        </div> 
        :
        <div>Hold on GIFs coming!</div>
    )
  }
}

//TODOs: refactor Trending into a stateless component where props are passed
//       from App component 
