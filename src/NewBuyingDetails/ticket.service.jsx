import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/";
axios.defaults.withCredentials = true

//returns list of Dates from eventName
//not in the list!!
const getDates = (eventName) => {
  return axios.get
    (API_URL + `events/getDatesByName/${eventName}`, {
      eventName
    }, 
    { withCredentials: true,}
    )
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
//edited
const getCategoriesByName = (eventName) => {
  return axios.get
    (API_URL + `event/${eventName}/Categories`, {
      eventName
    }, 
    { withCredentials: true,}
    )
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
//edited
const getTicketSeatNumberByEventNameAndCategory = (eventName, eventDate, eventCategory) => {
  return axios.get
    (API_URL + `ticket/${eventName}/${eventDate}/${eventCategory}/getAvailableSeat`, {
      eventName,
      eventDate,
      eventCategory
    },
        { withCredentials: true,}
    )
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
//edited
const getTicketByEventNameDateAndCategoryAndSeatNum = (eventName, eventDate, eventCategory, seatNum) => {
  return axios.get
    (API_URL + `ticket/${eventName}/${eventDate}/${eventCategory}/${seatNum}/getTicket`, {
      eventName,
      eventDate,
      eventCategory,
      seatNum
    }, 
        { withCredentials: true,}
    )
    .then((response) => {
      const ticket = response.data;
      // localStorage.setItem("ticket", JSON.stringify(response.data));
      return ticket;
    })
    .catch((error) => {
      console.error("Error fetching ticket:", error);
      throw error;
    });
};

//get all tickets regarrdless of availability, from each category
//edited
const getAllSeatNumberByEventNameAndCategory = (eventName, eventDate, eventCategory) => {
  return axios.get
  (API_URL + `ticket/${eventName}/${eventDate}/${eventCategory}/getSeatNumbers`, {
    eventName,
    eventDate,
    eventCategory
  },
    {withCredentials: true,}
  )
  .then((response) => {
    const ticket = response.data;
    return ticket;
  })
  .catch((error) => {
    console.error("Error fetching ticket:", error);
    throw error;
  })
};

//save new purchase info
//EDITED
const purchaseTicket = (eventName, eventDate, eventCategory, seatNum, userId) => {
  return axios.post
    (API_URL + `ticket/${eventName}/${eventDate}/${eventCategory}/${seatNum}/${userId}/addPurchase`, {
      eventName,
      eventDate,
      eventCategory,
      seatNum,
      userId
    }, 
    { withCredentials: true }
    );
};


//returns the purchase entity as JSON
//edited
const getSinglePurchaseByTicketId = (ticketId) => {
  return axios.get
    (API_URL + `purchases/${ticketId}/getPurchase`, {
    }, 
        { withCredentials: true,}
    )
    .then((response) => {
      const purchase = response.data;
      return purchase;
    })
    .catch((error) => {
      console.error("Error fetching purchase:", error);
      throw error;
    });
    
}


//retruns the list of purchases user made
//edited
const userPurchase = (userId) => {
  return axios.get
    (API_URL + `purchases/${userId}/getUserPurchases`, {
    },
        { withCredentials: true,}
    )
    .then((response) => {
      const userPurchases = response.data;
      return userPurchases;
    })
    .catch((error) => {
      console.error("Error fetching user's purchases:", error);
      throw error;
    });
}

//delete a purchase
//edited
const deletePurchase = (purchaseId) => {
  return axios.delete 
  (API_URL +`purchases/${purchaseId}/deletePurchase`, {
    purchaseId
  }, 
      // { withCredentials: true,}
  );
} 

//get queue number of current user
//edited
const findQueueNumber = (eventName, userId) => {
  return axios.get
  (API_URL + `event/${eventName}/${userId}/getQueueNum`, {
  }, 
    {withCredentials: true,}
  )
  .then((response) => {
    const QueueNo = response.data;
    console.log(QueueNo);
    return QueueNo;
  }).catch((error) => {
    console.error("Error fetching user's queue number:", error);
    throw error;
  });
}

//add user to queue
//edited
const addToWaitingList = (userId, eventName) => {
  return axios.post
  (API_URL + `event/${userId}/${eventName}/enqueue`, {
  }, 
    {withCredentials: true,}
  )
  .then((response) => {
    const inSet = response.data;
    console.log(inSet)
    return inSet;
  }).catch((error) => {
    console.error("Error fetching information:", error);
    throw error;
  });
}

//set a timeout for users, within which they must complete their purchase
//edited
const sendUserToHomePage = (userId, eventName) => {
  return axios.put
  (API_URL + `ticket/${eventName}/${userId}/deleteUserFromSet`, {
  }, 
    {withCredentials: true,}
  )
  .then((response) => {
    const inSet = response.data;
    console.log(inSet)
    return inSet;
  }).catch((error) => {
    console.error("Error fetching information:", error);
    throw error;
  });
}


const TicketService = {
  getDates,
  getCategoriesByName,
  getTicketSeatNumberByEventNameAndCategory,
  getTicketByEventNameDateAndCategoryAndSeatNum,
  purchaseTicket,
  getSinglePurchaseByTicketId,
  userPurchase,
  deletePurchase,
  findQueueNumber,
  getAllSeatNumberByEventNameAndCategory,
  addToWaitingList,
  sendUserToHomePage
}

export default TicketService;