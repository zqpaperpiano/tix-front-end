import React, { useState, useEffect } from "react";
import TicketService from "./ticket.service";
import AuthService from "../LoginSignUp/services/auth.service";

const Confirmation = ({onRouteChange}) => {

    const  currentUser = AuthService.getCurrentUser();
    const [purchaseInfo, setPurchaseInfo] = useState("");

    const getPurchaseInfo = () => {
        const currentTicket = TicketService.getCurrentTicket();
            TicketService.getPurchaseInfoFromTicketId(currentTicket.id)
            .then((purchaseInfo) => {setPurchaseInfo(purchaseInfo)}
            )
    }

    useEffect(() => {
        setTimeout(() => {
            getPurchaseInfo();
        }, 3000)
    }, []);

    return(
         <div>
            <h1>Thank you for your purchase!</h1>
            <h2>Your ticket details are as follows:</h2>

            {
                purchaseInfo === "" ?
                <div class="spinner-grow" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                : 
            <div>
                <p>{`Purchase ID: ${purchaseInfo.purchaseId}`}</p>
                <p>{`User ID: ${purchaseInfo.userId}`}</p>
                <p>{`User Fullname: ${purchaseInfo.userFullname}`}</p>
                <p>{`User Email: ${purchaseInfo.userEmail}`}</p>
                <p>{`Event Name: ${purchaseInfo.eventName}`}</p>
                <p>{`Event Date: ${purchaseInfo.eventDate}`}</p>
                <p>{`Category: ${purchaseInfo.category}`}</p>
                <p>{`Ticket ID: ${purchaseInfo.ticketId}`}</p>
                <p>{`Price: ${purchaseInfo.ticketPrice}`}</p>
                <p>{`Seat Number: ${purchaseInfo.seatNum}`}</p>
                <p>{`Name: ${currentUser.fullname}`}</p>
                <p>{`Email: ${currentUser.email}`}</p>
                <h3 onClick={() => {onRouteChange('Home')}}>Click here to return to home</h3>

            </div>


            }

           
         </div>
    );
}

export default Confirmation;