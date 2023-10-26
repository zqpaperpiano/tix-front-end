import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, Button } from 'react-bootstrap';
import './NavbarComp.css'
import AuthService from '../../LoginSignUp/services/auth.service';

export const NavbarCompProfile = ({loadUser, onRouteChange}) => {
  return (
    <Navbar bg="black fixed-top" variant="dark">
      <Container>
      <Navbar.Brand onClick={() => {onRouteChange('Home')}} href="#home" className="logo">TIX</Navbar.Brand>

        <Form className="d-flex">
          <Form.Control type="search" placeholder="Search" className="me-2 search-input" aria-label="Search"/>
          <Button variant="outline-success" className='search-button'>Search</Button>
        </Form>

       
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
        </Nav>

        <Nav className="ml-auto">
        <NavDropdown title="Profile" id="basic-nav-dropdown">
          <NavDropdown.Item 
          onClick={() => {
              onRouteChange('Profile')
          }}
          href="#profile">Profile</NavDropdown.Item>
          <NavDropdown.Item 
          onClick={() => {
              onRouteChange('UserPurchases')
          }}
          href="#purchase">Purchases</NavDropdown.Item>
          <NavDropdown.Item 
          onClick={() => {
            localStorage.removeItem("user");
            loadUser('','','');
            alert("You've successfully logged out");
            onRouteChange("Home");
          }}
          href="#signout">Sign Out</NavDropdown.Item>
        </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarCompProfile;
