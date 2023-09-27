import React from "react";
import AuthService from "../LoginSignUp/services/auth.service";

const UserPurchases = () => {
    const userID = AuthService.getCurrentUser().id;

    return(
        <div>
            
        </div>
    );
}

export default UserPurchases;