import React from "react";
import { useState } from "react";

export const SearchResults = ({eventList}) => {
    const [events, setEvents] = useState(eventList);
    
    

    return(
        <div>
            {
                events.map((event) => {
                    return(
                        <div>
                            {event}
                        </div>
                    )
                })
            }
        </div>
    );
}