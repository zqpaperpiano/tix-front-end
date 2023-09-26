import React, { useState, useEffect } from "react";
import TicketService from "./ticket.service";

const Confirmation = ({tickets, onRouteChange}) => {

    const currentTicket = TicketService.getCurrentTicket();
    const [purchaseInfo, setPurchaseInfo] = useState("");

    useEffect(() => {
        TicketService.getPurchaseInfoFromTicketId(currentTicket.id).then((purchaseInfo) => {
        setPurchaseInfo(purchaseInfo);
        });
    }, [currentTicket.id]);

    return(
         <div>
            <h1>Thank you for your purchase!</h1>
            <h2>Your ticket details are as follows:</h2>

            <div>
                <p>{`Event Name: ${purchaseInfo.eventName}`}</p>
                <p>{`Event Date: ${purchaseInfo.eventDate}`}</p>
                <p>{`Category: ${purchaseInfo.category}`}</p>
                <p>{`Ticket ID: ${purchaseInfo.ticketId}`}</p>
                <p>{`Price: ${purchaseInfo.ticketPrice}`}</p>
                <p>{`Seat Number: ${purchaseInfo.seatNum}`}</p>
            </div>

            {/* <p onClick={onRouteChange('Home')}>Click here to return to home</p> */}
         </div>
    );
}

export default Confirmation;