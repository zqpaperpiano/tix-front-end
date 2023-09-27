import React, { useEffect, useState } from "react";
import AuthService from "../LoginSignUp/services/auth.service";
import TicketService from "../NewBuyingDetails/ticket.service";

const UserPurchases = () => {
    const userID = AuthService.getCurrentUser().id;
    const [userPurchases, setUserPurchases] = useState([]);
    const [purchaseInfoList, setPurchaseInfoList] = useState([]);

  useEffect(() => {
    TicketService.getUserPurchasesFromUserId(userID)
      .then((userPurchases) => {
        setUserPurchases(userPurchases);
      })
      .catch((error) => {
        console.error("Error fetching user's purchases:", error);
      });
  }, [userID]);

  useEffect(() => {
    // Create an array to store promises for fetching purchase info
    const promises = userPurchases.map((purchase) => {
      return TicketService.getPurchaseInfoByTicketId(purchase.ticketId);
    });

    // const handleCancellation = () => {
    //     TicketService.deletePurchase(purchaseInfo.purchaseId)
    // }

    // Use Promise.all to wait for all promises to resolve
    Promise.all(promises)
      .then((infoList) => {
        setPurchaseInfoList(infoList);
      })
      .catch((error) => {
        console.error("Error fetching purchase info by ticket ID:", error);
      });
  }, [userPurchases]);

  return (
    <div>
      <h1>Here are your purchases</h1>

      {purchaseInfoList.map((purchaseInfo, index) => (
        <div key={index}>
          <p>{`Purchase ID: ${purchaseInfo.purchaseId}`}</p>
          <p>{`User ID: ${purchaseInfo.userId}`}</p>
          <p>{`User Fullname: ${purchaseInfo.userFullname}`}</p>
          <p>{`User Email: ${purchaseInfo.userEmail}`}</p>
          <p>{`Event Name: ${purchaseInfo.eventName}`}</p>
          <p>{`Event Date: ${purchaseInfo.eventDate}`}</p>
          <p>{`Category: ${purchaseInfo.category}`}</p>
          <p>{`Ticket ID: ${purchaseInfo.ticketId}`}</p>
          <p>{`Price: ${purchaseInfo.price}`}</p>
          <p>{`Seat Number: ${purchaseInfo.seatNum}`}</p>
        </div>
      ))}
    </div>
  );
};

export default UserPurchases;