import React from "react";
import './EventsAll.css'
import { Button } from 'react-bootstrap';
import TaylorSwift from '../assets/TaylorSwift.jpeg' 
import UFC from '../assets/UFC.jpeg'
import UFC2 from '../assets/UFC_resized.jpeg'
import { Carousel } from 'react-responsive-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

export const EventsAll = ({onRouteChange}) => {
  return (
    <div className="events-all">

        <div className="sub-nav-buttons">
          <Button variant="light" className="allbutton" href="#EventsAll">All</Button>
          <Button onClick={() => onRouteChange('Music')} variant="light" className="musicbutton" href="#EventsMusic">Music</Button>
          <Button onClick={() => onRouteChange('Sports')} variant="light" className="sportbutton" href="#EventsSports">Sports</Button>
        </div>

        <div className="carousel">
          <Carousel className="carousel-format" 
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showArrows={true}
          width={1100}>
            <div>
              <img onClick={() => {onRouteChange('TSInfo')}} className="taylor-2" alt="Taylor swift" src={TaylorSwift} />
            </div>

            <div>
              <img className="UFC-2" alt="Ufc" src={UFC2} />
            </div>

          </Carousel>
        </div>
        
      <div className="events-overview">
        <div className="taylor-swift">
        <div className="image">
              <img onClick={() => {onRouteChange('TSInfo')}} className="taylor-2" alt="Taylor swift" src={TaylorSwift} />
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
