import React from 'react';

let GIF = function(props) {
  let data = props.data;

  return (
    <div className='GIF-container'>
      {data.map((item)=> 
        <div className='GIF-wrapper' key={item.id}>
          <img className='image' src={item.images.fixed_height.gif_url} />
          <p className='details'>{item.source}</p>
        </div>   
    )}
    </div>
  )
  
}

export default GIF;
