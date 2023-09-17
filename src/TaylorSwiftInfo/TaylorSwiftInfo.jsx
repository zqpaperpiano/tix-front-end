import React from "react";
import "./TaylorSwiftInfo.css";

export const TaylorSwiftInfo = () => {
  return (
    <div className="taylor-swift-info">
      <div className="div">

        <img className="taylor-swift" alt="Taylor swift" src="TaylorSwift.jpeg" />

        <div className="title">
          <div className="overlap-group">
            <div className="overlap">
              <div className="text-wrapper">Taylor Swift Era Tour</div>
              <p className="p">2 March 2024 (Sat) ~ 9 March 2024 (Sat)</p>
              <div className="text-wrapper-2">Buy Ticket</div>
            </div>
            <div className="text-wrapper-3">Singapore National Stadium</div>
          </div>
        </div>

        <div className="event-details">
          <div className="text-wrapper-4">Event Details</div>
          <p className="taylor-swift-2">
            <span className="span">
              Taylor Swift announced additional dates to Taylor Swift | The Eras Tour today. Singapore will be the only
              stop in Southeast Asia. Taylor Swift | The Eras Tour in Singapore is presented by Marina Bay Sands and
              supported by the Singapore Tourism Board, official bank and pre-sale partner UOB, and official experience
              partner Klook, promoted by AEG Presents Asia, and produced by Taylor Swift Touring.
              <br />
              <br />
            </span>
            <span className="text-wrapper-5">Event Dates:</span>
            <span className="text-wrapper-6">&nbsp;</span>
            <span className="span">March 2, 3, 4, 7, 8 &amp; 9, 2024</span>
          </p>
        </div>

        <div className="ticket-sales">
          <div className="overlap-2">
            <div className="text-wrapper-7">Ticket Sales</div>
            <p className="taylor-swift-the">
              <span className="text-wrapper-8">
                Taylor Swift | The Eras Tour Fan Registration for General On-Sale:{" "}
              </span>
              <span className="text-wrapper-9">
                Friday, June 23 at 12PM (SGT) to Wednesday, June 28 at 12PM
                <br />
              </span>
              <span className="text-wrapper-6">General On-Sale:</span>
              <span className="text-wrapper-10"> Starts from Friday, July 7 at 12PM (SGT)</span>
            </p>
          </div>
        </div>

        <div className="admission-policy">
          <div className="overlap-3">
            <div className="text-wrapper-11">Admission Policy</div>
            <p className="admission-to-show">
              1. Admission to show/venue by full ticket only. Printed/electronic tickets must be produced for admission.
              <br />
              <br />
              2. There will be no admission for infants in arms and children below 3 years old.
              <br />
              <br />
              3. Individuals aged 3 years old and above will be required to purchase a ticket for admission.
              <br />
              <br />
              4. No professional photo or video cameras allowed.
              <br />
              <br />
              5. STRICTLY No Social Media Live Streaming is allowed.
              <br />
              <br />
              6. No outside food and beverage are allowed into the venue.
            </p>
          </div>
        </div>

        <div className="seat-map">
          <p className="seat-map-ticket">Seat Map &amp; Ticket Pricing</p>
          <img className="seating-picture" alt="Seating picture" src="SeatMapPicture.jpeg" />
          <img className="category-table" alt="Category table" src="PricingTable.jpeg" />
        </div>
      </div>
    </div>
  );
};

export default TaylorSwiftInfo