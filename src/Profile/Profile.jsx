import React from "react";
import { Component } from "react"; 
import AuthService from "../LoginSignUp/services/auth.service";
import './Profile.css';

//get current user 
const user = AuthService.getUser();

const Profile = () => {
    return(
        <div className="profile-div">
            <h1 className="profile-header"> Profile Details </h1>
            <div className="details-arrangement">
                <div className="profile-id">
                    {`ID: ${user.id}`}
                </div>
                <div className="profile-name">
                    {`Name: ${user.fullname}`}
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