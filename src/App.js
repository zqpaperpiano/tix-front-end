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
        }
  }

  render(){
    return (
      <div className="App">
        <NavbarComp onRouteChange={this.onRouteChange} />
        <SignUp onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        {/* <header>
          {this.onUserLogin()}
        </header>
        
        <main>
          {this.pageNavigation()}
        </main> */}
      </div>
    );
  }
}

export default App;
