import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/";
axios.defaults.withCredentials = true

//returns list of Dates from eventName
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
const getCategories = (eventName) => {
  return axios.get
    (API_URL + `events/getCategoriesByName/${eventName}`, {
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
const getSeatNumbers = (eventName, eventDate, eventCategory) => {
  // console.log(API_URL + `events/getEventByNameDate/${eventName}/${eventDate}/ticketByCategory/${eventCategory}/allSeats`);
  return axios.get
    (API_URL + `events/getEventByNameDate/${eventName}/${eventDate}/ticketByCategory/${eventCategory}/allAvailableSeats`, {
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
const getTicketByNameDateCategorySeat = (eventName, eventDate, eventCategory, seatNum) => {
  return axios.get
    (API_URL + `events/getEventByNameDate/${eventName}/${eventDate}/ticketByCategory/${eventCategory}/allSeats/${seatNum}`, {
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

const getAllTicketsFromDateCategory = (eventName, eventDate, eventCategory) => {
  return axios.get
  (API_URL + `events/getEventByNameDate/${eventName}/${eventDate}/ticketByCategory/${eventCategory}/allSeatNumbers`, {
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
const savePurchaseInfo = (eventName, eventDate, eventCategory, seatNum, userId) => {
  return axios.post
    (API_URL + `events/${eventName}/${eventDate}/${eventCategory}/${seatNum}/${userId}`, {
      eventName,
      eventDate,
      eventCategory,
      seatNum,
      userId
    }, 
    { withCredentials: true }
    );
};

//returns the ticket stored in the local Storage
const getCurrentTicket = () => {
  return JSON.parse(localStorage.getItem("ticket"));
};

//returns the purchase entity as JSON
const getPurchaseInfoFromTicketId = (ticketId) => {
  return axios.get
    (API_URL + `purchases/byTicketId/${ticketId}`, {
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

const generatePDF = (purchaseId) => {
  return axios.post
  (API_URL + "purchases/${purchaseId}/pdf", {
  }, 
    {withCredentials: true,}
  )
  .then(() => {
  }).catch((error) => {
    console.error("generatePDF", error);
    throw error;
  });
}

//retruns the list of purchases user made
const getUserPurchasesFromUserId = (userId) => {
  return axios.get
    (API_URL + `purchases/byUserId/${userId}`, {
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

const deletePurchase = (purchaseId) => {
  return axios.delete 
  (API_URL +`purchases/${purchaseId}`, {
    purchaseId
  }, 
      // { withCredentials: true,}
  );
} 

const getQueueNumber = (eventName, userId) => {
  return axios.get
  (API_URL + `queueNum/${eventName}/${userId}`, {
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

const saveSetOrQueue = (userId, eventName) => {
  return axios.post
  (API_URL + `buy/${userId}/${eventName}`, {
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

const timeout = (userId, eventName) => {
  return axios.put
  (API_URL + `home/${userId}/${eventName}`, {
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
  getCategories,
  getSeatNumbers,
  getTicketByNameDateCategorySeat,
  savePurchaseInfo,
  getCurrentTicket,
  getPurchaseInfoFromTicketId,
  getUserPurchasesFromUserId,
  deletePurchase,
  getQueueNumber,
  getAllTicketsFromDateCategory,
  generatePDF,
  saveSetOrQueue
}

export default TicketService;
