import React from "react";
import "./Queue.css";
import TaylorSwift from '../assets/TaylorSwift.jpeg';
import { useState, useEffect } from 'react'
import TicketService from "../NewBuyingDetails/ticket.service";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import AuthService from "../LoginSignUp/services/auth.service";


export const Queue = ({ onRouteChange }) => {
  const currentUser = AuthService.getCurrentUser();
  const [queueNumber, setQueueNumber] = useState(null);
  const [eventName, setName] = useState("Taylor Swift Concert");
  // const [accessToBuy, setAccessToBuy] = useState(false);
  const stompClient = new Client(); // Initialize the stompClient

  const connect = () => {
    stompClient.webSocketFactory = () => {
      return new SockJS('http://localhost:8081/ws');
    };

    stompClient.activate();
    stompClient.onConnect = () => {
      onConnected();
    };
  }

  const onConnected = () => {
    stompClient.subscribe('/user/' + currentUser.id + '/private', onPrivateMessage);
    console.log("Connected")
  }

  const disconnectWebSocket = () => {
    if (stompClient) {
      stompClient.deactivate();
      console.log("WebSocket disconnected");
    }
  }

  const onPrivateMessage = (payload) => {
    console.log("hello");
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (payloadData.isInBuySet == true) {
      disconnectWebSocket();
      onRouteChange("SeatingPayment");
    }
  }

  useEffect(() => {
    TicketService.getQueueNumber(eventName, currentUser.id).then((queueNumber) => {
      setQueueNumber(queueNumber);
      connect();
    });
  }, [queueNumber]);

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

          <div className="queue">
            <div className="text-wrapper-7">Queue Number</div>
            <div className="queue-number">{queueNumber}</div>
          </div>
  
      </div>
    </div>
  );
};

export default Queue;


