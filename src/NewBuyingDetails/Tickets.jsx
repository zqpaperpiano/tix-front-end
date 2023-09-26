import React, { useState, useEffect } from "react";
import TicketService from "../services/ticket.service"
import AuthService from "../services/auth.service";



export const SeatingPayment = () => {
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
      
    //fetch dates when component mounts
    useEffect(() => {
        TicketService.getDates(eventName).then((dates) => {
        setEventDates(dates);
        });
    }, [eventName]);

    //fetch categories when component mounts
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
              (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setMessage(resMessage);
        });
      };
  
    //fetch ticket based on chosen
    const handleDateCategorySeatSubmit = () => {
      setChosenSeat(selectedSeat);
      TicketService.getTicketByNameDateCategorySeat(eventName, selectedDate, selectedCategory, selectedSeat)
      .then((ticket) => {
        setTicketDetails(ticket);
        }, (error) => {
            const resMessage =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setMessage(resMessage);
        });
    };

    //save purchase info 
    const handlePayment = () => {
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
        );
          
        //sets the ticket to sold
          TicketService.setTicketToSold(ticket.id)
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
          );
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
          <p>Chosen Seat: {chosenSeat}</p>
          {ticketDetails && (
            <div>
              <p>Event: {eventName}</p>
              <p>Date: {selectedDate}</p>
              <p>Category: {selectedCategory}</p>
              <p>Ticket ID: {ticketDetails.id}</p>
              <p>Price: {ticketDetails.price}</p>
              {/* Add the payment input */}
              <button onClick={handlePayment}>Pay</button>
            </div>
          )}
        </div>
      )}
      </div>
    );
  }
  
  export default SeatingPayment;