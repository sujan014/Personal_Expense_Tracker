import React from "react";
import { Nav, NavLink, Navbar, NavbarCollapse } from "react-bootstrap";

const Navigator = ({handleHome, handleDeveloper}) =>{
  return (
    <Navbar expand='lg' bg="info" variant='dark' className='px-3'>
        <Navbar.Brand><h3>Expense Tracker</h3></Navbar.Brand>            
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id='basic-navbar-nav'>
            <Nav>
            <NavLink>
                <span className='text-secondary text-bold' onClick={handleHome}>
                    Home                    
                </span>
            </NavLink>
            <NavLink>
                <span className='text-secondary' onClick={handleDeveloper}>
                    Developer
                </span>
            </NavLink>
            </Nav>
        </NavbarCollapse>
    </Navbar>
  )
};

export default Navigator;
