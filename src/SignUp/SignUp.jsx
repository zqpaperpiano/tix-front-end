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
      message: '',
      samePassword: false,
      isNumber: false,
    })
  }


  // const [formData, setFormData] = useState({
  //   fullName: '',
  //   email: '',
  //   mobile: '',
  //   password: '',
  // });
  
  // const [message, setMessage] = useState('');

  // ({ fullName, email, mobile, password } = formData);

  // {/* Here is the logic, can use if you want, if dowan isok, i changed contact to mobile so that it syncs with backend */}

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/customer/register', {
        fullName: this.state.fullName,
        email: this.state.email,
        mobile: this.state.mobile,
        password: this.state.password,
      });

      if (response.status === 200) {
        this.setState({message: 'Registration successful'})
        // setMessage('Registration successful');
      } else {
        this.setState({message: 'Registration failed'})
        // setMessage('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

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
    if(this.state.samePassword === false && this.state.registerPassword === confirm){
      this.setState({samePassword: true})
    }else if(this.state.samePassword === true && this.state.registeredPassword != confirm){
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
    if(isNaN(mobile)){
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
    e.preventDefault();
    if(this.state.samePassword === true && this.state.isNumber === true){
      try {
        // Call any additional logic you need after successful registration here
        // For example, you can redirect the user to another page.
        // this.props.loadUser(this.state.registerEmail);
        // this.props.onRouteChange('AllEvents');
        this.handleSubmit();
        
      } catch (err) {
        // Handle any errors that may occur during registration here
        // You can show an error message to the user or perform other error handling.
        console.error(err);
        alert("Registration Failed");
      }
    }else{
      console.log(this.state.samePassword, 'number', this.state.isNumber);
      console.log('password not the same!');
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
                className="data-input" placeholder="Name"/>
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
                password={this.state.registerPassword} />
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
              onChange={this.onPasswordChange}
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

      </div>
    );
  }
}

export default SignUp