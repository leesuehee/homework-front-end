import React from 'react';
import GIF from './GIF.js';

let Search = (props) => {
  let search = props.query;
  
  return (
    (props.results.length > 0)?
    <div className='search-component'>
      <input value={search} onChange={props.handleChange}></input>
      <button onClick={props.handleSearch}> search </button>
      
      <div className='search-results'>
        <GIF data={props.results}/>
      </div>
    </div>
    :
    <div className='search-component'>
      <input value={search} onChange={props.handleChange}></input>
      <button onClick={props.handleSearch}> search</button>
    </div>  
  )
}
  


export default Search;