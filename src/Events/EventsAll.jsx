import React from "react";
import './EventsAll.css'
import { Button } from 'react-bootstrap';
import TaylorSwift from '../assets/TaylorSwift.jpeg' 
import UFC from '../assets/UFC.jpeg'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css'

export const EventsAll = ({onRouteChange}) => {
  return (
    <div className="events-all">

        <div className="sub-nav-buttons">
          <Button variant="light" className="allbutton" href="#EventsAll">All</Button>
          <Button onClick={() => onRouteChange('Music')} variant="light" className="musicbutton" href="#EventsMusic">Music</Button>
          <Button onClick={() => onRouteChange('Sports')} variant="light" className="sportbutton" href="#EventsSports">Sports</Button>
        </div>

      <div className="carousel">
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={2}>
          <Slider index={0}>I am first</Slider>
          <Slider index={1}>I am first</Slider>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
      </div>
        
      <div className="events-overview">
        <div className="taylor-swift">
        <div className="image">
              <img onClick={() => {onRouteChange('Details')}} className="taylor-2" alt="Taylor swift" src={TaylorSwift} />
            </div>
          <div className="title">
            <p className="text-wrapper-2">TAYLOR SWIFT | THE ERAS TOUR</p>
          </div>
            
          </div>

      <div className="UFC">
            <div className="title">
              <p className="text-wrapper-2">UFC | HOLLOWAY vs THE KOREAN ZOMBIE</p>
            </div>
            <div className="image">
              <img className="UFC-2" alt="Ufc" src={UFC} />
            </div>
          </div>
      </div>

    </div>
  );
};

export default EventsAll
