import React, { useState, useEffect } from "react";
import { Component } from "react";
import TicketService from "./ticket.service";
import AuthService from "../LoginSignUp/services/auth.service";
import './Confirmation.css';


//this.props.listOfTicketIds
class Confirmation extends Component{
    constructor(){
        super();
        this.state=({
            user: AuthService.getCurrentUser(),
            purchaseInfo: [],
            ticketIDs: [],
            purchaseIDs: [],
        })
    }

    //get list of ticketIDs purchased from local storage
    getTicketIds = () => {
        let noOfTickets = parseInt(localStorage.getItem("noOfTickets"));
        let tickets = [];

        for(let i = 1; i <= noOfTickets; ++i){
            tickets.push(localStorage.getItem(`ticket${i}`));
        }
        console.log('these r my ticketids: ', tickets);
        return tickets;
    }

//from the ticket ids, generate purchase info about the tickets
    getPurchaseInfo = () => {
        let tickets = this.getTicketIds();
        let purchases = []

        tickets.map((ticket, i) => {
            TicketService.getPurchaseInfoFromTicketId(ticket)
            .then((purchaseInfo) => {
                let purchase = {
                    "purchaseId": purchaseInfo.purchaseId,
                    "userId": purchaseInfo.userId,
                    "userFullname": purchaseInfo.userFullname,
                    "userEmail": purchaseInfo.userEmail,
                    "eventName": purchaseInfo.eventName,
                    "eventDate": purchaseInfo.eventDate,
                    "ticketId": purchaseInfo.ticketId,
                    "ticketPrice": purchaseInfo.ticketPrice,
                    "seatNum": purchaseInfo.seatNum,
                    "category": purchaseInfo.category
                }

                purchases.push(purchase);
                this.setState({
                    purchaseInfo: purchases,
                })
            })
        })
    }

    //when component starts, create a timeout before getting purchase info
    componentDidMount(){
        setTimeout(() => {
            this.getPurchaseInfo();
        }, 3000);
    }

    render(){
        const {onRouteChange} = this.props;
        return(
            <div>
                <h1>Thank you for your purchase!</h1>
               <h2>Your ticket details are as follows:</h2>
                {
                    this.state.purchaseInfo.length === 0 ? 
                        <div className="loading-icons">
                            <div className="spinner-grow" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        </div>
                        : 
                        <div className="purchase-item-area">
                            {
                                this.state.purchaseInfo .map((purchase, i) => {
                                    return(
                                <div className="purchases" key={i}>
                                    <div className="left-half">
                                      <p>{`Purchase ID: ${ purchase.purchaseId}`}</p>
                                      <p>{`Event Name: ${ purchase.eventName}`}</p>
                                      <p>{`Event Date: ${ purchase.eventDate}`}</p>
                                      <p>{`Ticket ID: ${ purchase.ticketId}`}</p>
                                      
                                    </div>
                                    
                                    <div className="right-half">
                                      <p>{`Category: ${ purchase.category}`}</p>
                                      <p>{`Seat Number: ${ purchase.seatNum}`}</p>
                                      <p>{`User Fullname: ${ purchase.userFullname}`}</p>
                                      <p>{`Price: ${ purchase.ticketPrice}`}</p>
                                    </div>
                                      
                                  </div>
                                    )
                                })
                            }
                            <h3>Your ticket has been sent to your email</h3>
                            <h3 className="return-home" onClick={() => onRouteChange("Home")}>Click here to return to home</h3>
                        </div>
                }
                
            </div>
        );
    }
}

export default Confirmation;