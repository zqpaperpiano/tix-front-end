import React from "react";
import { Button } from 'react-bootstrap';

export const EventNavigation = ({onRouteChange}) => {
    return(
        <div className="sub-nav-buttons">
          <Button onClick={() => onRouteChange('AllEvents')} variant="light" className="allbutton" href="#EventsAll">All</Button>
          <Button onClick={() => onRouteChange('Music')} variant="light" className="musicbutton" href="#EventsMusic">Music</Button>
          <Button onClick={() => onRouteChange('Sports')} variant="light" className="sportbutton" href="#EventsSports">Sports</Button>
        </div>
    );
}