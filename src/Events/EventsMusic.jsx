import React from "react";
import "./EventsMusic.css";
import { Button } from 'react-bootstrap';
import TaylorSwift from '../assets/TaylorSwift.jpeg' 

export const EventsMusic = ({onRouteChange}) => {
  return (
    <div className="events-all">
      <div className="div">

        <Button onClick={() => onRouteChange('AllEvents')} variant="light" className="allbutton" href="#EventsAll">All</Button>
        <Button variant="light" className="musicbutton" href="#EventsMusic">Music</Button>
        <Button onClick={() => onRouteChange('Sports')} variant="light" className="sportbutton" href="#EventsSports">Sports</Button>
        
        <div className="taylor-swift">
          <p className="text-wrapper">TAYLOR SWIFT | THE ERAS TOUR</p>
          <img className="taylor-2" alt="Taylor swift" src={TaylorSwift} />
        </div>

      </div>
    </div>
  );
};

export default EventsMusic
