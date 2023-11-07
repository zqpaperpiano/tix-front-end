import React, { useEffect, useState } from "react";
import AuthService from "../LoginSignUp/services/auth.service";
import TicketService from "../NewBuyingDetails/ticket.service";
import './UserPurchases.css';

const UserPurchases = () => {
    const userID = AuthService.getUser().id;
    const [userPurchases, setUserPurchases] = useState([]);
    const [purchaseInfoList, setPurchaseInfoList] = useState([]);

    //upon load up, load all of the purchases under the userID stored in local storage
  useEffect(() => {
    console.log("getting user purchases")
    TicketService.userPurchase(userID)
      .then((userPurchases) => {
        setUserPurchases(userPurchases);
        console.log(userPurchases[0])
      })
      .catch((error) => {
        console.error("Error fetching user's purchases:", error);
      });
  }, [userID]);

  //upon loading, give a timer before loading all of the user's purchases
  useEffect(() => {
    setTimeout(() => {
      getTicketDetails();
    }, 1000)
  }, [userPurchases]);


  //get ticket details from purchaseID stored under the respective user IDs
  const getTicketDetails = () => {
    const promises = [];
    userPurchases.map((purchase) => {
      const id = purchase.ticketId
      promises.push(
        TicketService.getSinglePurchaseByTicketId(id)
        .then(data => {return data} )
      );
    })

      Promise.all(promises)
      .then((infoList) => {
        setPurchaseInfoList(infoList);
      })
      .catch((error) => {
        console.error("Error fetching purchase info by ticket ID:", error);
      });
    }

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
        </div>
      ))}
    </div>
  );
};

export default UserPurchases;