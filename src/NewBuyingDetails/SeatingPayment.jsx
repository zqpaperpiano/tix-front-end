import React, { useState, useEffect } from "react";
import TicketService from "./ticket.service";
import AuthService from "../LoginSignUp/services/auth.service";
import './SeatingPayment.css';
import Stripe from "react-stripe-checkout";
import axios from "axios";
import StripeButton from "../Components/StripePayment/StripeButton";



export const SeatingPayment = ({purchase, onRouteChange, currentEvent}) => {
    const currentUser = AuthService.getCurrentUser();
    const [eventName, setName] = useState(currentEvent);

    const [eventDates, setEventDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [chosenDate, setChosenDate] = useState("");

    const [eventCategories, setEventCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [chosenCategory, setChosenCategory] = useState("");

    const [listOfAvailableSeats, setListOfAvailableSeats] = useState([]);
    const [listOfAllSeats, setListOfAllSeats] = useState([]);
    const [listOfTakenSeats, setListOfTakenSeats] = useState([]);

    const [chosenSeat, setChosenSeat] = useState([]);
    const [detailsOfChosenSeats, setDetailsOfChosenSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [ticketDetails, setTicketDetails] = useState(null);
    const [message, setMessage] = useState("");

    const [userPurchases, setUserPurchases] = useState([]);


    async function handleToken(token) {
      console.log(token);
      await axios
        .post("https://cs203back.azurewebsites.net/api/payment/charge", "", {
          headers: {
            token: token.id,
            amount: 500,
          },
        })
        .then(() => {
          alert("Payment Success");
        })
        .catch((error) => {
          alert(error);
        });
    }

    const onChangeDate = (e) => {
        const selectedDate = e.target.value;
        if (selectedDate != "Select a Date"){
            onChangingEventOrCategory();
            setSelectedDate(selectedDate);
        } else {
          alert("Please select a Date");
        }
      };
    
    const onChangeCategory = (e) => {
        const selectedCategory = e.target.value;
        if (selectedCategory != "Select a Category"){
            onChangingEventOrCategory();
            setSelectedCategory(selectedCategory);
        } else {
          alert("Please select a Category");
        }
      };

      
    //fetch dates upon page load
    useEffect(() => {
        TicketService.getDates(eventName).then((dates) => {
        setEventDates(dates);
        });
    }, [eventName]);

    //fetch categories upon page load
    useEffect(() => {
        TicketService.getCategories(eventName).then((categories) => {
        setEventCategories(categories);
        });
    }, [eventName]);

    //calculate which seats r unvailable
    const findUnavailableSeats = (availableSeats, allSeats) => {
      const set = new Set();
      const unavailableSeats = [];
      const dateString = selectedDate.split("-").join("");

      for(const seats of availableSeats){
        set.add(seats);
      }

      // console.log('allSeats:', allSeats);

      allSeats.map((seats) => {
        if(!set.has(seats)){
          let unavailableSeatId = `c${selectedCategory}s${seats}d${dateString}`;
          unavailableSeats.push(unavailableSeatId);
          set.add(seats);
        }else{
          set.delete(seats);
        }
      })      
      setListOfTakenSeats(unavailableSeats);
      return unavailableSeats;
    }

    //mark unavailable seats as red
    const markUnavailableSeats = (unavailableSeats) => {
      const allSeats = document.getElementsByClassName("seats-image");
      for(const seat of allSeats){
        seat.classList.remove("occupied");
      }
      
      unavailableSeats.map((seats) => {
        let correspondingSeat = document.getElementById(seats);
        correspondingSeat.classList.add("occupied");
      })
    }
    
    //fetch available seats from name, date and cat
    const handleDateCategorySubmit = () => {
      onChangingEventOrCategory();
      setChosenDate(selectedDate);
      setChosenCategory(selectedCategory);
      TicketService.getSeatNumbers(eventName, selectedDate, selectedCategory)
      .then((numbers) => {
        TicketService.getAllTicketsFromDateCategory(eventName, selectedDate, selectedCategory)
        .then((tickets) => {
          setListOfAllSeats(tickets);
          setTimeout(() => {
            markUnavailableSeats(findUnavailableSeats(numbers, tickets));
          }, 300);
        })
        setListOfAvailableSeats(numbers);
      }, (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message)  
            || error.message  
            || error.toString();
          setMessage(resMessage);
      });
    };

    //add ticket details to an array of currently selected tickets
    const addTicketDetails = (seat) => {
      let updatedDetails = detailsOfChosenSeats.slice();
      let seatNo = parseInt(seat[3]);
      let ticketPrice = 0;
      let date = extractDate(seat);

      TicketService.getTicketByNameDateCategorySeat(eventName, selectedDate, selectedCategory, seatNo)
      .then((ticket) => {
        let tixDetails = {
          "ticketID": ticket.id,
          "date": selectedDate,
          "price": ticket.price,
          "cat": ticket.category,
          "seatNum": ticket.seatNum,
          "seatID": `c${selectedCategory}s${seatNo}d${date}`
        }
        ticketPrice = ticket.price;
        updatedDetails.push(tixDetails);
        calculateTotalPrice(ticketPrice);
        setDetailsOfChosenSeats(updatedDetails);
      })
    }

    const extractDate = (seatID) => {
      let date = "";
      for(var i = 5; i < seatID.length; ++i){
        date += seatID[i];
      }
      return date;
    }

    //remove ticket details from an array of currently selected tickets
    const removeTicketDetails = (seatID) => {
      let updatedDetails = detailsOfChosenSeats.filter((ticket) => {
        if(ticket.seatID !== seatID){
          return ticket;
        }
      })

      let currentTicket = detailsOfChosenSeats.filter((ticket) => {
        if(ticket.seatID === seatID){
          return ticket;
        }
      })

      let price = currentTicket[0].price;
      console.log(price);
      price = -price;
      calculateTotalPrice(price);
      setDetailsOfChosenSeats(updatedDetails);
    }

    //remove seats that have been selected for a different date and cat
    const unmarkSelected = () => {
      let seats = document.getElementsByClassName("seats-image");
      
      for(let i =0; i < seats.length; ++i){
        let seat = seats[i];
        if(checkIfExists(seat.classList, "selected")){
          seat.classList.remove("selected");
        }
      }
    }

    //remark seats that have been originally selected
    const markSelected = () => {
      chosenSeat.map((seat) => {
        let cat = seat[1];
        let date = extractDate(seat);

        let shortenedSelectedDate = selectedDate.split("-").join("");
        if(cat === selectedCategory && date === shortenedSelectedDate){
          let selectedSeat = document.getElementById(seat);
          selectedSeat.classList.add("selected");
        }
      })
    }

    const onChangingEventOrCategory = () => {
      unmarkSelected();
      markSelected();
    }

    // save purchase info 
    const handlePayment = (listOfDetailedTickets, ticketEventName, userID) => {
      let noOfTix = listOfDetailedTickets.length;
      localStorage.setItem("noOfTickets", JSON.stringify(noOfTix));

      listOfDetailedTickets.map((ticket, i) => {
        let storageNumber = i + 1;
        let ticketCat = ticket.cat
        let seatNo = ticket.seatNum;
        let ticketDate = ticket.date
        TicketService.savePurchaseInfo(ticketEventName, ticketDate, ticketCat, seatNo, userID)
        .then (
          () => {
            localStorage.setItem(`ticket${storageNumber}`, ticket.ticketID);
          },(error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setMessage(resMessage);
            })
          })
    };

    //check if a certain value exists within an array
  const checkIfExists = (list, value) => {
      for(var i = 0; i < list.length; ++i){
        if(list[i] === value){
          return true;
      }
    }
    return false;
  }

  const calculateTotalPrice = (changeInPrice) => {
    let price = totalPrice;
    price += changeInPrice;
    setTotalPrice(price);

  }

  const removeSeatNoFromChosenList = (currentSeatID, listOfChosenSeats) => {
    let currentSeat = document.getElementById(currentSeatID);
    currentSeat.classList.remove("selected");
    listOfChosenSeats = listOfChosenSeats.filter((seat) => {
      return seat != currentSeatID;
    })
    return listOfChosenSeats;
  }

    const onClickSeats = (event) => {
      var occupied = false;
      var currentSeatID = event.currentTarget.id;
      var listOfChosenSeats = chosenSeat.slice();

      listOfTakenSeats.map((seat) => {
        if(seat === currentSeatID){
          occupied = true;
        }
      })
      if(!occupied){
        const currentSeat = document.getElementById(currentSeatID);
        const currentClass = currentSeat.classList;

        if(!checkIfExists(currentClass, "selected")){
          if(chosenSeat.length >= 4){
            alert("You can only choose up to 4 tickets");
          }else{
            currentSeat.classList.add("selected");
            listOfChosenSeats.push(currentSeatID);
            addTicketDetails(currentSeatID);
          }
        }else{
          removeTicketDetails(currentSeatID);
          listOfChosenSeats = removeSeatNoFromChosenList(currentSeatID, listOfChosenSeats);
        }
        setChosenSeat(listOfChosenSeats);
      }
    }

    // console.log('eventName:', eventName);
    return (
      <div className="seating-payment">
        <div className="seat-selection-area">
          <label htmlFor="dateDropdown">Select an Event Date:</label>
          <select
            id="dateDropdown"
            value={selectedDate}
            onChange={onChangeDate}
          >
            <option value="">Select a Date</option>
            {eventDates.map((eventDate) => (
              <option key={eventDate} value={eventDate}>
                {eventDate}
              </option>
            ))}
          </select>

          <label htmlFor="categoryDropdown">Select a Seating Category:</label>
          <select
            id="categoryDropdown"
            value={selectedCategory}
            onChange={onChangeCategory}
          >
            <option value="">Select a Category</option>
            {eventCategories.map((eventCategory) => (
              <option key={eventCategory} value={eventCategory}>
                {eventCategory}
              </option>
            ))}
          </select>

          <button onClick={handleDateCategorySubmit}>Select Seats</button>

          {chosenCategory !== "" && chosenDate !== "" ?
          (
            <div className="seating-map-div">
            {listOfAllSeats.map((seat, i) => {
              let seatNo = i + 1;
              let date = selectedDate.split('-').join("");
              var id =`c${selectedCategory}s${seatNo}d${date}`;
                return(
                  <div id={id} 
                  onClick={onClickSeats}
                  className={`seats-image`}>{`${seat}`}</div>
                )
              })}
          </div>
          )
        : null
        }

            <StripeButton price={totalPrice} onRouteChange={onRouteChange} 
            listOfDetailedTickets = {detailsOfChosenSeats}
            userID={currentUser.id}
            eventName = {eventName}
            handlePayment={handlePayment} /> 
        </div>

        <div className="customer-order-div">
          <div className="customer-particulars">
            <div className="customer-name">
              <p className="text-wrapper-5">Name</p>
              <div className="overlap-group">
              <p>{currentUser.fullname}</p>
              </div>
            </div>

            <div className="customer-email">
              <p className="text-wrapper-5">Email</p>
              <div className="overlap-group">
                <p>{currentUser.email}</p>
              </div>
            </div>
          </div>

          <div className="order-list">
            <div className="ticket-details-area">
            {
              detailsOfChosenSeats.map((ticket, i) => {
                // console.log('ticket:', ticket);
                return(
                  <div id={i} className="tickets">
                      <p>{`Date: ${ticket.date}`}</p>
                      <p>{`Category: ${ticket.cat}`}</p>
                      <p>{`Seat No: ${ticket.seatNum}`}</p>
                      <p>{`Price: ${ticket.price}`}</p>
                      <p onClick={() => {
                        removeTicketDetails(ticket.seatID);
                        let listOfChosenSeats = removeSeatNoFromChosenList(ticket.seatID, chosenSeat);
                        setChosenSeat(listOfChosenSeats);
                      }}>Remove</p>
                  </div>
                )
              })
            }
            </div>
            <div className="pricing">
              <h2>{`Total Price: $${totalPrice}`}</h2>
            </div>
          </div>
        </div>
      </div>
    )}
  
  export default SeatingPayment;