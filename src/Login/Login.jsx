import React from "react";
import { Component } from "react";
import "./Login.css";


class Login extends Component{
  constructor(){
    super();
    this.state({
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
      const response = await axios.post('/api/customer/login', formData);

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
        <div className="div">
          <div className="text-wrapper-2">Welcome Back! Login</div>
  
          <form>
          <div className="email-address">
            <div className="text-wrapper-3">Email Address</div>
            <div className="input-wrapper">
              <input 
              onChange={this.onEmailChange}
              type="email"
              className="email-input" placeholder="Email"/>
            </div>
          </div>
  
          <div className="password">
            <div className="text-wrapper-3">Password</div>
            <div className="input-wrapper">
              <input 
              onChange={this.onPasswordChange}
              type="password"
              className="password-input" placeholder="Password"/>
            </div>
          </div>
  
          </form>

          <div className="text-wrapper-4">Don’t have an account?</div>
          <p 
          onClick={() => {this.onClickSignup()}}
          className="text-wrapper-4 sign-up-btm">Sign Up</p>
          <button 
          onClick={() => {this.onClickLogin()}}
          className="login-btm">Login</button>
        </div>
      </div>
    );
  }
}

export default Login
