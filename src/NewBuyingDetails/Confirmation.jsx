import React, { useState, useEffect } from "react";
import { Component } from "react";
import TicketService from "./ticket.service";
import AuthService from "../LoginSignUp/services/auth.service";
import './Confirmation.css';

class Confirmation extends Component{
    constructor(){
        super();
        this.state=({
            user: AuthService.getCurrentUser(),
            purchaseInfo: [ ],
            ticketIDs: [],
            purchaseIDs: [],
        })
    }

    getTicketIds = () => {
        let noOfTickets = parseInt(localStorage.getItem("noOfTickets"));
        let tickets = [];

        for(let i = 1; i <= noOfTickets; ++i){
            tickets.push(localStorage.getItem(`ticket${i}`));
        }

        // console.log('these r my ticketids: ', tickets);
        return tickets;
    }

    getPurchaseInfo = () => {
        let tickets = this.getTicketIds();
        let purchases = [ ]
        let purchaseIDs = [];

        tickets.map((ticket, i) => {
            // console.log('one ticket coming through...: ', ticket);
            TicketService.getPurchaseInfoFromTicketId(ticket)
            .then((purchaseInfo) => {
                // console.log('retried purchase info here: ', purchaseInfo);
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
                // console.log('this is a purchase', purchase);
                purchases.push(purchase);
                purchaseIDs.push(purchaseInfo.purchaseId);
                console.log('my purchase IDs', purchaseIDs);
                // console.log('looking at the list: ', purchases);
                // console.log('length is: ...', purchases.length);
                this.setState({
                    purchaseInfo: purchases,
                    purchaseIDs: purchaseIDs
                })
            })
        })
    }

    componentDidMount(){
        this.getPurchaseInfo();
    }

    render(){
        const {onRouteChange} = this.props;
        // console.log('rendered');
        // console.log(this.state.purchaseIDs);
        return(
            <div>
                <h1>Thank you for your purchase!</h1>
               <h2>Your ticket details are as follows:</h2>
                {
                    this.state.purchaseInfo.length === 0 ? 
                        <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                        </div>
                        : 
                        <div>
                            {
                                this.state.purchaseInfo .map((purchase, i) => {
                                    return(
                                        <div className="purchases" key={i}>
                                      <p>{`Purchase ID: ${ purchase.purchaseId}`}</p>
                                      <p>{`User ID: ${ purchase.userId}`}</p>
                                      <p>{`User Fullname: ${ purchase.userFullname}`}</p>
                                      <p>{`User Email: ${ purchase.userEmail}`}</p>
                                      <p>{`Event Name: ${ purchase.eventName}`}</p>
                                      <p>{`Event Date: ${ purchase.eventDate}`}</p>
                                      <p>{`Category: ${ purchase.category}`}</p>
                                      <p>{`Ticket ID: ${ purchase.ticketId}`}</p>
                                      <p>{`Price: ${ purchase.ticketPrice}`}</p>
                                      <p>{`Seat Number: ${ purchase.seatNum}`}</p>
                                  </div>
                                    )
                                })
                            }
                        </div>
                }
                <h3>Your Ticket has been sent to your email</h3>
                <h3 onClick={() => onRouteChange("Home")}>Click here to return to home</h3>
            </div>
        );
    }
}

export default Confirmation;