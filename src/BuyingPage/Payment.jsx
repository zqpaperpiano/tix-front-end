import React from "react";
import "./Payment.css";
import TaylorSwitft from '../assets/TaylorSwift.jpeg';

export const Payment = ({ onRouteChange }) => {
  
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="payment">

        <div className="confirmation-title">
          <img className="taylor-swift" alt="Taylor swift" src={TaylorSwitft} />
          <div className="taylor-swift-title">
            <p className="text-wrapper-2">Taylor Swift Era Tour</p>
            <p className="text-wrapper-2">2 March 2024 (Sat) ~ 9 March 2024 (Sat)</p>
            <p className="text-wrapper-5">Singapore National Stadium</p>
          </div>
        </div>

        {/* User fullname, user email, Event Name, Event Date, Event Cat, Seat Num, Price */}
        <div className="confirmation-details">
          <div className="confirm-date">
            <p>Date</p>
          </div>

          <div className="confirm-time">
            <p>Time</p>
          </div>

          <div className="confirm-name">
            <p>Name</p>
          </div>

          <div className="confirm-cat">
            <p>Category</p>
          </div>

          <div className="confirm-price">
            <p>Price</p>
          </div>

          <div className="confirm-seat">
            <p>Seat Number:</p>
          </div>
        </div>

        <div className="card-details-payment">

        <p className="text-wrapper-5">Payment</p>

        <div className="card-details">
          <div className="credit-card-number">
            <p className="text-wrapper-2">Credit Card Number</p>
            <div className="card-input-wrapper">
              <input className="number" />
            </div>
          </div>

          <div className="dateof-expiry">
            <p className="text-wrapper-2">Date of Expiry</p>
            <div className="card-input-wrapper">
              <input className="date" />
            </div>
          </div>

          <div className="CVV">
            <p className="text-wrapper-2">CVV</p>
            <div className="card-input-wrapper">
              <input className="input" />
            </div>
          </div>
        </div>
        
        <div className="payment-placement text-wrapper-2">
          <button className="payment-button">Complete Payment</button>
        </div> 

        </div>

    </div>
  );
};

export default Payment
