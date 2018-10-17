import React from 'react';

let GIF = function(props) {
  let data = props.data;
  let formatedGIFs = [{total:props.data.length},{data:[]},{carousel:[]}];
  let id = 0;

  props.data.map(gif => {
    let gifData = {}; 
    gifData.size = `${gif.images.fixed_height.height}px`;
    gifData.img = gif.images.fixed_height.gif_url;
    gifData.key = id;
    id++;
    
    if(gif.title) gifData.text = gif.title
    formatedGIFs[1].data.push(gifData)
    formatedGIFs[2].carousel.push(parseInt(gif.images.original.width))
  })

  return (
    <div className='GIF-container'>
      {formatedGIFs[1].data.map((item)=> 
        <div className='GIF-wrapper' key={item.key}
          onClick={(e)=>props.toggleCarousel(formatedGIFs,item.key,props.view)}>
          <img className='image' src={item.img}/>
        </div>   
    )}
    </div>
  )
  
}

export default GIF;
