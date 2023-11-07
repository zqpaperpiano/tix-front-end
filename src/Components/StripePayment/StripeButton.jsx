import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import AuthService from "../../LoginSignUp/services/auth.service";

export const StripeButton = ({ price, onRouteChange, listOfDetailedTickets, userID, eventName, handlePayment }) => {
  axios.defaults.withCredentials = true
  const currentUser = AuthService.getCurrentUser();
  const publishableKey = "pk_test_51O8PA9HVyHFmFtSnfvMmoHqE3suCMjlQsBy7Ybr0M2NYhTzzaTeWZ0zhPg8FMLHuUPU2My4T5Ogc2Zl9MKQKw2pL00siXGucI1";
  const stripePrice = price * 100;

  async function handleToken(token) {
    console.log(token);
    await axios
      .post("https://cs203back.azurewebsites.net/api/payment/charge", "", {
        headers: {
          token: token.id,
          amount: stripePrice,
        },
      })
      .then(() => {
        handlePayment(listOfDetailedTickets, eventName, userID);

        // let noOfTix = localStorage.getItem("noOfTickets");
        // for(let i = 1; i <= noOfTix; ++i){
        //   console.log('this is from local storage:', localStorage.getItem(`ticket${i}`));
        // }

        alert("Payment Success");
        onRouteChange('Confirmation')

      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <StripeCheckout
      amount={stripePrice}
      label="Pay Now"
      name={currentUser.fullname}
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      panelLabel="Pay Now"
      token={handleToken}
      stripeKey={publishableKey}
      currency="SGD"
    />
  );
};

export default StripeButton;