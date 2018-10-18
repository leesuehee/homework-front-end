import React from 'react';

let Carousel = (props) => {
    let allSlides = props.slides[1].details;
    let slideWidth = props.slides[1].details[props.cur].width + 'px';
    let boxWidth = props.slides[2].binderWidth + 'px';
    let rightPos = parseInt(props.slides[1].details[props.cur].width)-35 + 'px';

  return (
    <div className='Carousel' >  
      <div className='slidebinder' style={{width:slideWidth,height:'auto'}}>
        <div className='sliderbox' style={{width:boxWidth}}>
          <div className='left' onClick={props.left}>
            <img src='http://www.thorlux.co.uk/shared/media/arrow-left-white.png'
              width='30px' height ='35px'/>
          </div>
        {allSlides.map(gif => 
        <div className='slide' key={gif.key} 
            style={{width:gif.width, height:'auto'}}>
          <div className='carousel-GIF-container' >
          <img className='carousel-GIF-wrapper' 
            src={gif.IMG} 
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