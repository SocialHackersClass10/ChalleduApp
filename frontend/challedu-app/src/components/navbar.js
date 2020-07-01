import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Button}  from 'reactstrap';
import '../App.css';
import logo from '../images/logo.svg';

export default class navbar extends Component {
    render() {
        return (
            <div> 
                <Navbar color="warning" expand="md">
                    <NavbarBrand><img id="navlogo" src={logo} alt="logo"/></NavbarBrand>
                        <Nav className="mr-auto" navbar>
                            <NavItem className="nav_button">
                                <Button outline color="danger">Home</Button>
                            </NavItem>
                            <NavItem className="nav_button">
                                <Button outline color="success">Users</Button>
                            </NavItem>
                            <NavItem className="nav_button">
                                <Button outline color="success">NGO</Button>
                            </NavItem>
                            <NavItem className="nav_button">
                                <Button outline color="info">Profile</Button>
                            </NavItem>
                        </Nav>
                </Navbar>    
            </div>
        );
    }
}
