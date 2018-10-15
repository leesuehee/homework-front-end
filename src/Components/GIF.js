import React from 'react';

let GIF = function(props) {
  let data = props.data;

  return (
    <div className='GIF-container'>
      {data.map((item)=> 
        <div className='GIF-wrapper'>
          <img className='image' src={item.images.fixed_height.gif_url} />
          <p className='title'>{item.title}</p>
          <p className='source'>{item.source}</p>
        </div>   
    )}
    </div>
  )
  
}

export default GIF;
