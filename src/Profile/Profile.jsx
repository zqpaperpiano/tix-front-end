import React from "react";
import { Component } from "react"; 
import AuthService from "../LoginSignUp/services/auth.service";

const user = AuthService.getCurrentUser();

const Profile = () => {
    return(
        <div>
            <div className="profile-name">
                <p>{`Name: ${user.fullname}`}</p>
            </div>
            <div className="profile-email">
                <p>{`Email: ${user.email}`}</p>
            </div>
            <div className="profile-mobile">
                <p>{`Mobile: ${user.mobile}`}</p>
            </div>
        </div>
    );
}

export default Profile;