import React from "react";
import './EventsAll.css'  
import TaylorSwift from '../assets/TaylorSwift.jpeg' 
import UFC from '../assets/UFC.jpeg'
import { EventNavigation } from "../Components/EventNavigation/EventNavigation";

export const EventsAll = ({onRouteChange}) => {
  return (
    <div className="events-all">

        <EventNavigation onRouteChange={onRouteChange} />
        
      <div className="events-overview">
        <div className="event-card">

          <div className="image-div">
                <img onClick={() => {onRouteChange('TSInfo')}} className="event-image" alt="Taylor swift" src={TaylorSwift} />
          </div> {/*end of div for image */}

          <div className="title">
              <p onClick={() => {onRouteChange('TSInfo')}} className="text-wrapper-2">TAYLOR SWIFT | THE ERAS TOUR</p>
          </div>{/*end of div for title */}

        </div> {/* end of div for taylor swift  */}
              
        <div className="event-card">

          <div className="image-div">
                <img className="event-image" onClick={() => {onRouteChange("UFCInfo")}} alt="Ufc" src={UFC} />
          </div> {/*end of div for image */}

          <div className="title">
            <p onClick={() => {onRouteChange("UFCInfo")}} className="text-wrapper-2">UFC | HOLLOWAY vs THE KOREAN ZOMBIE</p>
          </div>{/*end of div for title */}

        </div> {/* end of div for UFC  */}

      </div> {/*end of div for events-overview */}

    </div>
  );
};

export default EventsAll
