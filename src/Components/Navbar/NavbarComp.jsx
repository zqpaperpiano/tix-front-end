import React from 'react';
import { Navbar, Nav, Container, Form, Button, NavDropdown} from 'react-bootstrap';
import './NavbarComp.css'
import { SearchBar } from '../SearchBar';


export const NavbarComp = ({onRouteChange}) => {

  return (
    <Navbar bg="black fixed-top" variant="dark" className='navbar'>
      <Container>
        <Navbar.Brand
        onClick={() => {onRouteChange('Home')}}
        href="#home" className='Company'>TIX</Navbar.Brand>
        
        <Nav className="ms-auto underline-on-hover">
          <Nav.Link onClick={() => {onRouteChange('Home')}} href="#home">Home</Nav.Link>

          <NavDropdown title="Events" id="basic-nav-dropdown">
            <NavDropdown.Item 
            onClick={() => {onRouteChange('AllEvents')}}
            className="dropdownitem" href="#events-all">All</NavDropdown.Item>
            <NavDropdown.Item 
            onClick={() => {onRouteChange('Music')}}
            className="dropdownitem" href="#events-music">Music</NavDropdown.Item>
            <NavDropdown.Item  
            onClick={() => {onRouteChange('Sports')}}
            className="dropdownitem" href="#events-sports">Sports</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="#FAQ">FAQ</Nav.Link>
          <Nav.Link 
          onClick={() => {onRouteChange('Login')}}
          href="#login">Login</Nav.Link>
          <Nav.Link 
          onClick={() => {onRouteChange('SignUp')}}
          href="#signup">Sign Up</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
