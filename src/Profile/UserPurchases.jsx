import React, { useEffect, useState } from "react";
import AuthService from "../LoginSignUp/services/auth.service";
import TicketService from "../NewBuyingDetails/ticket.service";
import './UserPurchases.css';

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

  const handleDeletePurchase = (purchaseId) => {
    TicketService.deletePurchase(purchaseId)
      .then(() => {
        setPurchaseInfoList((prevPurchaseInfoList) =>
          prevPurchaseInfoList.filter(
            (purchaseInfo) => purchaseInfo.purchaseId !== purchaseId
          )
        );
      })
      .catch((error) => {
        console.error(`Error deleting purchase with ID ${purchaseId}:`, error);
      });
  };

  const getTicketDetails = () => {
    const promises = [];
    userPurchases.map((purchase) => {
      const id = purchase.ticketId
      promises.push(
        TicketService.getPurchaseInfoFromTicketId(id)
        .then(data => {return data} )
      );
    })

      Promise.all(promises)
      .then((infoList) => {
        // console.log('infolislt: ', infoList )
        setPurchaseInfoList(infoList);
      })
      .catch((error) => {
        console.error("Error fetching purchase info by ticket ID:", error);
      });
    }

  useEffect(() => {
    setTimeout(() => {
      getTicketDetails();
    }, 1000)
  }, [userPurchases]);


  return (
    <div className="user-purchases">
      <h1>Here are your purchases</h1>

      {purchaseInfoList.map((purchaseInfo, index) => (
        <div className="purchase-table" key={index}>
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
          <button onClick={() => handleDeletePurchase(purchaseInfo.purchaseId)}>Sell Ticket</button>
        </div>
      ))}
    </div>
  );
};

export default UserPurchases;