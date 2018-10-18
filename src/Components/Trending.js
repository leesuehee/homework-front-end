import React from 'react';
import GIF from './GIF.js';

let Trending = (props) => {
 return (
    (props.trendingGIFs.length > 0)?   
    <div className='trending-component'>
      <h2>What's Trending</h2>
        <button onClick={props.refresh} name='trend'> Refresh </button>
        <button > myGIFs </button>
        <GIF data={props.trendingGIFs} toggleCarousel={props.toggleCarousel} view={'trendingGIFs'} />  
    </div> 
      :
    <div>Hold on GIFs coming!</div>
  )
}
    
    export default Trending;
