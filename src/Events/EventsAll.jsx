import React from "react";
import './EventsAll.css'
import { Button } from 'react-bootstrap';
import TaylorSwift from '../assets/TaylorSwift.jpeg' 
import UFC from '../assets/UFC.jpeg'
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

export const EventsAll = ({onRouteChange}) => {
  return (
    <div className="events-all">

        <div className="sub-nav-buttons">
          <Button variant="light" className="allbutton" href="#EventsAll">All</Button>
          <Button onClick={() => onRouteChange('Music')} variant="light" className="musicbutton" href="#EventsMusic">Music</Button>
          <Button onClick={() => onRouteChange('Sports')} variant="light" className="sportbutton" href="#EventsSports">Sports</Button>
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
