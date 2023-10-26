import React from "react";
import "./EventsMusic.css";
import TaylorSwift from '../assets/TaylorSwift.jpeg' 
import { EventNavigation } from "../Components/EventNavigation/EventNavigation";

export const EventsMusic = ({onRouteChange}) => {
  return (
    <div className="events-music">

    <EventNavigation onRouteChange={onRouteChange} />
        
        <div className="music-events-overview">
          <div className="event-card">
            <div className="image-div">
                <img onClick={() => {onRouteChange('TSInfo')}} className="event-image" alt="Taylor swift" src={TaylorSwift} />
              </div>

            <div className="title">
              <p className="text-wrapper-2">TAYLOR SWIFT | THE ERAS TOUR</p>  
            </div>
            
            
          </div>
        </div>

    </div>
  );
};

export default EventsMusic
