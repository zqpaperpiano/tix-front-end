import React, { useState, useEffect } from "react";
import TicketService from "./ticket.service";
import AuthService from "../LoginSignUp/services/auth.service";
import './SeatingPayment.css';



export const SeatingPayment = ({purchase, onRouteChange}) => {
    const currentUser = AuthService.getCurrentUser();
    const [eventName, setName] = useState("Taylor Swift Concert");

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

    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCVV] = useState("")

    

    const onChangeCardNumber = (event) => {
      setCardNumber(event.target.value);
    }

    const onChangeExpiry = (event) => {
      setExpiry(event.target.value);
    }

    const onChangeCVV = (event) => {
      setCVV(event.target.value);
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

      console.log('allSeats:', allSeats);

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
      // console.log('unavailable seats: ', unavailableSeats)
      return unavailableSeats;
    }

    //mark unavailable seats as red
    const markUnavailableSeats = (unavailableSeats) => {
      console.log('unavailable seats: ', unavailableSeats);
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
          // console.log(`events/getEventByNameDate/${eventName}/${selectedDate}/ticketByCategory/${selectedCategory}/allSeatNumbers`);
          setListOfAllSeats(tickets);
          markUnavailableSeats(findUnavailableSeats(numbers, tickets));
        })
        // markUnavailableSeats(findUnavailableSeats(numbers, getAllTickets()));
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
      TicketService.getTicketByNameDateCategorySeat(eventName, selectedDate, selectedCategory, seatNo)
      .then((ticket) => {
        // console.log(ticket);
        // console.log(typeof ticket.date);
        let tixDetails = {
          "seatID": seat,
          "cat": ticket.category,
          "seatNum": ticket.seatNum,
          "price": ticket.price,
          "date": selectedDate
        }
        ticketPrice = ticket.price;
        updatedDetails.push(tixDetails);
        // console.log(updatedDetails);
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
      // console.log('unmarking...');
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
      // console.log('marking');
      chosenSeat.map((seat) => {
        let cat = seat[1];
        let date = extractDate(seat);
        // console.log('date of selected seat:', date);

        let shortenedSelectedDate = selectedDate.split("-").join("");
        if(cat === selectedCategory && date === shortenedSelectedDate){
          // console.log('date of current selected date', shortenedSelectedDate);
          let selectedSeat = document.getElementById(seat);
          selectedSeat.classList.add("selected");
        }
      })
    }

    const onChangingEventOrCategory = () => {
      // console.log('changed!');
      unmarkSelected();
      markSelected();
    }

  
    //fetch ticket based on chosen
    const handleDateCategorySeatSubmit = () => {
      chosenSeat.map((seat) => {
        let ticketCat = parseInt(seat[1]);
        let seatNo = parseInt(seat[3]);
        let ticketDate = parseInt(extractDate(seat));
        TicketService.getTicketByNameDateCategorySeat(eventName, ticketDate, ticketCat, seatNo)
        .then((ticket) => {
        setTicketDetails(ticket);
        }, (error) => {
            const resMessage =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setMessage(resMessage);
        });
      })
      // 
    };

    // save purchase info 
    const handlePayment = () => {
        // if(cardNumber.length !== 16 || cvv.length !== 3){
        //   alert("Invalid card details. Please try again.")
        // }else{
        //   TicketService.savePurchaseInfo(eventName, selectedDate, selectedCategory, selectedSeat, currentUser.id)
        // .then (
        //   () => {
        //   },(error) => {
        //     const resMessage =
        //       (error.response &&
        //         error.response.data &&
        //         error.response.data.message) ||
        //       error.message ||
        //       error.toString();
        //     setMessage(resMessage);
        //   }
        // )
        // .then(onRouteChange('Confirmation'))
        // }
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
    console.log('current price before addition: ', price);
    price += changeInPrice;
    console.log('after addition: ', price);
    setTotalPrice(price);

  }

  //function to make the seats be selected or unselected
    const onClickSeats = (event) => {
      // console.log('clicked seats');
      var occupied = false;
      var currentSeatID = event.currentTarget.id;
      var listOfChosenSeats = chosenSeat.slice();

      listOfTakenSeats.map((seat) => {
        if(seat === currentSeatID){
          occupied = true;
        }
      })
      if(!occupied){
        // console.log('checkpoint 1');
        const currentSeat = document.getElementById(currentSeatID);
        const currentClass = currentSeat.classList;

        if(!checkIfExists(currentClass, "selected")){
          // console.log('checkpoint 2');
          if(chosenSeat.length >= 4){
            alert("You can only choose up to 4 tickets");
          }else{
            // console.log('checkpoint 3');
            currentSeat.classList.add("selected");
            listOfChosenSeats.push(currentSeatID);
            addTicketDetails(currentSeatID);
          }
        }else{
          // console.log('checkpoint 4');
          currentSeat.classList.remove("selected");
          removeTicketDetails(currentSeatID);
          listOfChosenSeats = listOfChosenSeats.filter((seat) => {
            return seat != currentSeatID;
          })
        }
        // console.log('checkpoint 5');
        setChosenSeat(listOfChosenSeats);
      }
    }

    // console.log('chosen ticket seat Numbers: ', chosenSeat);
    // console.log('ticket details: ', detailsOfChosenSeats);
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

          <button onClick={handleDateCategorySeatSubmit}>Confirm Ticket</button> 
        </div>

        <div className="order-list">
          <h1>Your Tickets</h1>
          <div className="ticket-details-area">
          {
            detailsOfChosenSeats.map((ticket, i) => {
              return(
                <div id={i} className="tickets">
                    <p>{`Date: ${ticket.date}`}</p>
                    <p>{`Category: ${ticket.cat}`}</p>
                    <p>{`Seat No: ${ticket.seatNum}`}</p>
                    <p>{`Price: ${ticket.price}`}</p>
                    <p onClick={() => console.log('clicked')}>Remove</p>
                </div>
              )
            })
          }
          </div>
          <div className="pricing">
            <h2>{`Total Price: $${totalPrice}`}</h2>
          </div>
        </div>
        
        {/* <div className="payment">
        {chosenSeat && (
        <div>
          {ticketDetails && (
            <div>
              <p>User Fullname: {currentUser.id}</p>
              <p>User Fullname: {currentUser.fullname}</p>
              <p>User Email: {currentUser.email}</p>
              <p>Event Name: {eventName}</p>
              <p>Event Date: {selectedDate}</p>
              <p>Category: {selectedCategory}</p>
              <p>Ticket ID: {ticketDetails.id}</p>
              <p>Price: {ticketDetails.price}</p>
              <p>Chosen Seat: {chosenSeat}</p>


              <div className="card-details">
            <div className="credit-card-number">
              <p className="text-wrapper-2">Credit Card Number</p>
              <div className="card-input-wrapper">
                <input onChange={onChangeCardNumber} className="number" />
              </div>
            </div>
  
            <div className="dateof-expiry">
              <p className="text-wrapper-2">Date of Expiry</p>
              <div className="card-input-wrapper">
                <input onChange={onChangeExpiry} className="date" placeholder={"mm/yy"} />
              </div>
            </div>
  
            <div className="CVV">
              <p className="text-wrapper-2">CVV</p>
              <div className="card-input-wrapper">
                <input onChange={onChangeCVV} className="cvv-input" />
              </div>
            </div>
          </div>
              <button className="payment-button"
               onClick={handlePayment}
               >
                Pay</button>
            </div>
          )}
        </div>
      )}

        </div> */}
        

      </div>
    );
  }
  
  export default SeatingPayment;