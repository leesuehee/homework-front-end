import React from 'react';

let Carousel = (props) => {
  let slideData = [{total:0}, {data:[]}];
  let id = 1;
  let responseGIFs = (props.view==='trendingGIFs')?props.trendingGIFs:props.results;

  responseGIFs.map(gif => {
    let gifData = {}
    slideData[0].total += parseInt(gif.images.original.width);
    gifData.size =`${parseInt(gif.images.original.width)}px`;
    gifData.img = gif.images.original.gif_url;
    gifData.id = id;
    id++;

    if (gif.title) gifData.text = gif.title;
    slideData[1].data.push(gifData)
  })

  let slideWidth = slideData[0].total + 'px';
  let boxWidth = `${props.queue[props.cur]}px`
  let rightPos = `${(props.queue[props.cur]-35)}px`

  return (
    <div className='Carousel' >  
      <div className='slidebinder' style={{width:boxWidth}}>
        <div className='sliderbox' style={{width:slideWidth} }>
          <div className='left' onClick={props.left}>
            <img src='http://www.thorlux.co.uk/shared/media/arrow-left-white.png'
              width='30px' height ='35px'/>
          </div>
        {slideData[1].data.map(gif => 
        <div className='slide' key={gif.id}>
          <div className='carousel-GIF-container' 
            style={{width:gif.size, height:'auto'}}>
          <img className='carousel-GIF-wrapper' 
            src={gif.img} 
            onClick={props.toggleCarousel}/>
          </div>
        </div>
        )}
          <div className='right' onClick={props.right} style={{'left':rightPos}}>
              <img src='http://www.thorlux.com/shared/media/arrow-right-white.png'
              width='30px' height='35px' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel;