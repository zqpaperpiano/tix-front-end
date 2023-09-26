import React from "react";
import "./EventsSports.css";
import { Button } from 'react-bootstrap';
import UFC from '../assets/UFC.jpeg'

export const EventsSports = ({onRouteChange}) => {
  return (
    <div className="events-all">
      <div className="div">

        <Button onClick={() => onRouteChange('AllEvents')} variant="light" className="allbutton" href="#EventsAll">All</Button>
        <Button onClick={() => onRouteChange('Music')} variant="light" className="musicbutton" href="#EventsMusic">Music</Button>
        <Button variant="light" className="sportbutton" href="#EventsSports">Sports</Button>

        <div className="UFC">
          <p className="text-wrapper-2">UFC | HOLLOWAY vs THE KOREAN ZOMBIE</p>
          <img className="UFC-2" alt="Ufc" src={UFC} />
        </div>

      </div>
    </div>
  );
};

export default EventsSports
