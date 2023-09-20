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

        

    </div>
  );
};

export default EventsAll
