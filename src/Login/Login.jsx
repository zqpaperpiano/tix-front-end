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
      message: '',
    })
  }

  // {/* I used this logic for the login, can just see if u wan to use it */}
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // });

  // const [message, setMessage] = useState('');

  // const { email, password } = formData;

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/customer/login', {
        email: this.state.email,
        password: this.state.password,
      });

      if (response.status === 200) {
        const token = response.data;
        // Store the token in local storage or a secure storage mechanism
        localStorage.setItem('jwtToken', token);
        this.setState({message: 'Login successful'});
        // setMessage('Login successful');
      } else {
        // setMessage('Login failed');
        this.setState({message: 'Login failed'});
      }
    } catch (error) {
      console.error('Login error:', error);
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
      // this.props.loadUser(this.state.loginEmail);
      this.handleSubmit();
      // this.props.onRouteChange('AllEvents');
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

      </div>
    );
  }
}

export default Login
