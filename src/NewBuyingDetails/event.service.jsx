import axios from "axios";

const API_URL = "https://cs203back.azurewebsites.net/api/v1/";

//return list of events, to use for search bar 
const getAllEvents = () => {
  return axios.get(API_URL + "events", {
    
  }).then((response) => { 
    const events = response.data;
    const eventNames = events.map(event => event.eventName);
    return eventNames;
  })
  .catch((error) => {
    console.error("Error fetching events", error);
    throw error;
  });
};



const EventService = {
  getAllEvents
}

export default EventService;
