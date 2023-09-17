import React from "react";
import "./Seating.css";

export const Seating = () => {
  return (
    <div className="details">
      <div className="div">
        <div className="overlap">
          <div className="seat-map">
            <p className="seat-map-ticket">Seat Map &amp; Ticket Pricing</p>
            <img className="seating-picture" alt="Seating picture" src="SeatMapPicture.jpeg" />
            <img className="category-table" alt="Category table" src="PricingTable.jpeg" />
          </div>
        </div>

        <img className="taylor-swift" alt="Taylor swift" src="TaylorSwift.jpeg" />
        <div className="taylor-swift-title">
          <div className="text-wrapper">Taylor Swift Era Tour</div>
          <p className="p">2 March 2024 (Sat) ~ 9 March 2024 (Sat)</p>
          <div className="text-wrapper-2">Singapore National Stadium</div>
        </div>

        <div className="text-wrapper-3">Seating</div>

        <div className="date">
          <div className="text-wrapper-4">Date</div>
          <div className="overlap-group">
            <input className="select" /> {/* dropdown with date */}
          </div>
        </div>

        <div className="seating-category">
          <div className="text-wrapper-4">Seating Category</div>
          <div className="overlap-group">
            <input className="select" /> {/* dropdown with category */}
          </div>
        </div>
        <div className="text-wrapper-5">Button</div> {/* Proceed to payment button */}
      </div>
    </div>
  );
};

export default Seating
