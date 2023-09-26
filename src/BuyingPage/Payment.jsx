import React from "react";
import { Component } from "react";
import "./Payment.css";
import TaylorSwitft from '../assets/TaylorSwift.jpeg';

class Payment extends Component{
  constructor(){
    super();
    this.state = ({
      cardNo: '',
      expiry: '',
      CVV: '',
    })
  }

  onCardNoChange = (event) => {
    this.setState({
      cardNo: event.target.value,
    })
  }

  onExpiryChange = (event) => {
    this.setState({
      expiry: event.target.value,
    })
  }

  onCVVChange = (event) => {
    this.setState({
      CVV: event.target.value,
    })
  }

  onSubmitPayment = () => {
    if(this.state.cardNo.length !== 16 || this.state.CVV.length != 3){
      alert("Card information is not valid. Please try again");
    }else{
      //change route to confirmation page
    }
  }


  render(){
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
  
          
          
          <div className="payment-placement text-wrapper-2">
            <button className="payment-button">Complete Payment</button>
          </div> 
  
          </div>
  
      </div>
    );
  }
}

export default Payment


