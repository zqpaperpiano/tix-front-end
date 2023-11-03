import React from "react";
import "./Details.css";
import TaylorSwift from '../assets/TaylorSwift.jpeg';
import { useState, useEffect } from 'react';
import AuthService from "../LoginSignUp/services/auth.service";

export const Details = ({ onRouteChange }) => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="details">

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
                <div className="text-wrapper-5 profile-title">Full Name</div>
                <div className="overlap-group">
                  <p className="name profile-details">{currentUser.fullname}</p>
                </div>
              </div>

              <div className="email-address">
                <div className="text-wrapper-5 profile-title">Email Address</div>
                <div className="overlap-group">
                  <p className="email profile-details">{currentUser.email}</p>
                </div>
              </div>
            </div>

            <div className="details-right">
              <div className="profile-id">
                <div className="text-wrapper-5 profile-title">Profile</div>
                <div className="overlap-group">
                  {/* <div className="text-wrapper-4">Id</div> */}
                  <p className="id profile-details">{currentUser.id}</p>

                </div>
              </div>

                <div className="contact">
                  <div className="text-wrapper-5 profile-title">Mobile</div>
                  <div className="overlap-group">
                    <p className="number profile-details">{currentUser.mobile}</p>
                  </div>
                </div>

                <div className="button-div">
                  <button 
                className="details-next-button"
                onClick={() => { onRouteChange('SeatingPayment') }}>Next</button>
                </div>
        
              </div>
            </div>

         
    </div>
  );
};

export default Details;


