import React from "react";
import "./Details.css";
import TaylorSwift from '../assets/TaylorSwift.jpeg';
import { useState, useEffect } from 'react';

export const Details = ({ onRouteChange }) => {

  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="details">
      <div className="div">
      <img className="taylor-swift" alt="Taylor swift" src={TaylorSwift} />
        <div className="taylor-swift-title">
          <div className="text-wrapper">Taylor Swift Era Tour</div>
          <p className="p">2 March 2024 (Sat) ~ 9 March 2024 (Sat)</p>
          <div className="text-wrapper-2">Singapore National Stadium</div>
        </div>
        
        {isLoading && <p>Loading user profile...</p>}
        {error && <p>Error: {error}</p>}
        
        {userProfile && (
          
          <div>
            <div className="full-name">
              <div className="text-wrapper-3">Full Name</div>
              <div className="overlap-group">
                <div className="name">{currentUser.fullname}</div>
              </div>
            </div>

            <div className="profile-id">
              <div className="text-wrapper-3">Profile</div>
              <div className="overlap-group">
                <div className="text-wrapper-4">Id</div>
                <div className="id">{currentUser.id}</div>
              </div>
            </div>

            <div className="email-address">
              <div className="text-wrapper-5">Email Address</div>
              <div className="overlap-group">
                <div className="email">{currentUser.email}</div>
              </div>
            </div>

            <div className="contact">
              <div className="text-wrapper-5">Mobile</div>
              <div className="overlap-group">
                <div className="number">{currentUser.mobile}</div>
              </div>
            </div>
          </div>
        )}
        
        <div className="text-wrapper-7">
          <button onClick={() => { onRouteChange('Seating') }}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Details;


