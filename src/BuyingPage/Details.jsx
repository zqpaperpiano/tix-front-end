import React from "react";
import "./Details.css";
import TaylorSwift from '../assets/TaylorSwift.jpeg';
import { useState, useEffect } from 'react';
import AuthService from "../LoginSignUp/services/auth.service";
import CountdownTimer from "../Components/Timer/CountdownTimer";
import TicketService from "../NewBuyingDetails/ticket.service";

export const Details = ({ onRouteChange }) => {
  const currentUser = AuthService.getCurrentUser();

  // const handleTimeout = () => {
  //   const startTime = localStorage.getItem('timerStartTime');
  //   const currentTime = Date.now();
  //   if (currentTime - startTime >= durationInSeconds * 1000) {
  //     // The timer has expired even if the user navigated to a new page
  //   } else {
  //     TicketService. //delete user from buy set and call the next one
  //     alert("Time is Up, return to home page");
  //     onRouteChange("Home");
  //   }
      
  // };

  return (
    <div className="details">

        {/* <CountdownTimer durationInSeconds={600} onTimeout={handleTimeout} /> */}

        <div className="details-banner">
          <div className="details-banner-image">
            <img className="details-image" alt="Taylor swift" src={TaylorSwift} />
          </div>

          <div className="details-banner-details">
            <p className="text-wrapper-2">Singapore National Stadium</p>
            <p className="text-wrapper-2">Taylor Swift Era Tour</p>
            <p className="text-wrapper-2">2 March 2024 (Sat) ~ 9 March 2024 (Sat)</p>
          </div>
        </div>
          
          <div className="details-customer-profile">
            <div className="details-left">
              <div className="full-name">
                <div className="text-wrapper-5 profile-title">Email</div>
                <div className="overlap-group">
                  <p className="name profile-details">{currentUser.email}</p>
                </div>
              </div>

              <div className="email-address">
                <div className="text-wrapper-5 profile-title">Full Name</div>
                <div className="overlap-group">
                  <p className="email profile-details">{currentUser.fullname}</p>
                </div>
              </div>
            </div>

            <div className="details-right">
              <div className="mobile">
                <div className="text-wrapper-5 profile-title">Mobile</div>
                <div className="overlap-group">

                  <p className="email profile-details">{currentUser.mobile}</p>

                </div>

              </div>

                <div className="button-div">
                  <button 
                className="details-next-button"
                onClick={() => { onRouteChange('SeatingPayment') }}> Next </button>
                </div>
        
              </div>
            </div>

         
    </div>
  );
};

export default Details;


