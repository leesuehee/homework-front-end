import React from 'react';

export default class Trending extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trendingGIFs:[]
    }
  };

  componentDidMount() {
    // ping trending end point here 
    // upon successful ping update the trendingGIF state 
    // render with the trending GIFs
  }

  render() {
    return (
      <div className='trending-component'>
        Im Trending... 
        <p>
          the current GIF state 
        </p>   
      </div>
    )
  }
}

//TODOs: refactor Trending into a stateless component where props are passed
//       from App component 
