import React from "react";
import { Component } from "react";
import "./Login.css";
import axios from 'axios';


class Login extends Component{
  constructor(){
    super();
    this.state = ({
      email: '',
      password: '',
      errorMessage: '',
    })
  }

  // const register = (username, email, password) => {
  //   return axios.post(API_URL + "signup", {
  //     username,
  //     email,
  //     password,
  //   });

  handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/v1/auth/login', {
        email: this.state.email,
        password: this.state.password,
      });

        alert("Login Successful! Redirecting to the Home Page ");
        setTimeout(() => {
          this.props.onRouteChange('Home'); 
        }, 2000);

      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.setState({errorMessage: error.response.data.message});
        } else {
          this.setState({errorMessage: 'There was a error with the Login.'});
        }
    }
  };
  
  onEmailChange = (event) => {
    this.setState({
      loginEmail: event.target.value
    })
  }

  onPasswordChange = (event) => {
    this.setState({
      loginPassword: event.target.value
    })
  }

  onClickSignup(){
    this.props.onRouteChange('SignUp');
  }

  onClickLogin(){
    if(this.state.loginEmail != ''){
      this.handleSubmit();
    }
  }

  render(){
    return (
      <div className="login">
        
        <div className="text-wrapper-2 welcome-login">
            <p>Welcome Back! Login</p>
          </div>

        <div className="login-format">
          <form className="login-form">

            <div className="email-address">
              <div className="text-wrapper-3 login-inputs">Email Address</div>
              <div className="input-wrapper">
                <input 
                onChange={this.onEmailChange}
                type="email"
                className="data-input" placeholder="Email"/>
              </div>
            </div>
          

            <div className="password">
              <div className="text-wrapper-3">Password</div>
              <div className="input-wrapper">
                <input 
                onChange={this.onPasswordChange}
                type="password"
                className="data-input" placeholder="Password"/>
              </div>
            </div>

            <div className="login-button-position">
              <button 
              onClick={() => {this.onClickLogin()}}
              className="login-btm">Login</button>
            </div>

          </form>
        </div>

        <div className="to-sign-up">
            <div className="text-wrapper-5">Don’t have an account?</div>
            <p 
            onClick={() => {this.onClickSignup()}}
            className="text-wrapper-5 sign-up-btm">Sign Up</p>
        </div>

        {this.state.errorMessage && <div className="error">{this.state.errorMessage}</div>}
        
      </div>
    );
  }
}

export default Login
