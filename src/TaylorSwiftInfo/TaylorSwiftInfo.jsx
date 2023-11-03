import React from "react";
import "./TaylorSwiftInfo.css";
import SeatMapPicture from '../assets/SeatMapPicture.png';
import PricingTable from '../assets/PricingTable.jpg';
import TaylorSwift from '../assets/TaylorSwift.jpeg'
import TicketService from "../NewBuyingDetails/ticket.service";
import AuthService from "../LoginSignUp/services/auth.service";
import { useState, useEffect } from "react";

export const TaylorSwiftInfo = ({onRouteChange, user}) => {

  const currentUser = AuthService.getCurrentUser();
  // const [hasAccess, setHasAccess] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleCheck = () => {
    console.log("Handling Check")
    console.log(currentUser.id)
    TicketService.saveSetOrQueue(currentUser.id, "Taylor Swift Concert")
    .then ((isUserInSet) => {
      if (isUserInSet == true){
        console.log("Going to Details");
        onRouteChange("Details");
      } 
      if (isUserInSet == false) {
        console.log("Going to Queue");
        onRouteChange("Queue");
      }
      
    }, (error) => {
      const resMessage =
        (error.response && error.response.data && error.response.data.message)  
        || error.message  
        || error.toString();
      setMessage(resMessage);
    });

  }

  return (
    <div className="taylor-swift-info">

      <div className="event-banner">
        <img className="taylor-swift-banner" alt="Taylor swift" src={TaylorSwift} />
      </div>

        <div className="event-detail-title">
          <div className="event-summary">
            <p className="text-wrapper">Taylor Swift Era Tour</p>
            <p className="text-wrapper-2">2 March 2024 (Sat) ~ 9 March 2024 (Sat)</p>
            <p className="text-wrapper-2">Singapore National Stadium</p>
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
              Taylor Swift announced additional dates to Taylor Swift | The Eras Tour today. Singapore will be the only
              stop in Southeast Asia. Taylor Swift | The Eras Tour in Singapore is presented by Marina Bay Sands and
              supported by the Singapore Tourism Board, official bank and pre-sale partner UOB, and official experience
              partner Klook, promoted by AEG Presents Asia, and produced by Taylor Swift Touring.
              <br />
              <br />
            </span>
            <span className="text-wrapper-5">Event Dates: March 2, 3, 4, 7, 8, 9 2024</span>
          </p>
        </div>

        <div className="ticket-sales text-wrapper-4">
          <div className="overlap-2">
            <div className="text-wrapper-7">Ticket Sales</div>
            <p className="taylor-swift-the">
              <span className="text-wrapper-8">
                Taylor Swift | The Eras Tour Fan Registration for General On-Sale:{" "}
              </span>
              <span className="text-wrapper-9">
                Friday, June 23 at 12PM (SGT) to Wednesday, June 28 at 12PM
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
};

export default TaylorSwiftInfo