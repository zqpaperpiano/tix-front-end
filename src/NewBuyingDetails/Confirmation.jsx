import React from "react";

const Confirmation = ({tickets, onRouteChange}) => {
    return(
         <div>
            <h1>Thank you for your purchase!</h1>
            <h2>Your ticket details are as follows:</h2>

            <div>
                <p>{`Event Name: `}</p>
                <p>{`Date: }`}</p>
                <p>{`Cat: `}</p>
                <p>{`Ticket ID: `}</p>
                <p>{`Price: `}</p>
            </div>

            {/* <p onClick={onRouteChange('Home')}>Click here to return to home</p> */}
         </div>
    );
}

export default Confirmation;