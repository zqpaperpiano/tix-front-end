import React from "react";
import "./EventsMusic.css";
import { Button } from 'react-bootstrap';
import TaylorSwift from '../assets/TaylorSwift.jpeg' 

export const EventsMusic = ({onRouteChange}) => {
  return (
    <div className="events-music">

        <Button onClick={() => onRouteChange('AllEvents')} variant="light" className="allbutton" href="#EventsAll">All</Button>
        <Button variant="light" className="musicbutton" href="#EventsMusic">Music</Button>
        <Button onClick={() => onRouteChange('Sports')} variant="light" className="sportbutton" href="#EventsSports">Sports</Button>
        
        <div className="music-events-overview">
          <div className="ts-music">
            <div className="music-title">
              <p className="text-wrapper">TAYLOR SWIFT | THE ERAS TOUR</p>  
            </div>
            
            <div className="music-image">
              <img onClick={() => {onRouteChange('TSInfo')}} className="taylor-2" alt="Taylor swift" src={TaylorSwift} />
            </div>
          </div>
        </div>

    </div>
  );
};

export default EventsMusic
