import React from 'react';
import GIF from './GIF.js';

let Search = (props) => {
  if(props.results.length > 0) {
    return (
      <div>
        <div className='search-component' style={{height:props.size}}>
          <div className='search-results'>
            <GIF data={props.results} toggleCarousel={props.toggleCarousel} view={'results'}/>
          </div>
        </div>      
        {props.expand ? 
          <button className='minimize' onClick={props.toggleMinimize}> Minimize </button>
          :
          <button className='maximize' onClick={props.toggleMaximize}> Expand </button>
        }
      </div>
    )
  } else {
    return (
      <div className='search-component' style={{height:props.size}}>
      <div>
        <div className='search-results'>
          Let's see what you find!
        </div>
      </div>
      {props.expand ? 
        <button className='minimize' onClick={props.toggleMinimize}> Minimize </button>
        :
        <button className='maximize' onClick={props.toggleMaximize}> Expand </button>
        }
      </div>
    )
  }
}

export default Search;