import React from "react";
import "./Payment.css";
import TaylorSwitft from '../assets/TaylorSwift.jpeg';

export const Payment = () => {
  

  return (
    <div className="payment">
      <div className="div">

        {/* Need to add a table with confirmation details */}

        <div className="text-wrapper">Payment</div>
        <div className="credit-card-number">
          <div className="text-wrapper-2">Credit Card Number</div>
          <div className="overlap-group">
            <input className="number" />
          </div>
        </div>

        <div className="dateof-expiry">
          <div className="text-wrapper-3">Date of Expiry</div>
          <div className="overlap">
            <input className="date" />
          </div>
        </div>

        <div className="CVV">
          <div className="text-wrapper-3">CVV</div>
          <div className="CVV-wrapper">
            <input className="input" />
          </div>
        </div>

        <img className="taylor-swift" alt="Taylor swift" src={TaylorSwitft} />
        <div className="taylor-swift-title">
          <div className="text-wrapper-4">Taylor Swift Era Tour</div>
          <p className="p">2 March 2024 (Sat) ~ 9 March 2024 (Sat)</p>
          <div className="text-wrapper-5">Singapore National Stadium</div>
        </div>

        <div className="text-wrapper-6">
          <button>Complete Payment</button>
        </div> {/* Finish Button */}
      </div>
    </div>
  );
};

export default Payment
