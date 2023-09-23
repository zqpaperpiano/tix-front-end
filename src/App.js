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
import Details from './BuyingPage/Details';
import Seating from './BuyingPage/Seating';
import Payment from './BuyingPage/Payment';
import TaylorSwiftInfo from './TaylorSwiftInfo/TaylorSwiftInfo';

class App extends Component{
  constructor(){
    super();
    this.state=({
      route: 'AllEvents',
      user: {
        email: '',
      }
    })
  }

  loadUser = (email) => {
    this.setState({
      user: {
        email: email,
      }
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
            return <Login onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          case 'SignUp':
            return <SignUp onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          case 'AllEvents':
            return <EventsAll onRouteChange={this.onRouteChange} />
          case 'Music':
            return <EventsMusic onRouteChange={this.onRouteChange} />  
          case 'Sports':
            return <EventsSports onRouteChange={this.onRouteChange} />
          case 'Details':
            return <Details onRouteChange={this.onRouteChange} />
          case 'Seating':
            return <Seating onRouteChange={this.onRouteChange} />
          case 'Payment':
            return <Payment onRouteChange={this.onRouteChange} />
            case 'TSInfo':
              return <TaylorSwiftInfo onRouteChange={this.onRouteChange} />
        }
  }

  render(){
    return (
      <div className="main-page">
        <div className='navbar-top'>
          {this.onUserLogin()}
          {/* <NavbarComp onRouteChange={this.onRouteChange} /> */}
        </div>

        <div className="other-pages">
          {/* {this.pageNavigation()} */}
          {/* <TaylorSwiftInfo onRouteChange={this.onRouteChange} /> */}
          <SignUp onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        </div>
      </div>
    );
  }
}

export default App;
