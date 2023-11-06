import React from 'react';
import {useState} from 'react';
import { Navbar, Nav, Container, Form, Button, NavDropdown} from 'react-bootstrap';
import './SearchBar.css';


export const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");

    const onSearchChange = (event) => {
        setSearchInput(event.target.value);
    }

    return(
        <div>
            <div className='search-bar'>
                <input placeholder='Search' />
                <Button variant="outline-success" className='search-button'>Search</Button>
            </div>
            <div className='search-results'>

            </div>

        </div>
    );
}