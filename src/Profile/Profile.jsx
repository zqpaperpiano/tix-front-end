import React from "react";
import { Component } from "react"; 
import AuthService from "../LoginSignUp/services/auth.service";
import './Profile.css';

const Profile = ({user}) => {

    return(
        <div className="profile-div">
            <h1 className="profile-header"> Profile Details </h1>
            <div className="details-arrangement">
                <div className="profile-id">
                    {`ID: ${user.id}`}
                </div>
                <div className="profile-name">
                    {`Name: ${user.fullName}`}
                </div>
                <div className="profile-email">
                    {`Email: ${user.email}`}
                </div>
                <div className="profile-mobile">
                    {`Mobile: ${user.mobile}`}
                </div>
            </div>
        </div>
    );
}

export default Profile;