import React from "react";
import './AlternateConfirmation.css';

export const AlternateConfirmation = ({ onRouteChange }) => {
    return(
        <div clasName="alternate-page">
            <div className="confirmation-arrangement">
                <h1>Thank you for your purchase!</h1>
                <h2>Your tickets will be sent directly to your email</h2>
                <h3 onClick={() => onRouteChange("Home")}>Click here to return to home</h3>
            </div>
        </div>
    );
}