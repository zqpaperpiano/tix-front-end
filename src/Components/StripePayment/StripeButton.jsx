import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import AuthService from "../../LoginSignUp/services/auth.service";

export const StripeButton = ({ price }) => {
  axios.defaults.withCredentials = true
  const currentUser = AuthService.getCurrentUser();
  const publishableKey = "pk_test_51O8PA9HVyHFmFtSnfvMmoHqE3suCMjlQsBy7Ybr0M2NYhTzzaTeWZ0zhPg8FMLHuUPU2My4T5Ogc2Zl9MKQKw2pL00siXGucI1";
  const stripePrice = price * 100;

  async function handleToken(token) {
    console.log(token);
    await axios
      .post("http://localhost:8081/api/payment/charge", "", {
        headers: {
          token: token.id,
          amount: stripePrice,
        },
      })
      .then(() => {
        alert("Payment Success");
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