import React from 'react';

let Carousel = (props) => {
  return (
    <div className='Carousel' >  
      <div className='slidebinder' >
        <div className='sliderbox'>

          <div className='left' onClick={props.left}>
            <img src='http://www.thorlux.co.uk/shared/media/arrow-left-white.png'
              width='30px' height ='35px'/>
          </div>

          <div className='slide'>
            {props.trendingGIFs.map(gif => 
              <div className='carousel-GIF-container'>
                <img className='carousel-GIF-wrapper' 
                  key={gif.id} src = {gif.images.downsized_large.gif_url} 
                  onClick = {props.toggleCarousel}/>
              </div>
            )}
          </div>

          <div className='right' onClick={props.right}>
              <img src='http://www.thorlux.com/shared/media/arrow-right-white.png'
              width='30px' height='35px' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel;