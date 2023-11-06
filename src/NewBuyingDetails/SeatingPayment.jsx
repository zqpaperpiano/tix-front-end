import React, { useState, useEffect } from "react";
import TicketService from "./ticket.service";
import AuthService from "../LoginSignUp/services/auth.service";
import './SeatingPayment.css';
import Stripe from "react-stripe-checkout";
import axios from "axios";
import StripeButton from "../Components/StripePayment/StripeButton";
import CountdownTimer from "../Components/Timer/CountdownTimer";



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
    const [listOfAllSeats, setListOfAllSeats] = useState([1, 2, 3, 4, 5]);
    const [listOfTakenSeats, setListOfTakenSeats] = useState([]);
    const [chosenSeat, setChosenSeat] = useState([]);

    const [ticketDetails, setTicketDetails] = useState(null);
    const [message, setMessage] = useState("");

    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCVV] = useState("");



    async function handleToken(token) {
      console.log(token);
      await axios
        .post("http://localhost:8081/api/payment/charge", "", {
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
            setSelectedDate(selectedDate);
        } else {
          alert("Please select a Date");
        }
      };
    
    const onChangeCategory = (e) => {
        const selectedCategory = e.target.value;
        if (selectedCategory != "Select a Category"){
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



    const findUnavailableSeats = (availableSeats) => {
      const set = new Set();
      const unavailableSeats = [];

      // console.log('find unavailable seats');
      // console.log('all seats: ', listOfAllSeats);
      // console.log('available seats: ', availableSeats);

      for(const seats of availableSeats){
        set.add(seats);
      }

      for(const seats of listOfAllSeats){
        if(!set.has(seats)){
          let unavailableSeatId = 'seat' + seats;
          unavailableSeats.push(unavailableSeatId);
          set.add(seats);
        }else{
          //mark as seen to prevent duplication
          set.delete(seats);
        }
      }
      // console.log('after filtering: ', unavailableSeats);
      setListOfTakenSeats(unavailableSeats);
      return unavailableSeats;
    }

    const markUnavailableSeats = (unavailableSeats) => {
      // console.log('unavailable seats: ', unavailableSeats);
      const allSeats = document.getElementsByClassName("seats-image");
      for(const seat of allSeats){
        seat.setAttribute("class", "seats-image");
      }
      
      unavailableSeats.map((seats) => {
        let correspondingSeat = document.getElementById(seats);
        correspondingSeat.setAttribute("class", "seats-image occupied");
      })
    }
    
    //fetch available seats from name, date and cat
    const handleDateCategorySubmit = () => {
      setChosenDate(selectedDate);
      setChosenCategory(selectedCategory);
      TicketService.getSeatNumbers(eventName, selectedDate, selectedCategory)
      .then((numbers) => {
        markUnavailableSeats(findUnavailableSeats(numbers));
        setListOfAvailableSeats(numbers);
      }, (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message)  
            || error.message  
            || error.toString();
          setMessage(resMessage);
      });
    };


  
    //fetch ticket based on chosen
    const handleDateCategorySeatSubmit = () => {
      chosenSeat.map((seat) => {
        let seatNo = parseInt(seat[4]);
        TicketService.getTicketByNameDateCategorySeat(eventName, selectedDate, selectedCategory, seatNo)
        .then((ticket) => {
        console.log(ticket);
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

    const onClickSeats = (event) => {
      var occupied = false;
      var currentSeatID = event.currentTarget.id;
      var listOfChosenSeats = chosenSeat;

      listOfTakenSeats.map((seat) => {
        if(seat === currentSeatID){
          occupied = true;
        }
      })
      if(!occupied){

        const currentSeat = document.getElementById(currentSeatID);
        const currentClass = event.currentTarget.className;

        if(currentClass !== "seats-image selected custom-cursor-on-hover" && currentClass !== "seats-image selected"){
          if(chosenSeat.length >= 4){
            alert("You can only choose up to 4 tickets");
          }else{
            currentSeat.setAttribute("class", "seats-image selected");
            listOfChosenSeats.push(currentSeatID);
          }
        }else{
          currentSeat.setAttribute("class", "seats-image");
          listOfChosenSeats = listOfChosenSeats.filter((seat) => {
            return seat != currentSeatID;
          })
        }
        // console.log(listOfChosenSeats);
        setChosenSeat(listOfChosenSeats);
      }
    }

    const handleTimeout = () => {
        alert("Time is Up, Returning to Home");
        TicketService.timeout(eventName, currentUser.id)
        .then(() => {
          onRouteChange("Home");
      }, (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message)  
            || error.message  
            || error.toString();
          setMessage(resMessage);
      });
    }

  
    return (
      <div className="seating-payment">
        <CountdownTimer durationInSeconds={10} onTimeout={handleTimeout} />

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
            var id = "seat" + seatNo;
              return(
                <div id={id} 
                onClick={onClickSeats}
                className="seats-image">{`${seat}`}</div>
              )
            })}
        </div>
        )
      : null
      }

        <button onClick={handleDateCategorySeatSubmit}>Confirm Ticket</button> 
        
  
        {chosenSeat && (
        <div>
          {/* <p>Chosen Seat: {chosenSeat}</p> */}
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
                <StripeButton price={648}/>
            </div>
          )}
        </div>
      )}

      </div>
    );
  }
  
  export default SeatingPayment;