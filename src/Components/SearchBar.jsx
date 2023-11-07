import React, { useEffect } from 'react';
import {useState} from 'react';
import { Navbar, Nav, Container, Form, Button, NavDropdown} from 'react-bootstrap';
import './SearchBar.css';
import TicketService from '../NewBuyingDetails/ticket.service';


export const SearchBar = ({onRouteChange, eventsList, setFilteredEvents}) => {
    const [searchInput, setSearchInput] = useState("");

    const onSearchChange = (event) => {
        console.log(eventsList);
        setSearchInput(event.target.value)
        console.log('searchinput:', searchInput);

        let updatedList = eventsList;
        console.log('updatedList:', updatedList);
        updatedList = updatedList.filter((eventName) => {
            return eventName.toLowerCase().includes(searchInput.toLowerCase());
        })

        console.log('list:', updatedList);
        setFilteredEvents(updatedList)
    }

    return(
        <div>
            <div className='search-bar'>
                <Form className="d-flex">
                <Form.Control type="search" placeholder="Search" className="me-2 search-input" aria-label="Search" onChange={onSearchChange}/>
                <Button onClick={() => onRouteChange('SearchResult')} variant="outline-success" className='search-button'>Search</Button>
                </Form>
            </div>
        </div>
    );
}