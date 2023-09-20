import React from "react";
import { Component } from "react";
import "./Seating.css";
import SeatMapPicture from '../assets/SeatMapPicture.png';
import PricingTable from '../assets/PricingTable.jpg';
import TaylorSwitft from '../assets/TaylorSwift.jpeg'
import { Form } from "react-bootstrap";


class Seating extends Component{
  constructor(){
    super();
    this.state = ({
      date: '',
      category: '',
    })
  }

  onDateSelect(event){
    if(event.target.value != 'Select'){
      this.setState({
        date: event.target.value,
      })
    }else if(event.target.value === 'Select'){
      this.setState({
        date: '',
      })
    }
  }

  onCatSelect(event){
    if(event.target.value != 'Select'){
      this.setState({
        category: event.target.value,
      })
    }else if(event.target.value === 'Select'){
      this.setState({
        category: '',
      })
    }
  }

  onClickProceed(){
    if(this.state.category != '' && this.state.date != ''){
      this.props.onRouteChange('Payment');
    }
  }

  render(){
    console.log('date: ', this.state.date, 'cat: ', this.state.category);
    return (
      <div className="details">
        <div className="div">
          <div className="overlap">
            <div className="seat-map">
              <p className="seat-map-ticket">Seat Map &amp; Ticket Pricing</p>
              <img className="seating-picture" alt="Seating picture" src={SeatMapPicture} />
              <img className="category-table" alt="Category table" src={PricingTable} />
            </div>
          </div>
  
          <img className="taylor-swift" alt="Taylor swift" src={TaylorSwitft} />
          <div className="taylor-swift-title">
            <div className="text-wrapper">Taylor Swift Era Tour</div>
            <p className="p">2 March 2024 (Sat) ~ 9 March 2024 (Sat)</p>
            <div className="text-wrapper-2">Singapore National Stadium</div>
          </div>
  
          <div className="text-wrapper-3">Seating</div>
  
          <div className="date">
            <div className="text-wrapper-4">Date</div>
            <div className="overlap-group">
              <Form.Control
                as="select"
                custom
                onChange={this.onDateSelect.bind(this)}  
              >
                  <option selected>Select</option>
                  <option value="2/3/2024">2/3/2024</option>
                  <option value="3/3/2024">3/3/2024</option>
                  <option value="4/3/2024">4/3/2024</option>
                </Form.Control>
            </div>
          </div>
  
          <div className="seating-category">
            <div className="text-wrapper-4">Seating Category</div>
            <div className="overlap-group">
            <Form.Control
                as="select"
                custom
                onChange={this.onCatSelect.bind(this)}  
              >
                  <option selected>Select</option>
                  <option value="1">Category 1</option>
                  <option value="2">Category 2</option>
                  <option value="3">Category 3</option>
                  <option value="4">Category 4</option>
                </Form.Control>
            </div>
          </div>
          <div className="text-wrapper-5">
            <button onClick={() => {this.onClickProceed()}}> Proceed to payment </button>  
          </div> 
        </div>
      </div>
    );
  }
}

export default Seating
