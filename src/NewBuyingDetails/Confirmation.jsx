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

    getTicketIds = () => {
        let noOfTickets = parseInt(localStorage.getItem("noOfTickets"));
        let tickets = [];

        for(let i = 1; i <= noOfTickets; ++i){
            tickets.push(localStorage.getItem(`ticket${i}`));
            // localStorage.removeItem(`ticket${i}`);
        }
        console.log('these r my ticketids: ', tickets);
        return tickets;
    }


    getPurchaseInfo = () => {
        let tickets = this.getTicketIds();
        // console.log('from confirmation:', tickets);
        let purchases = [ ]
        let purchaseIDs = [];

        tickets.map((ticket, i) => {
            console.log('one ticket coming through...: ', ticket);
            TicketService.getPurchaseInfoFromTicketId(ticket)
            .then((purchaseInfo) => {
                console.log('retrived purchase info here: ', purchaseInfo);
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
                console.log('this is a purchase', purchase);
                purchases.push(purchase);
                purchaseIDs.push(purchaseInfo.purchaseId);
                this.setState({
                    purchaseInfo: purchases,
                    purchaseIDs: purchaseIDs
                })
            })
        })
    }

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