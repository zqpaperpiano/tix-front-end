import React from "react";
import "./UFCInfo.css";
import UFC from '../assets/UFC/UFC.jpeg'
import SeatMapPicture from '../assets/UFC/UFC-Seat-Map.jpeg';
import PricingTable from '../assets/UFC/UFC-Price-Table.jpeg';
import TicketService from "../NewBuyingDetails/ticket.service";
import AuthService from "../LoginSignUp/services/auth.service";
import { useState } from "react";

export const UFCInfo = ({onRouteChange, user, setCurrentEvent}) => {

  const currentUser = AuthService.getCurrentUser();
  const [message, setMessage] = useState("");

//check if user needs to enter queue or can buy immediately
  const handleCheck = () => {
    TicketService.saveSetOrQueue(currentUser.id, "UFC")
    .then ((isUserInSet) => {
      if (isUserInSet == true){
        setCurrentEvent("UFC");
        onRouteChange("SeatingPayment");
      } 
      if (isUserInSet == false) {
        onRouteChange("Queue");
      }
      
    }, (error) => {
      const resMessage =
        (error.response && error.response.data && error.response.data.message)  
        || error.message 
         ||error.toString();
      setMessage(resMessage);
    });
  }

  return (
    <div className="ufc-info">

      <div className="event-banner">
        <img className="taylor-swift-banner" alt="Taylor swift" src={UFC} />
      </div>

        <div className="event-detail-title">
          <div className="event-summary">
            <p className="text-wrapper-2">2 March 2024 (Sat) & 4 March 2024 (Sun)</p>
            <p className="text-wrapper-2">The Octogon</p>
          </div>

          <div className="purchase-now-button">
          <p 
          onClick={() => {
            if(user.email === ''){
              alert('Please log in or sign up first!');
              onRouteChange('Login');
            }else {
              handleCheck();
            }
          }} 
          className="buy-btm text-wrapper-3">
            Buy Now</p>
        </div>
      </div>

        <div className="event-details">
          <p className="taylor-swift-2">
            <span className="span text-wrapper-4">
              UFC is back with 2 warriors fighting for their rightful place as champion of the light weight divison. 
              A fight that you cannot miss. Come watch the match of the century. 
              <br />
              <br />
            </span>
            <span className="text-wrapper-5">Event Dates: 5th & 6th March 2024</span>
          </p>
        </div>

        <div className="ticket-sales text-wrapper-4">
          <div className="overlap-2">
            <div className="text-wrapper-7">Ticket Sales</div>
            <p className="taylor-swift-the">
              <span className="text-wrapper-8">
                UFC | Callaway vs Booger Registration for General On-Sale:{" "}
              </span>
              <span className="text-wrapper-9">
                Friday, June 23 2023 at 12PM (SGT) to Wednesday, June 28 2023 at 12PM
                <br />
              </span>
              <span className="text-wrapper-6">General On-Sale:</span>
              <span className="text-wrapper-10"> Starts from Friday, July 7 at 12PM (SGT)</span>
            </p>
          </div>
        </div>

        <div className="seat-map">
          <p className="seat-map-ticket text-wrapper-5">Seat Map &amp; Ticket Pricing</p>
          <div className="pictures">
            <img className="seating-picture" alt="Seating picture" src={SeatMapPicture} />
            <img className="category-table" alt="Category table" src={PricingTable} />
            </div>
        </div>
        <div className="admission-policy">
          <div className="overlap-3">
            <div className="text-wrapper-11">Admission Policy</div>
            <p className="admission-to-show">
              1. Admission to show/venue by full ticket only. Printed/electronic tickets must be produced for admission.
              <br />
              <br />
              2. There will be no admission for infants in arms and children below 3 years old.
              <br />
              <br />
              3. Individuals aged 3 years old and above will be required to purchase a ticket for admission.
              <br />
              <br />
              4. No professional photo or video cameras allowed.
              <br />
              <br />
              5. STRICTLY No Social Media Live Streaming is allowed.
              <br />
              <br />
              6. No outside food and beverage are allowed into the venue.
            </p>
          </div>
        </div>

      
    </div>
  );
}

export default UFCInfo;