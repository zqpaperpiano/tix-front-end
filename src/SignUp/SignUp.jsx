import React from "react";
import { Component, useState, useEffect } from "react";
import "./SignUp.css";
import axios from 'axios';
import PasswordStrengthBar from "react-password-strength-bar";

class SignUp extends Component{
  constructor(){
    super();
    this.state = ({
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      samePassword: false,
      isNumber: false,
      errorMessage: '',
    })
  }


  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/v1/auth/signup', {
        fullName: this.state.fullName,
        email: this.state.email,
        mobile: this.state.mobile,
        password: this.state.password,
      });
     
      alert("Sign Up Successful! Redirecting to the Login Page.");
      setTimeout(() => {
        this.props.onRouteChange('Login'); 
      }, 2000);
      
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        this.setState({errorMessage: err.response.data.message});
      } else {
        this.setState({errorMessage: 'There was an error with the Sign Up'});
      }
    }
  }

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  onEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  onConfirmPasswordChange = (event) => {
   let confirm = event.target.value;
    if(this.state.samePassword === false && this.state.password === confirm){
      this.setState({samePassword: true})
    }else if(this.state.samePassword === true && this.state.password != confirm){
      this.setState({samePassword: false})
    }
  }

  onNameChange = (event) => {
    this.setState({
      fullName: event.target.value
    })
  }

  onContactChange = (event) => {
    let mobile = event.target.value;
    if(!isNaN(mobile)){
      this.setState({
        isNumber: true,
        mobile: mobile,
      })
    }else{
      this.setState({
        isNumber: false,
      })
    }
  }

  onClickLogin(){
    this.props.onRouteChange('Login');
  }

  onClickSubmit = (e) => {
    // e.preventDefault();
    if(this.state.samePassword === true && this.state.isNumber === true){
      try {
        alert("Nice")
        this.handleSubmit();
        
      } catch (err) {
        console.error(err);
        alert("Sign Up Failed");
      }
    }else{
      alert("Die")
      console.log(this.state.samePassword, 'number', this.state.isNumber);
      console.log('Password not the same!');
    }
  }

  render(){
    return (
      <div className="sign-up">
        <div className="welcome-sign-up">
          <p className="text-wrapper-2"> Welcome! Sign Up Here!</p>
        </div>

        <div className="format">

            <div className="left-sign-ups">

              <div className="full-name">
                <div className="text-wrapper-3">Full Name</div>
              <div className="input-wrapper">
                <input 
                onChange={this.onNameChange}
                className="data-input" placeholder="Name" />
              </div>
            </div>

            <div className="email-address">
              <div className="text-wrapper-3">Email Address</div>
              <div className="input-wrapper">
                <input 
                onChange={this.onEmailChange}
                type="email" className="data-input" placeholder="Email"/>
              </div>
            </div>

            <div className="password">
              <div className="text-wrapper-3">Password</div>
              <div className="input-wrapper">
                <input 
                onChange={this.onPasswordChange}
                type="password" className="data-input" placeholder="Password"/>
                <PasswordStrengthBar 
                minLength={8}
                password={this.state.password} />
              </div>
            </div>

            <div className="submit-button">
            <input
          type="submit"
          onClick={() => {this.onClickSubmit()}}
          className="sign-up-btm" value="Sign Up"/>
          </div>

            </div>

         <div className="right-sign-ups">

         <div className="confirm-password">
            <div className="text-wrapper-3">Confirm Password</div>
            <div className="input-wrapper">
              <input 
              onChange={this.onConfirmPasswordChange}
              type="password" className="data-input" placeholder="Confirm Password"/>
            </div>
          </div>

          <div className="contact">
            <div className="text-wrapper-3">Contact</div>
            <div className="input-wrapper">
              <input 
              onChange={this.onContactChange}
              className="data-input" placeholder="Number"/>
            </div>
          </div>

         </div>

          </div>

        <div className="login-here">
            <div className="text-wrapper-5">Already have an account?</div>
            <p 
            onClick={() => {this.onClickLogin()}}
            className="text-wrapper-5 login-btm">Login Here</p>
        </div>

        {this.samePassword === false && (<div className="error">Password and Confirm Password do not match.</div>)}
        {this.isNumber === false && (<div className="error">Contact Number should only contain numeric characters.</div>)}
        {this.state.errorMessage && (<div className="error">{this.state.errorMessagee}</div>)}

      </div>
    );
  }
}


export default SignUp