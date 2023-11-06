import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import NavbarCompProfile from './Components/Navbar/NavbarCompProfile';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import EventsAll from './Events/EventsAll';
import NavbarComp from './Components/Navbar/NavbarComp';
import EventsMusic from './Events/EventsMusic';
import EventsSports from './Events/EventsSports';
import Details from './BuyingPage/Details';
import TaylorSwiftInfo from './TaylorSwiftInfo/TaylorSwiftInfo';
import HomePage from './Home/Home';
import SeatingPayment from './NewBuyingDetails/SeatingPayment';
import Profile from './Profile/Profile';
import Confirmation from './NewBuyingDetails/Confirmation';
import AuthService from './LoginSignUp/services/auth.service';
import UserPurchases from './Profile/UserPurchases';
import Queue from './Queue/Queue';
import UFCInfo from './UFC info/UFCInfo';
import Stripe from "react-stripe-checkout";

class App extends Component{
  constructor(){
    super();
    this.state=({
      route: 'Home',
      currentEvent: '',
      user: {
        fullName: '',
        email: '',
        mobile: '',
      },
    })
  }

  loadUser = (fullName, email, mobile) => {
    this.setState({
      user: {
        fullName: fullName,
        email: email,
        mobile: mobile
      }
    })
  }

  onMadePurchase = (eventName, date, cat, ticketID, price) => {
    this.setState({
      ticket:{
        eventName: eventName,
        date: date,
        cat: cat,
        ticketID: ticketID,
        price: price,
      }
    })
  }

  setCurrentEvent = (eventName) => {
    this.setState({
      currentEvent: eventName
    })
  }



  onUserLogin(){
    if(this.state.user.email != ''){
      return <NavbarCompProfile onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
    }else{ 
      return <NavbarComp onRouteChange={this.onRouteChange} />
    }
  }

  onRouteChange = (route) => {
    this.setState({
      route: route,
    })
  }

  pageNavigation(){
    switch(this.state.route){
          case 'Login':
            return <Login onRouteChange={this.onRouteChange} loadUser={this.loadUser} user={this.state.user}/>
          case 'SignUp':
            return <SignUp onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          case 'AllEvents':
            return <EventsAll onRouteChange={this.onRouteChange} />
          case 'Music':
            return <EventsMusic onRouteChange={this.onRouteChange} />  
          case 'Sports':
            return <EventsSports onRouteChange={this.onRouteChange} />
          case 'SeatingPayment':
            return  <SeatingPayment purchase={this.onMadePurchase} onRouteChange={this.onRouteChange} currentEvent={this.state.currentEvent}/>
          case 'TSInfo':
            return <TaylorSwiftInfo onRouteChange={this.onRouteChange} user={this.state.user} setCurrentEvent={this.setCurrentEvent}/>
          case 'UFCInfo':
            return <UFCInfo onRouteChange={this.onRouteChange} user={this.state.user} setCurrentEvent={this.setCurrentEvent}/>  
          case 'Home':
            return <HomePage onRouteChange={this.onRouteChange} />
          case 'Profile':
            return <Profile onRouteChange={this.onRouteChange} />
          case 'Confirmation':
            return <Confirmation onRouteChange={this.onRouteChange} />
          case 'Queue':
            return <Queue onRouteChange={this.onRouteChange} currentEvent={this.state.currentEvent}/>
          case 'UserPurchases':
            return <UserPurchases />
        }
  }

  
  render(){
    return (
      <div className="main-page">
        <div className='navbar-top'>
          {this.onUserLogin()}
        </div>

        <div className="other-pages">
          {this.pageNavigation()} 
          {/* <UFCInfo onRouteChange={this.onRouteChange} user={this.state.user}/>  */}
         
        </div>
      </div>
    );
  }
}

export default App;

