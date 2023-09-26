import React from "react";
import { Component } from "react";
import "./Login.css";
import AuthService from "../LoginSignUp/services/auth.service";


class Login extends Component{
  constructor(){
    super();
    this.state = ({
      email: '',
      password: '',
      errorMessage: '',
    })
  }
  
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
      AuthService.login(this.state.loginEmail, 
        this.state.loginPassword)
        .then(
        () => {
          // console.log(AuthService.getCurrentUser());
          const user = AuthService.getCurrentUser();
          this.props.loadUser(
            user.fullname, user.email, user.mobile
          );
          this.props.onRouteChange('Home');
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          alert(resMessage);
        }
      );
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

export default Login;
