import React from 'react';
import GIF from './GIF.js';

let Trending = (props) => {
 return (
    (props.trendingGIFS.length > 0)?   
    <div className='trending-component'>
        What's Trending
        <GIF data={props.trendingGIFS}/>  
    </div> 
      :
    <div>Hold on GIFs coming!</div>
  )
}
    
    export default Trending;
