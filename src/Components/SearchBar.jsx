import React, { useEffect } from 'react';
import {useState} from 'react';
import { Navbar, Nav, Container, Form, Button, NavDropdown} from 'react-bootstrap';
import './SearchBar.css';
import TicketService from '../NewBuyingDetails/ticket.service';


export const SearchBar = ({onRouteChange, eventsList, setFilteredEvents}) => {
    const [searchInput, setSearchInput] = useState("");
    const [listOfEvents, setListOfEvents] = useState([]);
    const [filterEvents, setFilterEvents] = useState([]);

    useEffect(() => {
        setListOfEvents(eventsList);
    }, {})

    const onSearchChange = (event) => {
        setSearchInput(event.target.value)
        let updatedList = listOfEvents.filter((event) => {
            console.log('event:', event);
            return event;
        })
        console.log(updatedList);
    }

    const filterSearch = (event) => {
        console.log('hi');
        let updatedList = listOfEvents.filter((event) => {
            // console.log('hi');
            // console.log('event:', event);
            // return event.toLowerCase().includes(searchInput.toLowerCase());
        })
        setFilterEvents(updatedList);
        // setFilteredEvents(eventsList);
    }

    // console.log('filterEvents:', filterEvents);
    // console.log('event list:', eventsList);

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