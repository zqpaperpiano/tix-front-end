import React from "react";
import "./EventsSports.css";
import UFC from '../assets/UFC.jpeg'
import { EventNavigation } from "../Components/EventNavigation/EventNavigation";

export const EventsSports = ({onRouteChange}) => {
  return (
    <div className="events-sports">

      <EventNavigation onRouteChange={onRouteChange} />

      <div className="events-overview">
        <div className="event-card">
          <div className="image-div">
            <img onClick={() => {onRouteChange("UFCInfo")}} className="event-image" alt="Ufc" src={UFC} />
          </div>
          
          <div className="title">
            <p onClick={() => {onRouteChange("UFCInfo")}} className="text-wrapper-2">UFC | HOLLOWAY vs THE KOREAN ZOMBIE</p>
          </div>
            
          </div>
      </div>

      </div>
  );
};

export default EventsSports
