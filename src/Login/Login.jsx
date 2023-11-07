import React from "react";
import { Component } from "react";
import "./Login.css";
import AuthService from "../LoginSignUp/services/auth.service";

class Login extends Component{
  constructor(){
    super();
    this.state = ({
      loginEmail: '',
      loginPassword: '',
      errorMessage: '',
    })
  }
  
  //changes this.state.email to user's input
  onEmailChange = (event) => {
    this.setState({
      loginEmail: event.target.value
    })
  }

  //changes this.state.password to user's input
  onPasswordChange = (event) => {
    this.setState({
      loginPassword: event.target.value
    })
  }

  //redirects the user to the signup page
  onClickSignup(){
    this.props.onRouteChange('SignUp');
  }

  //call function to check username and password to allow log in
  onClickLogin(e){
    e.preventDefault();
    console.log('email:')
    //validation to ensure that both email and password is filled in
    if(this.state.loginEmail !== '' && this.state.loginPassword !== ''){

      //API call to validate username and password against database
      //user is also saved into localStorage in this api method call
      AuthService.authenticateUser(this.state.loginEmail, 
        this.state.loginPassword)
        .then(
        () => {
          const user = AuthService.getUser();
          //load user into state so system knows that user has logged in
          this.props.loadUser(
            user.fullname, user.email, user.mobile
          )
          //upon successful login, redirects logged in user back to home page
          this.props.onRouteChange('Home');
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) || error.message || error.toString();
          alert(resMessage);
        }
      );
    }else{
      alert("Please ensure that both username and passwords are filled in!");
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
              onClick={(e) => {this.onClickLogin(e)}}
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

export default Login;