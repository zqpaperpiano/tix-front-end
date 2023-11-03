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
      <div className="div">
      <img className="taylor-swift" alt="Taylor swift" src={TaylorSwift} />
        <div className="taylor-swift-title">
          <div className="text-wrapper">Taylor Swift Era Tour</div>
          <p className="p">2 March 2024 (Sat) ~ 9 March 2024 (Sat)</p>
          <div className="text-wrapper-2">Singapore National Stadium</div>

        </div>
          
          <div>
            <div className="full-name">
              <div className="text-wrapper-3">Full Name</div>
              <div className="overlap-group">
                <div className="name">{currentUser.fullname}</div>
              </div>
            </div>

            <div className="email-address">
              <div className="text-wrapper-5">Email Address</div>
              <div className="overlap-group">
                <div className="email">{currentUser.email}</div>
              </div>
            </div>

            <div className="queue">
              <div className="text-wrapper-7">Queue Number</div>
              <div className="queue-number">{queueNumber}</div>
            </div>

          </div>
      </div>
    </div>
  );
};

export default Queue;


