import React from "react";
import "./Details.css";

export const Details = () => {

  

  return (
    <div className="details">
      <div className="div">

        <img className="taylor-swift" alt="Taylor swift" src="taylor-swift.png" />
        <div className="taylor-swift-title">
          <div className="text-wrapper">Taylor Swift Era Tour</div>
          <p className="p">2 March 2024 (Sat) ~ 9 March 2024 (Sat)</p>
          <div className="text-wrapper-2">Singapore National Stadium</div>
        </div>

        <div className="full-name">
          <div className="text-wrapper-3">Full Name</div>
          <div className="overlap-group">
            <div className="name" /> {/* Name is filled in but can be changed*/}
          </div>
        </div>

        <div className="profile-id">
          <div className="text-wrapper-3">Profile</div>
          <div className="overlap-group">
            <div className="text-wrapper-4">Id</div> {/* Id is filled cannot be changed */}
          </div>
        </div>

        <div className="email-address">
          <div className="text-wrapper-5">Email Address</div>
          <div className="overlap-group">
            <div className="email" /> {/* email is filled but can be changed*/}
          </div>
        </div>

        <div className="contact">
          <div className="text-wrapper-5">Contact</div>
          <div className="overlap-group">
            <div className="number" /> {/* number is filled but can be changed*/}
          </div>
        </div>
        
        <div className="text-wrapper-6">Personal Details</div>
        <div className="text-wrapper-7">Button</div>  {/* Button */}
      </div>
    </div>
  );
};

export default Details;
