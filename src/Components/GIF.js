import React from 'react';

let GIF = function(props) {
  let data = props.data;
  let formatedGIFs = [{total:props.data.length},{details:[]},{binderWidth:0}];
  let id = 0;

  data.map(gif => {
    let gifData = {}; 
    gifData.size = `${gif.images.fixed_height.height}px`;
    gifData.img = gif.images.fixed_height.gif_url;
    gifData.IMG = gif.images.original.gif_url;
    gifData.key = id;
    gifData.width = `${gif.images.original.width}px`;
    gifData.height = `${gif.images.original.height}px`;
    formatedGIFs[2].binderWidth += parseInt(gif.images.original.width);
    id++;

    gifData.text = gif.title;
    formatedGIFs[1].details.push(gifData);
  })

  return (
    <div className='GIF-container'>
      {formatedGIFs[1].details.map((item)=> 
        <div className='GIF-wrapper' key={item.key}
          onClick={(e)=>props.toggleCarousel(formatedGIFs,item.key,props.view)}>
          <img className='image' src={item.img}/>
        </div>   
    )}
    </div>
  )
  
}

export default GIF;
