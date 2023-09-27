import React, { useState, useEffect } from "react";
import TicketService from "./ticket.service";
import AuthService from "../LoginSignUp/services/auth.service";



export const SeatingPayment = ({purchase, onRouteChange}) => {
    const currentUser = AuthService.getCurrentUser();
    const [eventName, setName] = useState("Taylor Swift Concert");

    const [eventDates, setEventDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [chosenDate, setChosenDate] = useState("");

    const [eventCategories, setEventCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [chosenCategory, setChosenCategory] = useState("");

   
    const [seatNumbers, setSeatNumbers] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState("");
    const [chosenSeat, setChosenSeat] = useState("");

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

    const onChangeSeat = (event) => {
      const selectedSeat = event.target.value;
      if (selectedSeat != "Select a Seat"){
        setSelectedSeat(selectedSeat);
      } else {
        alert("Please select a Seat");
      }
    };

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

    
    //fetch available seats from name, date and cat
    const handleDateCategorySubmit = () => {
      setChosenDate(selectedDate);
      setChosenCategory(selectedCategory);
      TicketService.getSeatNumbers(eventName, selectedDate, selectedCategory)
      .then((numbers) => {
        setSeatNumbers(numbers);
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
      setChosenSeat(selectedSeat);
      TicketService.getTicketByNameDateCategorySeat(eventName, selectedDate, selectedCategory, selectedSeat)
      .then((ticket) => {
        console.log(ticket);
        setTicketDetails(ticket);
        }, (error) => {
            const resMessage =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setMessage(resMessage);
        });
    };

    // save purchase info 
    const handlePayment = () => {
        if(cardNumber.length !== 16 || cvv.length !== 3){
          alert("Invalid card details. Please try again.")
        }else{
          TicketService.savePurchaseInfo(eventName, selectedDate, selectedCategory, selectedSeat, currentUser.id)
        .then (
          () => {
          },(error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setMessage(resMessage);
          }
        )
        .then(onRouteChange('Confirmation'))
        }
    };
  
    return (
      <div>
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

        {chosenCategory && chosenDate && (
        <div>
            <label htmlFor="seatDropdown">Select a Seat:</label>
            <select
            id="seatDropdown"
            value={selectedSeat}
            onChange={onChangeSeat}
            >
            <option value="">Select a seat</option>
            {seatNumbers.map((seatNumber) => (
                <option key={seatNumber} value={seatNumber}>
                {seatNumber}
                </option>
            ))}
            </select>
            <button onClick={handleDateCategorySeatSubmit}>Confirm Ticket</button>
        </div>
        )}    
        
  
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
              {/* Add the payment input */}
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
                <input onChange={onChangeCVV} className="input" />
              </div>
            </div>
          </div>
              <button
               onClick={handlePayment}
               >
                Pay</button>
            </div>
          )}
        </div>
      )}

      </div>
    );
  }
  
  export default SeatingPayment;