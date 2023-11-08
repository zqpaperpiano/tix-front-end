import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarCompProfile from './Components/Navbar/NavbarCompProfile';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import EventsAll from './Events/EventsAll';
import NavbarComp from './Components/Navbar/NavbarComp';
import EventsMusic from './Events/EventsMusic';
import EventsSports from './Events/EventsSports';
import TaylorSwiftInfo from './TaylorSwiftInfo/TaylorSwiftInfo';
import HomePage from './Home/Home';
import SeatingPayment from './NewBuyingDetails/SeatingPayment';
import Profile from './Profile/Profile';
import Confirmation from './NewBuyingDetails/Confirmation';
import UserPurchases from './Profile/UserPurchases';
import Queue from './Queue/Queue';
import UFCInfo from './UFC info/UFCInfo';
import { FAQ } from './FAQ/FAQ';
import { AlternateConfirmation } from './alternateConfirmationPage/AlternateConfirmation';

class App extends Component{
  constructor(){
    super();
    this.state=({
      route: 'Home',
      currentEvent: '',
      user: {
        id: '',
        fullName: '',
        email: '',
        mobile: '',
      },
    })
  }

  //load User into state to ensure that user is logged in. 
  loadUser = (userid, fullName, email, mobile) => {
    this.setState({
      user: {
        id: userid,
        fullName: fullName,
        email: email,
        mobile: mobile
      }
    })
  }

  //set the current event that the user is buying tickets for 
  setCurrentEvent = (eventName) =>{
    this.setState({
      currentEvent: eventName,
    })
  }

  //loads navbar to show user profile if the user is successfully logged in
  onUserLogin(){
    if(this.state.user.email != ''){
      return <NavbarCompProfile onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
    }else{ 
      return <NavbarComp onRouteChange={this.onRouteChange}/>
    }
  }

  //change the route of the system for the user to navigate between pages
  onRouteChange = (route) => {
    this.setState({
      route: route,
    })
  }

  //function to show different pages depending on the current route in the state
  pageNavigation(){
    switch(this.state.route){
          case 'Login': //checked
            return <Login onRouteChange={this.onRouteChange} loadUser={this.loadUser} user={this.state.user}/>
          case 'SignUp': //checked
            return <SignUp onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          case 'AllEvents': //checked
            return <EventsAll onRouteChange={this.onRouteChange} />
          case 'Music': //checked
            return <EventsMusic onRouteChange={this.onRouteChange} />  
          case 'Sports': //checked
            return <EventsSports onRouteChange={this.onRouteChange} />
          case 'SeatingPayment': //checked
            return  <SeatingPayment onRouteChange={this.onRouteChange} currentEvent={this.state.currentEvent} setListOfTicketIds={this.setListOfTicketIds} listOfTicketIds={this.state.listOfTicketIds}/>
          case 'TSInfo': //checked
            return <TaylorSwiftInfo onRouteChange={this.onRouteChange} user={this.state.user} setCurrentEvent={this.setCurrentEvent}/>
          case 'UFCInfo': //pending
            return <UFCInfo onRouteChange={this.onRouteChange} user={this.state.user} setCurrentEvent={this.setCurrentEvent}/>  
          case 'Home': //checked
            return <HomePage onRouteChange={this.onRouteChange} />
          case 'Profile': //checked
            return <Profile onRouteChange={this.onRouteChange} user={this.state.user}/>
          case 'Confirmation': //checked
            return <Confirmation onRouteChange={this.onRouteChange} listOfTicketIds={this.state.listOfTicketIds}/>
          case 'Queue':
            return <Queue onRouteChange={this.onRouteChange} currentEvent={this.state.currentEvent}/>
          case 'UserPurchases': //checked
            return <UserPurchases />
          case 'FAQ': //checked
            return <FAQ />
          case 'AlternateConfirmation':
            return <AlternateConfirmation onRouteChange={this.onRouteChange}/>
        }
  }

  componentDidMount(){
    localStorage.removeItem("user");
  }

  
  render(){
    return (
      <div className="main-page">
        <div className='navbar-top'>
          {this.onUserLogin()}
        </div>

        <div className="other-pages">
          {/* {this.pageNavigation()}  */}
          <TaylorSwiftInfo onRouteChange={this.onRouteChange} user={this.state.user} setCurrentEvent={this.setCurrentEvent}/>
        </div>
      </div>
    );
  }
}

export default App;

