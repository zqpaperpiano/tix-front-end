import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/";



//returns list of Dates from eventName
const getDates = (eventName) => {
  return axios.get
    (API_URL + `events/getDatesByName/${eventName}`, {
      eventName
    })
    .then((response) => { 
      const dates = response.data;
      return dates;
    })
    .catch((error) => {
      console.error("Error fetching Dates:", error);
      throw error;
    });
    
}

//returns list of categories from eventName
const getCategories = (eventName) => {
  return axios.get
    (API_URL + `events/getCategoriesByName/${eventName}`, {
      eventName
    })
    .then((response) => { 
      const categories = response.data; 
      return categories;
    })
    .catch((error) => {
      console.error("Error fetching Categories:", error);
      throw error;
    });
    
}

//returns list of available seats from event, date and category
const getSeatNumbers = (eventName, eventDate, eventCategory) => {
  return axios.get
    (API_URL + `events/getEventByNameDate/${eventName}/${eventDate}/ticketByCategory/${eventCategory}/allSeats`, {
      eventName,
      eventDate,
      eventCategory
    })
    .then((response) => { 
      const seats = response.data; 
      return seats;
    })
    .catch((error) => {
      console.error("Error fetching seats:", error);
      throw error;
    });
    
};

//gets the specific ticket according to users input
const getTicketByNameDateCategorySeat = (eventName, eventDate, eventCategory, seatNum) => {
  return axios.get
    (API_URL + `events/getEventByNameDate/${eventName}/${eventDate}/ticketByCategory/${eventCategory}/allSeats/${seatNum}`, {
      eventName,
      eventDate,
      eventCategory,
      seatNum
    })
    .then((response) => {
      const ticket = response.data
      return ticket;
    })
    .catch((error) => {
      console.error("Error fetching ticket:", error);
      throw error;
    });
};

//save new purchase info
const savePurchaseInfo = (eventName, eventDate, eventCategory, seatNum, userId) => {
  return axios.post
    (API_URL + `events/getEventByNameDate/${eventName}/${eventDate}/ticketByCategory/${eventCategory}/allSeats/${seatNum}/purchase/${userId}`, {
      eventName,
      eventDate,
      eventCategory,
      seatNum,
      userId
    })
}


// should return a list of his purchases, returns the first one?
const purchaseInfo = (userId) => {
  return axios.get
  (API_URL + `purchases/${userId}`,{
    userId
  }) .then((response) => { 
    const dates = response.data;
    return dates;
  })
  .catch((error) => {
    console.error("Error fetching purchase Info:", error);
    throw error;
  });
};

const setTicketToSold = (ticketId) =>{
  return axios.put
  (API_URL + `tickets/${ticketId}/sell`), {
    ticketId
  }
}



const TicketService = {
  getDates,
  getCategories,
  getSeatNumbers,
  getTicketByNameDateCategorySeat,
  savePurchaseInfo,
  purchaseInfo,
  setTicketToSold
}

export default TicketService;
