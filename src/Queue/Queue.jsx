import React from "react";
import "./Queue.css";
import TaylorSwift from '../assets/TaylorSwift.jpeg';
import UFC from '../assets/UFC/UFC.jpeg'
import { useState, useEffect } from 'react'
import TicketService from "../NewBuyingDetails/ticket.service";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import AuthService from "../LoginSignUp/services/auth.service";


export const Queue = ({ onRouteChange, currentEvent }) => {
  const currentUser = AuthService.getCurrentUser();
  const [queueNumber, setQueueNumber] = useState(null);
  const [eventName, setName] = useState(currentEvent);
  const [accessToBuy, setAccessToBuy] = useState(false);
  const stompClient = new Client();   //Initialize the stompClient

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
    console.log(eventName)
    TicketService.getQueueNumber(eventName, currentUser.id).then((queueNumber) => {
      setQueueNumber(queueNumber);
      connect();
    });
  }, [queueNumber]);

  return (
    <div className="queue">

        <div className="queue-banner">
          <div className="queue-banner-image">
            {currentEvent === "Taylor Swift Concert" ?
            <img className="queue-image" alt="Taylor swift" src={TaylorSwift} />
            :
            <img className="queue-image" alt="UFC" src={UFC} />
          }
          </div>

          <div>
          {
            currentEvent === "Taylor Swift Concert" ?
            <div className="queue-banner-details">
              <p className="text-wrapper-2">Singapore National Stadium</p>
              <p className="text-wrapper-2">Taylor Swift Era Tour</p>
              <p className="text-wrapper-2">2 March 2024 (Sat) ~ 9 March 2024 (Sat)</p>
            </div>
            :
            <div className="queue-banner-details">
            <p className="text-wrapper-2">The Octogon</p>
            <p className="text-wrapper-2">UFC</p>
            <p className="text-wrapper-2">2 March 2024 (Sat) & 4 March 2024 (Sun)</p>
          </div>
          }
          </div>

        </div>

          <div className="queue-status">
            <div className="text-wrapper-7">Queue Number: {queueNumber}</div>
          </div>
      </div>
  );
};

export default Queue;


